import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { resolveTenant } from '../middleware/tenant.middleware';
import { requirePermission } from '../middleware/rbac.middleware';
import { validate } from '../middleware/validate.middleware';
import { createEventSchema } from '../schemas/event.schema';
import Event from '../models/Event.model';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { auditLog } from '../services/audit.service';

const router = Router();

router.get('/', protect, resolveTenant, async (req, res) => {
  const { page = 1, limit = 10, featured } = req.query;
  const filter: Record<string, unknown> = {
    tenantId: req.tenant!._id,
    };
  if (featured === 'true') filter.isFeatured = true;

    filter.endDate = {
    $gte: new Date(),
  };
  const events = await Event.find(filter)
    .populate('createdBy', 'name avatar')
    .sort({
        isFeatured: -1,
        startDate: 1,
    })
    .skip((+page - 1) * +limit)
    .limit(+limit);
  res.json(
  new ApiResponse('Events fetched', {
    events,
    total: await Event.countDocuments(filter),
  })
);
});

router.post('/', protect, resolveTenant, requirePermission('canManageEvents'), validate(createEventSchema), async (req, res) => {
  const event = await Event.create({ ...req.body, tenantId: req.tenant!._id, createdBy: req.user!._id });
  await auditLog({ tenantId: (req.tenant as unknown as any)._id.toString(), userId: req.user!._id.toString(), action: 'EVENT_CREATED', resource: 'event', resourceId: event.id });
  res.status(201).json(new ApiResponse('Event created', { event }));
});

router.post('/:id/rsvp', protect, resolveTenant, async (req, res) => {
  const event = await Event.findOne({
    _id: req.params.id,
    tenantId: req.tenant!._id,
    });
  if (!event) throw new ApiError(404, 'Event not found');
  if (!event.rsvpEnabled) throw new ApiError(400, 'RSVP not enabled for this event');
  const userId = req.user!._id.toString();
  const idx = event.rsvps.findIndex((id: any) => id.toString() === userId);
  if (idx > -1) { event.rsvps.splice(idx, 1); }
  else { event.rsvps.push(userId as any); }
  await event.save();
  res.json(new ApiResponse('RSVP updated', { rsvped: idx === -1 }));
});

router.delete('/:id', protect, resolveTenant, requirePermission('canManageEvents'), async (req, res) => {
  await Event.findOneAndDelete({
    _id: req.params.id,
    tenantId: req.tenant!._id,
    });
  await auditLog({ tenantId: (req.tenant as unknown as any)._id.toString(), userId: req.user!._id.toString(), action: 'EVENT_DELETED', resource: 'event', resourceId: String(req.params.id) });
  res.json(new ApiResponse('Event deleted', {}));
});

export default router;