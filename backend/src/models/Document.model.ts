import mongoose, { Document, Schema } from 'mongoose';

export interface IDocument extends Document {
  tenantId: mongoose.Types.ObjectId;
  folderId?: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  fileUrl: string;
  storageProvider?: 'cloudinary' | 's3' | 'local';
  fileType: string;
  fileExtension?: string;
  fileSize: number;
  tags: string[];
  uploadedBy: mongoose.Types.ObjectId;
  isPublic: boolean;
  isPinned: boolean;
  audience: string[];
  downloadCount: number;
  version: number;
}

const DocumentSchema = new Schema<IDocument>(
  {
    tenantId:      { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
    folderId:      { type: Schema.Types.ObjectId, ref: 'Folder' },
    name:          { type: String, required: true },
    description:   String,
    fileUrl:       { type: String, required: true },
    storageProvider: {
        type: String,
        enum: ['cloudinary', 's3', 'local'],
        default: 'cloudinary',
    },
    fileType:      { type: String, required: true },
    fileExtension: String,
    fileSize:      { type: Number, required: true },
    tags:          [String],
    uploadedBy:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublic:      { type: Boolean, default: true },
    isPinned:      { type: Boolean, default: false },
    audience:      [String],
    downloadCount: { type: Number, default: 0 },
    version:       { type: Number, default: 1 },
  },
  { timestamps: true }
);

DocumentSchema.index({ name: 'text', description: 'text', tags: 'text' });
DocumentSchema.index({ tenantId: 1, folderId: 1 });
DocumentSchema.index({
  tenantId: 1,
  isPinned: 1,
});

DocumentSchema.index({
  tenantId: 1,
  uploadedBy: 1,
});
export default mongoose.model<IDocument>('Document', DocumentSchema);