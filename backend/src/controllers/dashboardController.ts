import { Request, Response } from 'express'
import { DashboardStats } from '../models/Dashboard'
import { HeroSlide, HeroStat } from '../models/Hero'

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalProperties = await HeroSlide.countDocuments()
    const heroStats = await HeroStat.find().sort({ order: 1 })
    
    res.json({
      totalProperties,
      totalClients: heroStats[0]?.value || '100+',
      totalTransactions: heroStats[1]?.value || '200M+',
      yearsExperience: heroStats[2]?.value || '2+'
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateStats = async (req: Request, res: Response) => {
  try {
    const { totalClients, totalTransactions, yearsExperience } = req.body
    
    let stats = await DashboardStats.findOne()
    if (!stats) {
      stats = new DashboardStats()
    }
    
    stats.totalClients = totalClients
    stats.totalTransactions = totalTransactions
    stats.yearsExperience = yearsExperience
    await stats.save()
    
    res.json(stats)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
