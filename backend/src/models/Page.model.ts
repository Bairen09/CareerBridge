import mongoose, { Document, Schema } from 'mongoose';

export interface IPage extends Document {
  tenantId: mongoose.Types.ObjectId;
  slug: string;
  title: string;
  body: string;
  isPublished: boolean;
  createdBy: mongoose.Types.ObjectId;
}

const PageSchema = new Schema<IPage>(
  {
    tenantId:    { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
    slug:        { type: String, required: true },
    title:       { type: String, required: true },
    body:        { type: String, default: '' },
    isPublished: { type: Boolean, default: false },
    createdBy:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

PageSchema.index({ tenantId: 1, slug: 1 }, { unique: true });
export default mongoose.model<IPage>('Page', PageSchema);