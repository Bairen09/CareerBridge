import AuditLog, { AuditAction } from '../models/AuditLog.model';
import mongoose from 'mongoose';

interface AuditParams {
  tenantId: string;
  userId: string;
  action: AuditAction;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ip?: string;
}

export const auditLog = async (params: AuditParams): Promise<void> => {
  try {
    await AuditLog.create({
      tenantId:   new mongoose.Types.ObjectId(params.tenantId),
      userId:     new mongoose.Types.ObjectId(params.userId),
      action:     params.action,
      resource:   params.resource,
      resourceId: params.resourceId,
      details:    params.details,
      ip:         params.ip,
    });
  } catch {
    // Audit logs should never crash the main flow
  }
};