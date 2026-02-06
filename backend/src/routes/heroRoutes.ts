import express from 'express'
import { getSlides, createSlide, updateSlide, deleteSlide, getStats, updateStat } from '../controllers/heroController'

const router = express.Router()

router.get('/slides', getSlides)
router.post('/slides', createSlide)
router.put('/slides/:id', updateSlide)
router.delete('/slides/:id', deleteSlide)

router.get('/stats', getStats)
router.put('/stats/:id', updateStat)

export default router
