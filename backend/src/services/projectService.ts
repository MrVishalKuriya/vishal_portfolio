import { Project } from '../models/Project';
import { logger } from '../utils/logger';

export class ProjectService {
  static async getAll() {
    return Project.find().sort({ createdAt: -1 });
  }

  static async getById(id: string) {
    const project = await Project.findById(id);
    if (!project) throw new Error('Physical Architecture not found in database');
    return project;
  }

  static async create(projectData: any) {
    const project = new Project(projectData);
    await project.save();
    logger.info(`New Project Deployed: ${project.title}`);
    return project;
  }

  static async update(id: string, updateData: any) {
    const project = await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!project) throw new Error('Project Identity mismatch during update');
    logger.info(`Project Architecture Updated: ${project.title}`);
    return project;
  }

  static async delete(id: string) {
    const project = await Project.findByIdAndDelete(id);
    if (!project) throw new Error('Deletion failure: Identity not found');
    logger.info(`Project Archive Purged: ${project.title}`);
    return project;
  }
}
