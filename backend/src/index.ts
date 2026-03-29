import app from './app';
import { env } from './config/env';
import { connectDB } from './config/database';
import { logger } from './utils/logger';

const startServer = async () => {
  // Official Database Initialization
  await connectDB();

  const server = app.listen(env.PORT, () => {
    logger.info(`🚀 MERN Architecture Hub officially live on http://localhost:${env.PORT}`);
  });

  // Graceful Shutdown Manifest
  process.on('SIGTERM', () => {
    logger.warn('SIGTERM received: Closing Elite Architecture Hub gracefully');
    server.close(() => {
      logger.info('Process officially terminated');
      process.exit(0);
    });
  });
};

startServer();
