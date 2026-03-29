import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

// Vercel Serverless Connection Caching
let cachedDb: typeof mongoose | null = null;

export const connectDB = async () => {
  if (cachedDb) {
    logger.info('Using previously cached MongoDB connection');
    return cachedDb;
  }

  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    logger.info(`MongoDB Atlas Successfully Connected: ${conn.connection.host}`);
    cachedDb = conn;
    return conn;
  } catch (error: any) {
    logger.error('Critical Architecture Database Collision:', error.message);
    process.exit(1);
  }
};
