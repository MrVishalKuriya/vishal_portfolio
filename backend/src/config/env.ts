import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  MONGODB_URI: z.string().min(1, 'MongoDB URI is officially required'),
  JWT_SECRET: z.string().min(1, 'JWT Secret is required for Elite Security'),
  JWT_EXPIRE: z.string().default('30d'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid Environment Configuration:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
