import { Router } from 'express';
import {
  getNews,
  getGroupNews,
  getFeaturedNews,
  getSingleNews,
  createNews,
  publishNews,
  updateNews,
  deleteNews,
} from '../controllers/news.controller';
import { protect } from '../middleware/auth.middleware';
import { resolveTenant } from '../middleware/tenant.middleware';
import { requirePermission } from '../middleware/rbac.middleware';
import { validate } from '../middleware/validate.middleware';
import { createNewsSchema, updateNewsSchema } from '../schemas/news.schema';

const router = Router();

router.get('/group',           protect, getGroupNews);
router.get(
    '/featured',
    protect,
    resolveTenant,
    getFeaturedNews
    );
router.get('/',                protect, resolveTenant, getNews);

router.post(
    '/',
    protect,
    resolveTenant,
    requirePermission('canPublishNews'),
    validate(createNewsSchema),
    createNews
    );
router.patch('/:id/publish',   protect, resolveTenant, requirePermission('canPublishNews'), publishNews);
router.patch(
    '/:id',
    protect,
    resolveTenant,
    requirePermission('canPublishNews'),
    validate(updateNewsSchema),
    updateNews
    );
router.delete(
    '/:id',
    protect,
    resolveTenant,
    requirePermission('canPublishNews'),
    deleteNews
    );
router.get('/:slug',           protect, resolveTenant, getSingleNews);

export default router;