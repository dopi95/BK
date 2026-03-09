import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '', {
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      maxIdleTimeMS: 10000
    });
    mongoose.set('strictQuery', false);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};
