import mongoose from 'mongoose'

const aboutImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true }
}, { timestamps: true })

export const AboutImage = mongoose.model('AboutImage', aboutImageSchema)
