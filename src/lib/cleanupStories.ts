import connectToDB from '@/lib/mongoose';
import Story from '@/models/Story';

import cloudinary from './cloudinary';

export async function cleanupExpiredStories() {
    await connectToDB();
    const now = new Date();

    const expiredStories = await Story.find({ expiresAt: { $lt: now } });

    for (const story of expiredStories) {
        const urlParts = story.mediaUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const publicId = fileName.split('.')[0];

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });

        // Remove from MongoDB (if TTL didn't catch it yet)
        await Story.deleteOne({ _id: story._id });
    }
}
