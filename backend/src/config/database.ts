import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    logger.info(`MongoDB Atlas Successfully Connected: ${conn.connection.host}`);
  } catch (error: any) {
    logger.error('Critical Architecture Database Collision:', error.message);
    process.exit(1);
  }
};
