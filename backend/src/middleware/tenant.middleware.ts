import { Request, Response, NextFunction } from 'express';
import Tenant, { ITenant } from '../models/Tenant.model';
import { ApiError } from '../utils/ApiError';

declare global {
  namespace Express {
    interface Request {
      tenant?: ITenant;
    }
  }
}

export const resolveTenant = async (req: Request, _res: Response, next: NextFunction) => {
  const slug =
    (req.headers['x-tenant-slug'] as string) ||
    (req.query.tenant as string);
  if (!slug) throw new ApiError(400, 'Tenant not specified');

  const tenant = await Tenant.findOne({ slug: slug.trim().toLowerCase(), isActive: true });
  if (!tenant) throw new ApiError(404, 'Tenant not found');
  if (!tenant.isActive) {
    throw new ApiError(403, 'Tenant is inactive');
  }

  req.tenant = tenant;
  next();
};