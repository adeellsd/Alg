import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get a Pro user by ID
 */
export const getPro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { 
        cognitoId: id
      },
      include: {
        properties: {
          where: { deletedAt: null },
          take: 20,
          orderBy: { createdAt: 'desc' }
        },
        favorites: {
          take: 20,
          orderBy: { createdAt: 'desc' },
          include: {
            property: {
              select: {
                id: true,
                title: true,
                priceAmount: true,
                wilayaId: true,
                status: true
              }
            }
          }
        },
        subscriptions: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        boosts: {
          where: { 
            status: { in: ['ACTIVE', 'PENDING'] }
          },
          include: {
            property: {
              select: {
                id: true,
                title: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      res.status(404).json({ message: 'Pro user not found' });
      return;
    }

    // Vérifier que l'utilisateur est bien PRO/STARTER/ELITE
    if (user.accountTier === 'FREE') {
      res.status(403).json({ 
        message: 'This user is not a professional account',
        accountTier: user.accountTier
      });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    console.error('Error fetching pro user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

/**
 * Create a new Pro user
 */
export const createPro = async (req: Request, res: Response) => {
  try {
    const { 
      cognitoId, 
      email, 
      firstName, 
      lastName, 
      phone, 
      companyName,
      tier = 'STARTER' // Default to STARTER, can be STARTER, PRO, or ELITE
    } = req.body;

    // Validation
    if (!cognitoId || !email) {
      res.status(400).json({ message: 'cognitoId and email are required' });
      return;
    }

    // Valider le tier
    if (!['STARTER', 'PRO', 'ELITE'].includes(tier)) {
      res.status(400).json({ 
        message: 'Invalid tier. Must be STARTER, PRO, or ELITE',
        provided: tier
      });
      return;
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { cognitoId }
    });

    if (existingUser) {
      res.status(409).json({ message: 'User already exists', user: existingUser });
      return;
    }

    // Déterminer les limites selon le tier
    const tierLimits = {
      STARTER: {
        propertyLimit: 15,
        imagesPerPropertyLimit: 15,
        videosPerPropertyLimit: 1
      },
      PRO: {
        propertyLimit: 50,
        imagesPerPropertyLimit: 20,
        videosPerPropertyLimit: 2
      },
      ELITE: {
        propertyLimit: 999999,
        imagesPerPropertyLimit: 999999,
        videosPerPropertyLimit: 3
      }
    };

    const limits = tierLimits[tier as 'STARTER' | 'PRO' | 'ELITE'];

    // Create new pro user
    const newUser = await prisma.user.create({
      data: {
        cognitoId,
        email,
        firstName: firstName || null,
        lastName: lastName || null,
        phone: phone || null,
        accountTier: tier,
        status: 'PENDING_VERIFICATION',
        companyName: companyName || null,
        // Limites selon le tier
        propertyLimit: limits.propertyLimit,
        imagesPerPropertyLimit: limits.imagesPerPropertyLimit,
        videosPerPropertyLimit: limits.videosPerPropertyLimit
      }
    });

    res.status(201).json(newUser);
  } catch (error: any) {
    console.error('Error creating pro user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

/**
 * Update a Pro user
 */
export const updatePro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      firstName, 
      lastName, 
      phone, 
      avatar, 
      companyName, 
      companyLogo, 
      companyDescription,
      commerceRegister,
      taxId,
      showPhone, 
      showWhatsApp, 
      whatsappNumber 
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { 
        cognitoId: id
      },
      data: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phone: phone || undefined,
        avatar: avatar || undefined,
        companyName: companyName || undefined,
        companyLogo: companyLogo || undefined,
        companyDescription: companyDescription || undefined,
        commerceRegister: commerceRegister || undefined,
        taxId: taxId || undefined,
        showPhone: showPhone !== undefined ? showPhone : undefined,
        showWhatsApp: showWhatsApp !== undefined ? showWhatsApp : undefined,
        whatsappNumber: whatsappNumber || undefined,
        updatedAt: new Date()
      }
    });

    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error('Error updating pro user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
