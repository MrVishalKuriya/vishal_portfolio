import { User, IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { logger } from '../utils/logger';

export class AuthService {
  static generateToken(userId: string): string {
    return jwt.sign({ userId }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRE,
    });
  }

  static async register(userData: Partial<IUser>) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User protocol already exists in database');
    }
    
    const user = new User(userData);
    await user.save();
    
    logger.info(`New User Registered: ${user.email}`);
    
    const token = this.generateToken(user._id as string);
    return { user, token };
  }

  static async login(email: string, pass: string) {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(pass))) {
      throw new Error('Invalid authentication credentials');
    }
    
    logger.info(`User Authentication Success: ${user.email}`);
    
    const token = this.generateToken(user._id as string);
    return { user, token };
  }
}
