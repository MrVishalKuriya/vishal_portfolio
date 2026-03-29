import app from '../src/app';
import { connectDB } from '../src/config/database';

// Initialize DB connection when Lambda spins up
connectDB();

// Export the Express API for Serverless consumption
export default app;
