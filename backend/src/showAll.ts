import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Property from './models/Property';

dotenv.config();

const showAll = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    const properties = await Property.find({});
    console.log(`Total: ${properties.length}`);
    properties.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} (${p._id})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

showAll();
