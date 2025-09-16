import { CloudinaryImage } from '@cloudinary/url-gen/index';

export type FeedImage = { type: 'cloudinary'; value: CloudinaryImage } | { type: 'url'; value: string } | null;
