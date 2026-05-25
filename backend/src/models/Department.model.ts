import slugify from 'slugify';
import mongoose, { Document, Schema } from 'mongoose';


export interface IDepartment extends Document {
  tenantId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  headId?: mongoose.Types.ObjectId;
  description?: string;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    tenantId:    { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
    name:        { type: String, required: true },
    slug:        { type: String, required: true, lowercase: true },
    headId:      { type: Schema.Types.ObjectId, ref: 'User' },
    description: String,
  },
  { timestamps: true }
);

DepartmentSchema.pre('save', function () {
  if (!this.slug) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
});

DepartmentSchema.index(
  { tenantId: 1, slug: 1 },
  { unique: true }
);

DepartmentSchema.index({
  name: 'text',
  description: 'text',
});

export default mongoose.model<IDepartment>('Department', DepartmentSchema);