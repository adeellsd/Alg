import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import prisma from '../lib/prisma';

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
 * Middleware d'authentification JWT avec vérification des rôles
 * @param allowedRoles - Liste des rôles autorisés (format BDD: "FREE", "STARTER", "PRO", "ELITE")
 */
export const AuthMiddleware = (allowedRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Unauthorized - No token provided' });
            return;
        }

        try {
            // Vérification du token avec signature RSA256
            jwt.verify(
                token,
                getKey,
                {
                    algorithms: ['RS256'],
                    issuer: process.env.AWS_COGNITO_ISSUER
                },
                async (err, decoded) => {
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

                    try {
                        // 🔥 NOUVEAU: Récupérer le tier RÉEL depuis la DB (si l'utilisateur existe)
                        const user = await prisma.user.findUnique({
                            where: { cognitoId: decodedToken.sub },
                            select: { 
                                id: true, 
                                accountTier: true, 
                                email: true,
                                status: true
                            }
                        });

                        // Si l'utilisateur n'existe pas encore en DB, on utilise le rôle Cognito par défaut
                        // Le frontend créera l'utilisateur lors du premier appel API
                        if (!user) {
                            const cognitoRole = decodedToken['custom:role'];
                            const defaultRole = cognitoRole === 'Particulier' ? 'FREE' : 'STARTER';
                            
                            req.user = {
                                id: decodedToken.sub,
                                role: defaultRole,
                                email: decodedToken.email
                            };
                            
                            next();
                            return;
                        }

                        // Vérifier que le compte est actif
                        if (user.status === 'BANNED' || user.status === 'SUSPENDED') {
                            res.status(403).json({ 
                                message: 'Account is not active',
                                status: user.status
                            });
                            return;
                        }

                        // Attacher les infos utilisateur à la requête (utiliser le tier DB, pas Cognito)
                        req.user = {
                            id: decodedToken.sub, // CognitoId pour compatibilité
                            role: user.accountTier, // Tier réel depuis DB: FREE, STARTER, PRO, ELITE
                            email: user.email || decodedToken.email
                        };

                        // Vérifier l'accès basé sur le tier DB
                        const hasAccess = allowedRoles.includes(user.accountTier);

                        if (!hasAccess) {
                            res.status(403).json({
                                message: 'Forbidden - Insufficient permissions',
                                requiredRoles: allowedRoles,
                                userTier: user.accountTier
                            });
                            return;
                        }

                        next();
                    } catch (dbError: any) {
                        console.error('Database error in auth middleware:', dbError);
                        res.status(500).json({ 
                            message: 'Internal server error',
                            error: dbError.message 
                        });
                        return;
                    }
                }
            );
        } catch (error) {
            console.error("Failed to process token:", error);
            res.status(401).json({ message: 'Invalid token format' });
            return;
        }
    };
};        

/**
 * Optional Auth Middleware - attache l'utilisateur si token valide, mais ne bloque pas
 * Utile pour les routes publiques qui ont un comportement différent si l'utilisateur est connecté
 */
export const optionalAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        // Pas de token = continuer sans user
        next();
        return;
    }

    try {
        jwt.verify(
            token,
            getKey,
            {
                algorithms: ['RS256'],
                issuer: process.env.AWS_COGNITO_ISSUER
            },
            async (err, decoded) => {
                if (err) {
                    // Token invalide = continuer sans user
                    next();
                    return;
                }

                const decodedToken = decoded as DecodedToken;

                try {
                    const user = await prisma.user.findUnique({
                        where: { cognitoId: decodedToken.sub },
                        select: { 
                            id: true, 
                            accountTier: true, 
                            email: true,
                            status: true
                        }
                    });

                    if (user && user.status !== 'BANNED' && user.status !== 'SUSPENDED') {
                        req.user = {
                            id: decodedToken.sub,
                            role: user.accountTier,
                            email: user.email || decodedToken.email
                        };
                        // Aussi ajouter userId pour compatibilité
                        (req as unknown as { userId: string }).userId = user.id;
                    }
                } catch {
                    // Erreur DB = continuer sans user
                }

                next();
            }
        );
    } catch {
        // Erreur de traitement = continuer sans user
        next();
    }
};