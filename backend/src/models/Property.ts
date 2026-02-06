import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, default: '' },
  type: { type: String, required: true },
  category: { type: String, required: true, enum: ['apartments', 'commercial', 'villa'] },
  area: { type: String, required: true },
  images: [{ type: String }],
  detailImages: [{ type: String }],
  mapUrl: { type: String, required: true },
  tourVideo: { type: String, default: '' },
  features: [{ type: String }],
  overview: {
    projectName: String,
    projectType: String,
    configuration: String,
    shops: String,
    deliveredTimeline: String,
    parking: String,
    finishingStatus: String,
    completionDate: String
  },
  investmentReasons: [{
    number: String,
    title: String,
    description: String
  }],
  floorPlans: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);
