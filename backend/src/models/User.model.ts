import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export type Role = 'super_admin' | 'admin' | 'editor' | 'viewer';

export interface IPermissions {
  canPublishNews: boolean;
  canManageUsers: boolean;
  canEditBranding: boolean;
  canManageDepartments: boolean;
  canManageDocuments: boolean;
  canManageEvents: boolean;
  canManagePages: boolean;
}

export interface IUser extends Document {
  tenantId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role;
  permissions: IPermissions;
  department?: mongoose.Types.ObjectId;
  avatar?: string;
  jobTitle?: string;
  location: { city?: string; country?: string };
  phone?: string;
  isActive: boolean;
  lastLogin?: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const defaultPermissions = (role: Role): IPermissions => {
  const all: IPermissions = {
    canPublishNews: true, canManageUsers: true, canEditBranding: true,
    canManageDepartments: true, canManageDocuments: true,
    canManageEvents: true, canManagePages: true,
  };
  if (role === 'super_admin' || role === 'admin') return all;
  if (role === 'editor') return { ...all, canManageUsers: false, canEditBranding: false, canManageDepartments: false };
  return {
    canPublishNews: false,
    canManageUsers: false,
    canEditBranding: false,
    canManageDepartments: false,
    canManageDocuments: false,
    canManageEvents: false,
    canManagePages: false,
  };
};

const UserSchema = new Schema<IUser>(
  {
    tenantId:   { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
    name:       { type: String, required: true },
    email:      { type: String, required: true, lowercase: true },
    password:   { type: String, required: true, select: false },
    role:       { type: String, enum: ['super_admin','admin','editor','viewer'], default: 'viewer' },
    permissions: {
      canPublishNews:       { type: Boolean, default: false },
      canManageUsers:       { type: Boolean, default: false },
      canEditBranding:      { type: Boolean, default: false },
      canManageDepartments: { type: Boolean, default: false },
      canManageDocuments:   { type: Boolean, default: false },
      canManageEvents:      { type: Boolean, default: false },
      canManagePages:       { type: Boolean, default: false },
    },
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    avatar:     String,
    jobTitle:   String,
    location: { city: String, country: String },
    phone:      String,
    lastLogin:  Date,
    isActive:   { type: Boolean, default: true },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);

  const perms = defaultPermissions(this.role);

  Object.assign(this.permissions, perms);
});

UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

UserSchema.index({ tenantId: 1, email: 1 }, { unique: true });

UserSchema.index({
  name: 'text',
  email: 'text',
  jobTitle: 'text',
});

export default mongoose.model<IUser>('User', UserSchema);