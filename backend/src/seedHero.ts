import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { HeroSlide, HeroStat } from './models/Hero'

dotenv.config()

const seedHeroData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('Connected to MongoDB')

    // Clear existing data
    await HeroSlide.deleteMany({})
    await HeroStat.deleteMany({})

    // Seed slides
    const slides = [
      { imageUrl: '/images/sl1.jpg', order: 1 },
      { imageUrl: '/images/sl2.jpg', order: 2 },
      { imageUrl: '/images/sl3.jpg', order: 3 },
      { imageUrl: '/images/sl4.jpg', order: 4 },
      { imageUrl: '/images/sl5.jpg', order: 5 }
    ]
    await HeroSlide.insertMany(slides)
    console.log('Hero slides seeded')

    // Seed stats
    const stats = [
      { value: '100+', label: 'Happy Clients', order: 1 },
      { value: '200M+', label: 'Transactions', order: 2 },
      { value: '2+', label: 'Years Experience', order: 3 }
    ]
    await HeroStat.insertMany(stats)
    console.log('Hero stats seeded')

    console.log('Hero data seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding hero data:', error)
    process.exit(1)
  }
}

seedHeroData()
