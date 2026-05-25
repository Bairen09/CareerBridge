import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email:    z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const registerSchema = z.object({
  body: z.object({
    name:        z.string().min(2).max(80, 'Name too long'),
    email:       z.string().email(),
    phone: z.string().optional(),
    password:    z.string().min(8).regex(/[A-Z]/, 'Must have uppercase').regex(/[0-9]/, 'Must have number'),
    tenantSlug:  z.string().min(2).max(50).regex(/^[a-z0-9-]+$/, 'Invalid tenant slug'),
    role: z
        .enum(['super_admin', 'admin', 'editor', 'viewer'])
        .optional(),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>['body'];
export type RegisterInput = z.infer<typeof registerSchema>['body'];