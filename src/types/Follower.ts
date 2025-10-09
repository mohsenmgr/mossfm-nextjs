import { SocialMedia } from './SocialMedia';

export type Follower = {
    _id?: string;
    handle: string;
    name?: string;
    surname?: string;
    socialMedia: SocialMedia;
    since?: Date;
    createdAt?: Date;
    updatedAt?: Date;
};
