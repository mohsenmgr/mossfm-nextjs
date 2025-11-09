import mongoose, { Document, Schema } from 'mongoose';

export interface IStory extends Document {
    userId: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    createdAt: Date;
    expiresAt: Date;
    likes: string[]; // userIds who liked
    comments: { userId: string; name?: string; text: string }[];
}

const StorySchema = new Schema<IStory>({
    userId: { type: String, required: true },
    mediaUrl: { type: String, required: true },
    mediaType: { type: String, enum: ['image', 'video'], required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) },
    likes: [
        {
            userId: { type: String, required: true },
            _id: false
        }
    ],
    comments: [
        {
            userId: String,
            name: String,
            text: String
        }
    ]
});
StorySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Story || mongoose.model<IStory>('Story', StorySchema);
