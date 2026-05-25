import mongoose, { Document, Schema } from 'mongoose';
import slugify from 'slugify';

export interface IBranding {
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  font: string;
  heroImage?: string;
  heroTagline?: string;
}

export interface ILocation {
  city: string;
  country: string;
  lat?: number;
  lng?: number;
}

// Default template structure cloned for every new company
export interface IDefaultTemplate {
  navigation: { label: string; path: string }[];
  quickLinks: { label: string; icon: string; path: string }[];
  defaultPages: string[];
}

export interface ITenant extends Document {
  name: string;
  slug: string;
  type: 'parent' | 'subsidiary';
  parentId?: mongoose.Types.ObjectId;
  branding: IBranding;
  locations: ILocation[];
  template: IDefaultTemplate;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema = new Schema<ITenant>(
  {
    name:     { type: String, required: true },
    slug:     { type: String, required: true, unique: true, lowercase: true },
    type:     { type: String, enum: ['parent', 'subsidiary'], default: 'subsidiary' },
    parentId: { type: Schema.Types.ObjectId, ref: 'Tenant', default: null },
    branding: {
      logo:           String,
      primaryColor:   { type: String, default: '#0066CC' },
      secondaryColor: { type: String, default: '#004499' },
      font:           { type: String, default: 'Inter' },
      heroImage:      String,
      heroTagline:    String,
    },
    locations: [
      {
        city:    { type: String, required: true },
        country: { type: String, required: true },
        lat:     Number,
        lng:     Number,
      },
    ],
    template: {
      navigation: [{ label: String, path: String }],
      quickLinks: [{ label: String, icon: String, path: String }],
      defaultPages: [String],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

TenantSchema.pre<ITenant>('save', function () {
  if (!this.slug) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }

});


export default mongoose.model<ITenant>('Tenant', TenantSchema);