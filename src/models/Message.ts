// models/Contact.ts
import { Document, Schema, model, models } from 'mongoose';

export type IMessagePayload = {
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
};

// TypeScript interface for type safety
export interface IMessage extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const MessageSchema = new Schema<IMessage>(
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
        }
    },
    {
        timestamps: true
    }
);

const Message = models.Contact || model<IMessage>('Message', MessageSchema);

export default Message;
