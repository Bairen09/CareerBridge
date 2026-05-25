import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User.model';
import Tenant from '../models/Tenant.model';
import RefreshToken from '../models/RefreshToken.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { auditLog } from '../services/audit.service';

const REFRESH_EXPIRES_DAYS = 7;

const signAccess = (id: string) =>
  jwt.sign(
  { id },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES as jwt.SignOptions['expiresIn'],
    }
    );

const issueRefreshToken = async (userId: string) => {
  const token = uuidv4();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_EXPIRES_DAYS);
  await RefreshToken.create({ userId, token, expiresAt });
  return { token, expiresAt };
};

const setRefreshCookie = (res: Response, token: string, expiresAt: Date) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production'
        ? 'none'
        : 'lax',
    path: '/',
    expires: expiresAt,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password').populate('tenantId');
  if (!user || !(await user.comparePassword(password)))
    throw new ApiError(401, 'Invalid email or password');
  if (!user.isActive) throw new ApiError(403, 'Account is disabled');

  user.lastLogin = new Date();
    await user.save();
  const accessToken = signAccess(user.id);
  const { token: refreshToken, expiresAt } = await issueRefreshToken(user.id);
  setRefreshCookie(res, refreshToken, expiresAt);

  const safeUser: any = user.toObject();
  delete safeUser.password;

  await auditLog({
    tenantId: user.tenantId._id.toString(),
    userId: user.id,
    action: 'USER_LOGIN',
    resource: 'auth',
    ip: req.ip,
  });

  res.json(new ApiResponse('Login successful', { accessToken, user: safeUser }));
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, tenantSlug, role } = req.body;
  const tenant = await Tenant.findOne({ slug: tenantSlug });
  if (!tenant) throw new ApiError(404, 'Tenant not found');

  const existingUser = await User.findOne({
    tenantId: tenant._id,
    email,
    });

    if (existingUser) {
    throw new ApiError(409, 'User already exists');
    }
  const user = await User.create({ name, email, password, tenantId: tenant._id, role: role || 'viewer' });
  const accessToken = signAccess(user.id);
  const { token: refreshToken, expiresAt } = await issueRefreshToken(user.id);
  setRefreshCookie(res, refreshToken, expiresAt);

  await auditLog({
    tenantId: tenant._id.toString(),
    userId: user.id,
    action: 'USER_CREATED',
    resource: 'user',
    resourceId: user.id,
  });

  res.status(201).json(new ApiResponse('Registered successfully', { accessToken, user }));
};

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;
  if (!token) throw new ApiError(401, 'No refresh token');

  const stored = await RefreshToken.findOne({ token, isRevoked: false });
  if (!stored || stored.expiresAt < new Date()) throw new ApiError(401, 'Refresh token invalid or expired');

  const user = await User.findById(stored.userId);
  if (!user || !user.isActive) throw new ApiError(401, 'User not found');

  // Rotate refresh token
  stored.isRevoked = true;
  await stored.save();
  const { token: newRefresh, expiresAt } = await issueRefreshToken(user.id);
  setRefreshCookie(res, newRefresh, expiresAt);

  const accessToken = signAccess(user.id);
  res.json(new ApiResponse('Token refreshed', { accessToken }));
};

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;
  if (token) {
    await RefreshToken.findOneAndUpdate({ token }, { isRevoked: true });
  }
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite:
        process.env.NODE_ENV === 'production'
        ? 'none'
        : 'lax',
    path: '/',
    });
  res.json(new ApiResponse('Logged out', {}));
};

export const me = async (req: Request, res: Response) => {
  const user = await User.findById(
    req.user!._id
  ).populate('tenantId department');

  res.json(
    new ApiResponse('User fetched', { user })
  );
};