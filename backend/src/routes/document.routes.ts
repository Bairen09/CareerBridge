import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { resolveTenant } from '../middleware/tenant.middleware';
import { requirePermission } from '../middleware/rbac.middleware';
import Document from '../models/Document.model';
import Folder from '../models/Folder.model';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { auditLog } from '../services/audit.service';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'intranet-docs', resource_type: 'auto' } as any,
});
const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (_req, file, cb) => {
        const allowed = [
        'application/pdf',
        'image/png',
        'image/jpeg',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        if (allowed.includes(file.mimetype)) {
        cb(null, true);
        } else {
        cb(
            new Error('Unsupported file type')
        );
        }
    },
    });

const router = Router();

// Folders
router.get('/folders',       protect, resolveTenant, async (req, res) => {
  const folders = await Folder.find({ tenantId: req.tenant!._id }).sort({
    createdAt: -1,
    name: 1,
    });
  res.json(new ApiResponse('Folders fetched', { folders }));
});

router.post('/folders',      protect, resolveTenant, requirePermission('canManageDocuments'), async (req, res) => {
  const folder = await Folder.create({ ...req.body, tenantId: req.tenant!._id, createdBy: req.user!._id });
  res.status(201).json(new ApiResponse('Folder created', { folder }));
});

// Documents
router.get('/', protect, resolveTenant, async (req, res) => {
  const { folderId, search, tag, page = 1, limit = 20 } = req.query;
  const filter: Record<string, unknown> = { tenantId: req.tenant!._id };
  filter.isPublic = true;
  if (folderId) filter.folderId = folderId;
  if (tag) filter.tags = tag;
  if (search) filter.$text = { $search: search as string };
  const docs = await Document.find(filter).populate('uploadedBy', 'name avatar').sort('-createdAt')
    .skip((+page - 1) * +limit).limit(+limit);
  const total = await Document.countDocuments(filter);
  res.json(new ApiResponse('Documents fetched', { docs, total }));
});

router.post('/upload', protect, resolveTenant, requirePermission('canManageDocuments'), upload.single('file'), async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No file uploaded');
  const doc = await Document.create({
    tenantId:   req.tenant!._id,
    folderId:   req.body.folderId || null,
    name:       req.body.name || req.file.originalname,
    description:req.body.description,
    fileUrl:    (req.file as any).path,
    fileType:   req.file.mimetype,
    fileSize:   req.file.size,
    tags:       req.body.tags ? JSON.parse(req.body.tags) : [],
    uploadedBy: req.user!._id,
  });
  await auditLog({ tenantId: req.tenant!._id.toString(), userId: req.user!._id.toString(), action: 'DOCUMENT_UPLOADED', resource: 'document', resourceId: doc.id });
  res.status(201).json(new ApiResponse('Document uploaded', { doc }));
});

router.delete('/:id', protect, resolveTenant, requirePermission('canManageDocuments'), async (req, res) => {
  await Document.findOneAndDelete({
  _id: req.params.id,
  tenantId: req.tenant!._id,
});
  await auditLog({ tenantId: req.tenant!._id.toString(), userId: req.user!._id.toString(), action: 'DOCUMENT_DELETED', resource: 'document', resourceId: String(req.params.id) });
  res.json(new ApiResponse('Document deleted', {}));
});

export default router;