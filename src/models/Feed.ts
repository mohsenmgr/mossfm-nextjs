import { Document, Schema, model, models } from 'mongoose';

export interface IFeed extends Document {
    text: string;
    imageUrl?: string;
    hidden: boolean;
    order: number; // ordering field
    createdAt: Date;
    updatedAt: Date;
}

export interface IError {
    error: string;
}

export type FeedResponse = IFeed | IError;

const FeedSchema = new Schema<IFeed>(
    {
        text: {
            type: String,
            required: [true, 'Text is required']
        },
        imageUrl: {
            type: String,
            default: null
        },
        hidden: {
            type: Boolean,
            default: false
        },
        order: { type: Number, unique: true } // auto-increment
    },
    {
        timestamps: true
    }
);

const Feed = models.Feed || model<IFeed>('Feed', FeedSchema);

export default Feed;
