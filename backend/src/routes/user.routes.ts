import { Router } from 'express';
import { getDirectory, getUserById, updateProfile, updateUserRole } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';
import { resolveTenant } from '../middleware/tenant.middleware';
import { requirePermission } from '../middleware/rbac.middleware';

const router = Router();

router.get('/directory',  protect, resolveTenant, getDirectory);
router.get(
    '/:id',
    protect,
    resolveTenant,
    getUserById
    );
router.patch(
    '/me',
    protect,
    resolveTenant,
    updateProfile
    );
router.patch('/:id/role', protect, resolveTenant, requirePermission('canManageUsers'), updateUserRole);

export default router;