import express from 'express'
import { getAboutImage, updateAboutImage } from '../controllers/aboutController'

const router = express.Router()

router.get('/image', getAboutImage)
router.put('/image', updateAboutImage)

export default router
