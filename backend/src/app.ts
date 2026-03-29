import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { connectDB } from './config/database';
import apiRoutes from './routes/index';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// High-Fidelity Middleware manifested
app.use(express.json());
app.use(cors({ origin: env.CORS_ORIGIN }));

// Rate Limiting Protocol implementation
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Security threshold reached: Too many requests from this identity'
});
app.use('/api', limiter);

// Status Protocol activation for Root URL
app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Elite Architecture Hub Backend is live on Vercel Edge' });
});

// API Routing Hub activation
app.use('/api', apiRoutes);
// Global Error Handler injection
app.use(errorHandler);

export default app;
