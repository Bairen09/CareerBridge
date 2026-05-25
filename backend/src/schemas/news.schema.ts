import { z } from 'zod';

export const createNewsSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).max(200),
    excerpt:     z.string().max(500).optional(),
    body: z.string().trim().min(10),
    heroImage:   z.string().url().optional(),
    tags: z.array(z.string().trim().toLowerCase()).max(10).optional(),
    isGroupWide: z.boolean().optional(),
    audience: z.array(z.string()).max(20).optional(),
    status: z.enum(['draft', 'review', 'published']).optional(),
    isFeatured: z.boolean().optional(),
  }),
});

export const updateNewsSchema = createNewsSchema.partial();