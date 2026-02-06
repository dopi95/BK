import mongoose from 'mongoose'

const heroSlideSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  order: { type: Number, required: true }
}, { timestamps: true })

const heroStatSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  order: { type: Number, required: true }
}, { timestamps: true })

export const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema)
export const HeroStat = mongoose.model('HeroStat', heroStatSchema)
