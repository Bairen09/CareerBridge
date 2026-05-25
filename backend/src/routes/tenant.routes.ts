import { Router } from 'express';
import { createTenant, getTenants, getTenantBySlug, updateBranding, getCurrentTenant } from '../controllers/tenant.controller';
import { protect } from '../middleware/auth.middleware';
import { resolveTenant } from '../middleware/tenant.middleware';
import { requireRole, requirePermission } from '../middleware/rbac.middleware';

const router = Router();

router.get('/current',   protect, resolveTenant, getCurrentTenant);
router.get('/',          protect, requireRole('super_admin'), getTenants);

router.post('/',         protect, requireRole('super_admin'), createTenant);
router.patch('/branding',protect, resolveTenant, requirePermission('canEditBranding'), updateBranding);
router.get('/:slug',     getTenantBySlug);

export default router;