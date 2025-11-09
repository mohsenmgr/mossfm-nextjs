import { NextResponse } from 'next/server';

import connectToDB from '@/lib/mongoose';
import Story from '@/models/Story';

export const GET = async () => {
    try {
        await connectToDB();
        const now = new Date();

        // Get all non-expired stories and sort them oldest → newest
        const stories = await Story.find({ expiresAt: { $gt: now } })
            .sort({ createdAt: 1 })
            .lean();

        return NextResponse.json(stories);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 });
    }
};
