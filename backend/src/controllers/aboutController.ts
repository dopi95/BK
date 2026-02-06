import { Request, Response } from 'express'
import { AboutImage } from '../models/About'
import cloudinary from '../config/cloudinary'

export const getAboutImage = async (req: Request, res: Response) => {
  try {
    const aboutImage = await AboutImage.findOne()
    res.json(aboutImage)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateAboutImage = async (req: Request, res: Response) => {
  try {
    const file = req.files?.image as any
    
    if (!file) {
      return res.status(400).json({ message: 'No image provided' })
    }

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'beton-kegna/about'
    })

    let aboutImage = await AboutImage.findOne()
    if (aboutImage) {
      aboutImage.imageUrl = result.secure_url
      await aboutImage.save()
    } else {
      aboutImage = new AboutImage({ imageUrl: result.secure_url })
      await aboutImage.save()
    }

    res.json(aboutImage)
  } catch (error: any) {
    console.error('Error updating about image:', error.message)
    res.status(500).json({ message: error.message })
  }
}
