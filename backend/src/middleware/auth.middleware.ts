import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { User } from '../models/User';
import asyncHandler from 'express-async-handler';

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized: Security token missing');
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      res.status(401);
      throw new Error('Not authorized: User identity revoked');
    }

    req.userId = user._id as string;
    req.role = user.role;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized: Invalid security key');
  }
});

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== 'admin') {
    res.status(403);
    throw new Error('Forbidden: Elite Administrative privilege required');
  }
  next();
};
