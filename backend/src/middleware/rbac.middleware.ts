import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { IPermissions } from '../models/User.model';

export const requirePermission = (permission: keyof IPermissions) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) throw new ApiError(401, 'Not authenticated');
    if (req.user.role === 'super_admin') return next(); // super admin bypasses all
    if (!req.user.permissions[permission])
      throw new ApiError(403, `Missing permission: ${permission}`);
    next();
  };

export const requireRole = (
    ...roles: Array<'super_admin' | 'admin' | 'editor' | 'viewer'>
    ) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) throw new ApiError(401, 'Not authenticated');
    if (!roles.includes(req.user.role))
      throw new ApiError(
        403,
        `Required role: ${roles.join(', ')}`
        );
    next();
  };