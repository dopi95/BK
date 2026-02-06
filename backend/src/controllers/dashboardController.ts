import { Request, Response } from 'express';
import Property from '../models/Property';

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalProperties = await Property.countDocuments();
    
    res.json({
      totalProperties,
      totalClients: '100+',
      totalTransactions: '200M+',
      yearsExperience: '2+'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
