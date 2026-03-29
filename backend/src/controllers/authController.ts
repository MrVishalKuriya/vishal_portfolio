import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthService } from '../services/authService';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { user, token } = await AuthService.register(req.body);
  
  res.status(201).json({
    success: true,
    message: 'User identity successfully synthesized',
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await AuthService.login(email, password);
  
  res.json({
    success: true,
    message: 'Authentication successful',
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
});
