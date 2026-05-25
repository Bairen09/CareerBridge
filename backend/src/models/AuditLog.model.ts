import mongoose, { Document, Schema } from 'mongoose';

export type AuditAction =
  | 'USER_LOGIN' | 'USER_LOGOUT' | 'USER_CREATED' | 'USER_UPDATED' | 'USER_DELETED'
  | 'NEWS_CREATED' | 'NEWS_PUBLISHED' | 'NEWS_DELETED'
  | 'BRANDING_UPDATED' | 'TENANT_CREATED'
  | 'DOCUMENT_UPLOADED' | 'DOCUMENT_DELETED'
  | 'EVENT_CREATED' | 'EVENT_DELETED'
  | 'ROLE_CHANGED';

export interface IAuditLog extends Document {
  tenantId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  action: AuditAction;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    tenantId:   { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
    userId:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action:     { type: String, required: true },
    resource:   { type: String, required: true },
    resourceId: String,
    details:    Schema.Types.Mixed,
    ip:         String,
    userAgent:  String,
  },
  { timestamps: true }
);

// Auto-delete logs older than 90 days
AuditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 365 * 24 * 60 * 60 });
AuditLogSchema.index({ tenantId: 1, action: 1 });
AuditLogSchema.index({ userId: 1 });

AuditLogSchema.index({ resource: 1, resourceId: 1 });

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);