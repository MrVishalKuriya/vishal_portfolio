import { Router } from 'express';
import { 
  getProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projectController';
import { protect, adminOnly } from '../middleware/auth.middleware';

const router = Router();

// Public Routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Protected Administrative Routes
router.post('/', protect, adminOnly, createProject);
router.put('/:id', protect, adminOnly, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

export default router;
