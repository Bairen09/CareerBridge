import { Request, Response } from 'express';
import User from '../models/User.model';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { auditLog } from '../services/audit.service';

export const getDirectory = async (req: Request, res: Response) => {
  const { search, location, department, page = 1, limit = 20 } = req.query;
  const filter: Record<string, unknown> = { tenantId: req.tenant!._id, isActive: true };

  if (search) {
    filter.$or = [
      { name:     { $regex: search, $options: 'i' } },
      { jobTitle: { $regex: search, $options: 'i' } },
      { email:    { $regex: search, $options: 'i' } },
    ];
  }
  if (location) {
    filter.$or = [
        {
        'location.city': {
            $regex: location,
            $options: 'i',
        },
        },
        {
        'location.country': {
            $regex: location,
            $options: 'i',
        },
        },
    ];
    }
  if (department) filter.department        = department;

  const [users, total] = await Promise.all([
    User.find(filter, '-password')
      .populate('department', 'name slug')
      .sort({
        role: 1,
        name: 1,
       })
      .skip((+page - 1) * +limit)
      .limit(+limit),
    User.countDocuments(filter),
  ]);

  // Return unique cities for the location filter UI
  const cities = await User.distinct('location.city', { tenantId: req.tenant!._id, isActive: true });

  const departments = await User.distinct(
    'department',
    {
        tenantId: req.tenant!._id,
        isActive: true,
    }
    );

  res.json(new ApiResponse('Directory fetched', {
    users, total, pages: Math.ceil(total / +limit), page: +page, cities, departments,
  }));
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findOne({
    _id: req.params.id,
    tenantId: req.tenant!._id,
    })
    .select('-password')
    .populate('tenantId department');
  if (!user) throw new ApiError(404, 'User not found');
  res.json(new ApiResponse('User fetched', { user }));
};

export const updateProfile = async (req: Request, res: Response) => {
  const allowed = ['name', 'avatar', 'jobTitle', 'location', 'phone'];
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => allowed.includes(k))
  );
  const user = await User.findByIdAndUpdate((req.user as any).id, updates, { new: true, select: '-password' });
  res.json(new ApiResponse('Profile updated', { user }));
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { role, permissions } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.user!.tenantId },
    {
        role,
        ...(permissions && { permissions }),
    },
            { new: true, select: '-password' }
  );
  if (!user) throw new ApiError(404, 'User not found');
  await auditLog({
    tenantId:   req.user!.tenantId.toString(),
    userId:     (req.user as any).id,
    action:     'ROLE_CHANGED',
    resource:   'user',
    resourceId: req.params.id as string,
    details:    { role },
  });
  res.json(new ApiResponse('User role updated', { user }));
};