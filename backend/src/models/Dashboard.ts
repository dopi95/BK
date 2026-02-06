import mongoose from 'mongoose'

const dashboardStatsSchema = new mongoose.Schema({
  totalProperties: { type: Number, default: 0 },
  totalClients: { type: String, default: '100+' },
  totalTransactions: { type: String, default: '200M+' },
  yearsExperience: { type: String, default: '2+' }
}, { timestamps: true })

export const DashboardStats = mongoose.model('DashboardStats', dashboardStatsSchema)
