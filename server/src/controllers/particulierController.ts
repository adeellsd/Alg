import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get a Particulier user by ID
 */
export const getParticulier = async (req: Request, res: Response) => {
  try {
    const { cognitoId } = req.params;

    const user = await prisma.user.findUnique({
      where: { 
        cognitoId: cognitoId
      },
      include: {
        properties: {
          where: { deletedAt: null },
          take: 10,
          orderBy: { createdAt: 'desc' }
        },
        favorites: {
          take: 10,
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
        }
      }
    });

    if (!user) {
      res.status(404).json({ message: 'Particulier not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    console.error('Error fetching particulier:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

/**
 * Create a new Particulier user
 */
export const createParticulier = async (req: Request, res: Response) => {
  try {
    const { cognitoId, email, firstName, lastName, phone } = req.body;

    // Validation
    if (!cognitoId || !email) {
      res.status(400).json({ message: 'cognitoId and email are required' });
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

    // Create new particulier with FREE tier defaults
    const newUser = await prisma.user.create({
      data: {
        cognitoId,
        email,
        firstName: firstName || null,
        lastName: lastName || null,
        phone: phone || null,
        accountTier: 'FREE',
        status: 'PENDING_VERIFICATION',
        // Les limites FREE sont définies par défaut dans le schema
        propertyLimit: 5,
        imagesPerPropertyLimit: 10,
        videosPerPropertyLimit: 0
      }
    });

    res.status(201).json(newUser);
  } catch (error: any) {
    console.error('Error creating particulier:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

/**
 * Update a Particulier user
 */
export const updateParticulier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, avatar, showPhone, showWhatsApp, whatsappNumber } = req.body;

    const updatedUser = await prisma.user.update({
      where: { 
        cognitoId: id
      },
      data: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phone: phone || undefined,
        avatar: avatar || undefined,
        showPhone: showPhone !== undefined ? showPhone : undefined,
        showWhatsApp: showWhatsApp !== undefined ? showWhatsApp : undefined,
        whatsappNumber: whatsappNumber || undefined,
        updatedAt: new Date()
      }
    });

    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error('Error updating particulier:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
