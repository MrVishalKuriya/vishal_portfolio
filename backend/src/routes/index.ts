import { Router } from 'express';
import authRoutes from './auth.routes';
import projectRoutes from './project.routes';
import contactRoutes from './contact.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/contact', contactRoutes);

export default router;
