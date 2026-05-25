import slugify from 'slugify';
import mongoose, { Document, Schema } from 'mongoose';

export interface IFolder extends Document {
  tenantId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  parentId?: mongoose.Types.ObjectId;
  path?: string;
  createdBy: mongoose.Types.ObjectId;
}

const FolderSchema = new Schema<IFolder>(
  {
    tenantId:  { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
    name:      { type: String, required: true },
    slug:      { type: String, required: true, lowercase: true },
    parentId:  { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
    path:      String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

FolderSchema.pre<IFolder>('save', function () {
  if (!this.slug) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
});``

FolderSchema.pre<IFolder>('save', function () {
  if (!this.path) {
    this.path = this.parentId
      ? `${this.parentId}/${this.slug}`
      : `/${this.slug}`;
  }
});

FolderSchema.index(
  { tenantId: 1, parentId: 1, slug: 1 },
  { unique: true }
);

FolderSchema.index({
  tenantId: 1,
  path: 1,
});

export default mongoose.model<IFolder>('Folder', FolderSchema);