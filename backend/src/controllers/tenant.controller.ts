import { Request, Response } from 'express';
import Tenant from '../models/Tenant.model';
import { createCompanyFromTemplate } from '../services/template.service';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { auditLog } from '../services/audit.service';

export const createTenant = async (req: Request, res: Response) => {
  const { name, slug, type, parentId, branding } = req.body;
  const tenant = await createCompanyFromTemplate({
    name, slug, type, parentId, branding,
    adminUserId: (req.user as any).id,
  });
  await auditLog({
    tenantId:   tenant._id.toString(),
    userId:     (req.user as any).id,
    action:     'TENANT_CREATED',
    resource:   'tenant',
    resourceId: tenant.id,
  });
  res.status(201).json(new ApiResponse('Company created from template', { tenant }));
};

export const getTenants = async (
    req: Request,
    res: Response
    ) => {
    const filter =
        (req.user as any).role === 'super_admin'
        ? { isActive: true }
        : {
            _id: req.tenant!._id,
            isActive: true,
            };

    const tenants = await Tenant.find(filter)
        .select('-template');

    res.json(
        new ApiResponse('Tenants fetched', {
        tenants,
        })
    );
};

export const getTenantBySlug = async (req: Request, res: Response) => {
  const tenant = await Tenant.findOne({ slug: req.params.slug, isActive: true });
  if (!tenant) throw new ApiError(404, 'Tenant not found');
  res.json(new ApiResponse('Tenant fetched', { tenant }));
};

export const updateBranding = async (req: Request, res: Response) => {
  const tenant = await Tenant.findByIdAndUpdate(
    req.tenant!._id,
    {
        branding: {
            ...req.tenant!.branding,
            ...req.body,
        },
        },
    { new: true }
  );
  await auditLog({
    tenantId:   req.tenant!._id.toString(),
    userId:     (req.user as any).id,
    action:     'BRANDING_UPDATED',
    resource:   'tenant',
    resourceId: req.tenant!._id.toString(),
    details:    req.body,
  });
  res.json(new ApiResponse('Branding updated', { tenant }));
};

export const getCurrentTenant = async (req: Request, res: Response) => {
  res.json(new ApiResponse('Tenant fetched', { tenant: {
    ...req.tenant?.toObject(),
    template: undefined,
    } }));
};