import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
  email?: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
                email?: string;
            };
        }
    }
}

// Configuration du client JWKS pour récupérer les clés publiques de Cognito
const client = jwksClient({
    jwksUri: `https://cognito-idp.${process.env.AWS_COGNITO_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
    cache: true,
    cacheMaxAge: 86400000, // 24 heures
    rateLimit: true,
    jwksRequestsPerMinute: 10
});

// Fonction pour récupérer la clé de signature
function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
    client.getSigningKey(header.kid, (err, key) => {
        if (err) {
            callback(err);
            return;
        }
        const signingKey = key?.getPublicKey();
        callback(null, signingKey);
    });
}

/**
 * Normalise les rôles Cognito vers les valeurs de la base de données
 * @param cognitoRole - Le rôle depuis Cognito ("Pro" ou "Particulier")
 * @returns Le rôle normalisé ("PROFESSIONNEL" ou "PARTICULIER")
 */
function normalizeRole(cognitoRole: string): string {
    const roleMap: { [key: string]: string } = {
        'Pro': 'PROFESSIONNEL',
        'pro': 'PROFESSIONNEL',
        'Particulier': 'PARTICULIER',
        'particulier': 'PARTICULIER'
    };

    return roleMap[cognitoRole] || cognitoRole.toUpperCase();
}

/**
 * Middleware d'authentification JWT avec vérification des rôles
 * @param allowedRoles - Liste des rôles autorisés (format BDD: "PROFESSIONNEL", "PARTICULIER")
 */
export const AuthMiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Unauthorized - No token provided' });
            return;
        }

        // Vérifier que les variables d'environnement sont configurées
        if (!process.env.AWS_COGNITO_REGION || !process.env.AWS_COGNITO_USER_POOL_ID) {
            console.error('AWS Cognito configuration missing in environment variables');
            res.status(500).json({ message: 'Server configuration error' });
            return;
        }

        try {
            // ✅ SÉCURITÉ : Vérification du token avec signature RSA256
            jwt.verify(
                token,
                getKey,
                {
                    algorithms: ['RS256'],
                    issuer: process.env.AWS_COGNITO_ISSUER
                },
                (err, decoded) => {
                    if (err) {
                        console.error('JWT verification failed:', err.message);

                        if (err.name === 'TokenExpiredError') {
                            res.status(401).json({ message: 'Token expired' });
                            return;
                        }

                        res.status(401).json({ message: 'Invalid token' });
                        return;
                    }

                    const decodedToken = decoded as DecodedToken;

                    // Récupérer et normaliser le rôle
                    const cognitoRole = decodedToken["custom:role"] || "";
                    const normalizedRole = normalizeRole(cognitoRole);

                    // Attacher les infos utilisateur à la requête
                    req.user = {
                        id: decodedToken.sub,
                        role: normalizedRole,
                        email: decodedToken.email
                    };

                    // Vérifier l'accès basé sur le rôle
                    const hasAccess = allowedRoles.includes(normalizedRole);

                    if (!hasAccess) {
                        res.status(403).json({
                            message: 'Forbidden - Insufficient permissions',
                            requiredRoles: allowedRoles,
                            userRole: normalizedRole
                        });
                        return;
                    }

                    next();
                }
            );
        } catch (error) {
            console.error("Failed to process token:", error);
            res.status(401).json({ message: 'Invalid token format' });
            return;
        }
    };
};        