import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ProjectService } from '../services/projectService';

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const projects = await ProjectService.getAll();
  res.json({ success: true, count: projects.length, data: projects });
});

export const getProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await ProjectService.getById(req.params.id);
  res.json({ success: true, data: project });
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await ProjectService.create(req.body);
  res.status(201).json({ success: true, message: 'Architecture successfully deployed', data: project });
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await ProjectService.update(req.params.id, req.body);
  res.json({ success: true, message: 'Architecture updated', data: project });
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  await ProjectService.delete(req.params.id);
  res.json({ success: true, message: 'Architecture purged' });
});
