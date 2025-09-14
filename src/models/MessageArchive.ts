// models/MessageArchive.ts
import { Document, Schema, model, models } from 'mongoose';

// TypeScript interface for type safety
export interface IMessageArchive extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    originalCreatedAt: Date; // from the original message
    archivedAt: Date; // when archived
}

const MessageArchiveSchema = new Schema<IMessageArchive>(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        subject: {
            type: String,
            required: [true, 'Subject is required']
        },
        message: {
            type: String,
            required: [true, 'Message is required']
        },
        originalCreatedAt: {
            type: Date,
            required: true // must always come from the original message
        },
        archivedAt: {
            type: Date,
            default: Date.now // set automatically when archived
        }
    },
    {
        versionKey: false
    }
);

const MessageArchive = models.MessageArchive || model<IMessageArchive>('MessageArchive', MessageArchiveSchema);

export default MessageArchive;
