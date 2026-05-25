import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  tenantId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  timezone: string;
  location?: string;
  isOnline: boolean;
  meetingUrl?: string;
  heroImage?: string;
  isFeatured: boolean;
  isGroupWide: boolean;
  isRecurring: boolean;
  recurrence?: { frequency: 'daily' | 'weekly' | 'monthly'; interval: number; until?: Date };
  capacity?: number;
  rsvpEnabled: boolean;
  rsvps: mongoose.Types.ObjectId[];
  status: 'draft' | 'published' | 'cancelled';
  createdBy: mongoose.Types.ObjectId;
}

const EventSchema = new Schema<IEvent>(
  {
    tenantId:    { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
    title:       { type: String, required: true },
    description: String,
    startDate:   { type: Date, required: true },
    endDate:     { type: Date, required: true },
    timezone:    { type: String, default: 'UTC' },
    location:    String,
    isOnline:    { type: Boolean, default: false },
    meetingUrl:  String,
    heroImage:   String,
    isFeatured:  { type: Boolean, default: false },
    isGroupWide: { type: Boolean, default: false },
    isRecurring: { type: Boolean, default: false },
    recurrence: {
      frequency: { type: String, enum: ['daily','weekly','monthly'] },
      interval:  Number,
      until:     Date,
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'cancelled'],
        default: 'draft',
    },
    capacity:    Number,
        rsvpEnabled: { type: Boolean, default: false },
    rsvps:       [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdBy:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

EventSchema.index({
  tenantId: 1,
  startDate: 1,
});

EventSchema.index({
  tenantId: 1,
  isFeatured: 1,
});

EventSchema.index({
  title: 'text',
  description: 'text',
  location: 'text',
});

EventSchema.pre<IEvent>('save', function () {
  if (this.endDate < this.startDate) {
    throw new Error('End date cannot be before start date');
  }
});

export default mongoose.model<IEvent>('Event', EventSchema);