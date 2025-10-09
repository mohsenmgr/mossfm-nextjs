import { SocialMedia } from '@/types/SocialMedia';

import { Document, Schema, model, models } from 'mongoose';

export interface IFollower extends Document {
    handle: string;
    name?: string;
    surname?: string;
    socialMedia: SocialMedia;
    since?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IError {
    error: string;
}

export type FollowerResponse = IFollower | IError;

const FollowerSchema = new Schema<IFollower>(
    {
        handle: {
            type: String,
            required: [true, 'handle is required']
        },
        name: {
            type: String,
            default: null
        },
        surname: {
            type: String,
            default: null
        },
        socialMedia: {
            type: String,
            default: 'instagram'
        },
        since: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Follower = models.Follower || model<IFollower>('Follower', FollowerSchema);

export default Follower;
