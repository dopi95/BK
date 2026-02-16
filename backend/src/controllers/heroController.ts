import { Request, Response } from 'express'
import { HeroSlide, HeroStat } from '../models/Hero'
import cloudinary from '../config/cloudinary'

// Hero Slides
export const getSlides = async (req: Request, res: Response) => {
  try {
    res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=1200, stale-while-revalidate=86400')
    const slides = await HeroSlide.find().select('-__v').lean().sort({ order: 1 })
    res.json(slides)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const createSlide = async (req: Request, res: Response) => {
  try {
    console.log('Files:', req.files)
    console.log('Body:', req.body)
    
    const { order } = req.body
    const file = req.files?.image as any
    
    if (!file) {
      console.log('No file received')
      return res.status(400).json({ message: 'No image provided' })
    }

    console.log('Uploading to Cloudinary...')
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'beton-kegna/hero'
    })
    console.log('Upload successful:', result.secure_url)

    const slide = new HeroSlide({ imageUrl: result.secure_url, order })
    await slide.save()
    res.status(201).json(slide)
  } catch (error: any) {
    console.error('Error creating slide:', error.message)
    res.status(500).json({ message: error.message })
  }
}

export const updateSlide = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { order } = req.body
    const file = req.files?.image as any
    
    let imageUrl
    if (file) {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'beton-kegna/hero'
      })
      imageUrl = result.secure_url
    }

    const updateData: any = { order }
    if (imageUrl) updateData.imageUrl = imageUrl

    const slide = await HeroSlide.findByIdAndUpdate(id, updateData, { new: true })
    res.json(slide)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteSlide = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await HeroSlide.findByIdAndDelete(id)
    res.json({ message: 'Slide deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Hero Stats
export const getStats = async (req: Request, res: Response) => {
  try {
    res.setHeader('Cache-Control', 'public, max-age=600, s-maxage=1200, stale-while-revalidate=86400')
    const stats = await HeroStat.find().select('-__v').lean().sort({ order: 1 })
    res.json(stats)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateStat = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { value, label } = req.body
    const stat = await HeroStat.findByIdAndUpdate(id, { value, label }, { new: true })
    res.json(stat)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}
