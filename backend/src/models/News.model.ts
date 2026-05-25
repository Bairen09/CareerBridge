import slugify from 'slugify';
import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
  tenantId: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  excerpt?: string;
  body: string;
  heroImage?: string;
  author: mongoose.Types.ObjectId;
  tags: string[];
  isGroupWide: boolean;
  isPublished: boolean;
  status: 'draft' | 'review' | 'published';
  publishedAt?: Date;
  audience: string[];
  viewCount: number;
  isFeatured: boolean;
}

const NewsSchema = new Schema<INews>(
  {
    tenantId:    { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
    title:       { type: String, required: true },
    slug:        { type: String, lowercase: true },
    excerpt:     String,
    body:        { type: String, required: true },
    heroImage:   String,
    author:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags:        [{ type: String, lowercase: true }],
    isGroupWide: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'review', 'published'], default: 'draft',},
    publishedAt: Date,
    audience:    [String],
    viewCount:   { type: Number, default: 0 },
    isFeatured:  { type: Boolean, default: false },
  },
  { timestamps: true }
);

NewsSchema.pre<INews>('save', function () {
  if (!this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }
});

NewsSchema.index(
  { tenantId: 1, slug: 1 },
  { unique: true }
);

NewsSchema.index({
  tenantId: 1,
  status: 1,
  publishedAt: -1,
});

NewsSchema.index({
  tenantId: 1,
  isFeatured: 1,
});
NewsSchema.index({ title: 'text', excerpt: 'text', tags: 'text' }); // full-text search

export default mongoose.model<INews>('News', NewsSchema);