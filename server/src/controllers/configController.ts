import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { invalidateConfigCache } from "../utils/configHelpers";

// List all property type configs (optionally including inactive)
export const listPropertyTypeConfigs = async (req: Request, res: Response) => {
  try {
    const includeInactive = req.query.includeInactive === "true";
    const items = await prisma.propertyTypeConfig.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
    res.json({ success: true, data: items });
  } catch (error) {
    console.error("listPropertyTypeConfigs error", error);
    res.status(500).json({ success: false, error: "Failed to load property types" });
  }
};

// Create a new property type config
export const createPropertyTypeConfig = async (req: Request, res: Response) => {
  try {
    const {
      code,
      name,
      nameFr,
      nameAr,
      category,
      displayOrder = 999,
      isActive = true,
      defaultValues,
      requiredFields,
      icon,
      iconColor,
      description,
    } = req.body || {};

    if (!code || !nameFr || !category) {
      res.status(400).json({ success: false, error: "code, nameFr and category are required" });
      return;
    }

    const created = await prisma.propertyTypeConfig.create({
      data: {
        code,
        name: name || nameFr,
        nameFr,
        nameAr: nameAr || null,
        category,
        displayOrder,
        isActive,
        defaultValues: defaultValues ?? {},
        requiredFields: requiredFields ?? [],
        icon: icon || null,
        iconColor: iconColor || null,
        description: description || null,
      },
    });

    invalidateConfigCache();
    res.status(201).json({ success: true, data: created });
  } catch (error: any) {
    console.error("createPropertyTypeConfig error", error);
    res.status(500).json({ success: false, error: "Failed to create property type" });
  }
};

// Update an existing property type config
export const updatePropertyTypeConfig = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      code,
      name,
      nameFr,
      nameAr,
      category,
      displayOrder,
      isActive,
      defaultValues,
      requiredFields,
      icon,
      iconColor,
      description,
    } = req.body || {};

    const updated = await prisma.propertyTypeConfig.update({
      where: { id },
      data: {
        ...(code !== undefined && { code }),
        ...(name !== undefined && { name }),
        ...(nameFr !== undefined && { nameFr }),
        ...(nameAr !== undefined && { nameAr }),
        ...(category !== undefined && { category }),
        ...(displayOrder !== undefined && { displayOrder }),
        ...(isActive !== undefined && { isActive }),
        ...(defaultValues !== undefined && { defaultValues }),
        ...(requiredFields !== undefined && { requiredFields }),
        ...(icon !== undefined && { icon }),
        ...(iconColor !== undefined && { iconColor }),
        ...(description !== undefined && { description }),
      },
    });

    invalidateConfigCache();
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("updatePropertyTypeConfig error", error);
    res.status(500).json({ success: false, error: "Failed to update property type" });
  }
};

// Delete a property type config
export const deletePropertyTypeConfig = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.propertyTypeConfig.delete({ where: { id } });
    invalidateConfigCache();
    res.json({ success: true });
  } catch (error) {
    console.error("deletePropertyTypeConfig error", error);
    res.status(500).json({ success: false, error: "Failed to delete property type" });
  }
};
