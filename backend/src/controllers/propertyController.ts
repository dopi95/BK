import { Request, Response } from 'express';
import Property from '../models/Property';
import { v2 as cloudinary } from 'cloudinary';

// Get all properties
export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
};

// Get property by slug
export const getPropertyBySlug = async (req: Request, res: Response) => {
  try {
    const property = await Property.findOne({ slug: req.params.slug });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch property' });
  }
};

// Create property
export const createProperty = async (req: Request, res: Response) => {
  try {
    const files = req.files as any;
    const imageUrls: string[] = [];
    const detailImageUrls: string[] = [];
    const floorPlanUrls: string[] = [];

    if (files?.images) {
      const images = Array.isArray(files.images) ? files.images : [files.images];
      for (const image of images) {
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
          folder: 'properties'
        });
        imageUrls.push(result.secure_url);
      }
    }

    if (files?.detailImages) {
      const detailImages = Array.isArray(files.detailImages) ? files.detailImages : [files.detailImages];
      for (const image of detailImages) {
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
          folder: 'properties/details'
        });
        detailImageUrls.push(result.secure_url);
      }
    }

    if (files?.floorPlans) {
      const floorPlans = Array.isArray(files.floorPlans) ? files.floorPlans : [files.floorPlans];
      for (const plan of floorPlans) {
        const result = await cloudinary.uploader.upload(plan.tempFilePath, {
          folder: 'properties/floorplans'
        });
        floorPlanUrls.push(result.secure_url);
      }
    }

    const propertyData = {
      ...req.body,
      images: imageUrls,
      detailImages: detailImageUrls,
      features: JSON.parse(req.body.features || '[]'),
      overview: JSON.parse(req.body.overview || '{}'),
      investmentReasons: JSON.parse(req.body.investmentReasons || '[]'),
      floorPlans: floorPlanUrls
    };

    const property = await Property.create(propertyData);
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create property' });
  }
};

// Update property
export const updateProperty = async (req: Request, res: Response) => {
  try {
    const files = req.files as any;
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    let imageUrls = JSON.parse(req.body.existingImages || '[]');
    let detailImageUrls = JSON.parse(req.body.existingDetailImages || '[]');
    let floorPlanUrls = JSON.parse(req.body.existingFloorPlans || '[]');

    if (files?.images) {
      const images = Array.isArray(files.images) ? files.images : [files.images];
      for (const image of images) {
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
          folder: 'properties'
        });
        imageUrls.push(result.secure_url);
      }
    }

    if (files?.detailImages) {
      const detailImages = Array.isArray(files.detailImages) ? files.detailImages : [files.detailImages];
      for (const image of detailImages) {
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
          folder: 'properties/details'
        });
        detailImageUrls.push(result.secure_url);
      }
    }

    if (files?.floorPlans) {
      const floorPlans = Array.isArray(files.floorPlans) ? files.floorPlans : [files.floorPlans];
      for (const plan of floorPlans) {
        const result = await cloudinary.uploader.upload(plan.tempFilePath, {
          folder: 'properties/floorplans'
        });
        floorPlanUrls.push(result.secure_url);
      }
    }

    const updateData = {
      ...req.body,
      images: imageUrls,
      detailImages: detailImageUrls,
      features: JSON.parse(req.body.features || '[]'),
      overview: JSON.parse(req.body.overview || '{}'),
      investmentReasons: JSON.parse(req.body.investmentReasons || '[]'),
      floorPlans: floorPlanUrls
    };

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update property' });
  }
};

// Delete property
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete property' });
  }
};
