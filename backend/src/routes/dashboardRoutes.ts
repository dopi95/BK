import express from 'express'
import { getStats, updateStats } from '../controllers/dashboardController'

const router = express.Router()

router.get('/stats', getStats)
router.put('/stats', updateStats)

export default router
