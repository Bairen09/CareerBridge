import { z } from 'zod';

export const createEventSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).max(200),
    description: z.string().max(5000).optional(),
    startDate:   z.string().datetime(),
    endDate:     z.string().datetime(),
    timezone:    z.string().default('UTC'),
    location:    z.string().optional(),
    isOnline:    z.boolean().optional(),
    meetingUrl:  z.string().url().optional(),
    heroImage: z.string().url().optional(),
    isFeatured:  z.boolean().optional(),
    status: z.enum(['draft', 'published', 'cancelled']).optional(),
    isGroupWide: z.boolean().optional(),
    isRecurring: z.boolean().optional(),
    capacity: z.number().min(1).optional(),
    recurrence: z.object({
      frequency: z.enum(['daily','weekly','monthly']),
      interval:  z.number().min(1),
      until:     z.string().datetime().optional(),
    }).optional(),
    rsvpEnabled: z.boolean().optional(),
  }),
})
.refine(
  (data) => new Date(data.body.endDate) > new Date(data.body.startDate),
  {
    message: 'End date must be after start date',
    path: ['body', 'endDate'],
  }
);
