import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import User, { IUser } from '../models/User.model';

interface JwtPayload { id: string }

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protect = async (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    throw new ApiError(401, 'Not authenticated');

  const token = authHeader?.split(' ')[1];

    if (!token) {
        throw new ApiError(401, 'Token missing');
    }
  let decoded: JwtPayload;

    try {
    decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;
    } catch {
    throw new ApiError(401, 'Invalid or expired token');
    }

  const user = await User.findById(decoded.id)
    .populate('tenantId department')
    .lean();
  if (!user || !user.isActive) throw new ApiError(401, 'User not found or inactive');
  
  if (!user.tenantId) {
    throw new ApiError(401, 'Tenant not found');
    }

  req.user = user;
  next();
};