// app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';

import connectToDB from '@/lib/mongoose';
import Story from '@/models/Story';

export const GET = async (req: NextRequest) => {
    try {
        // Connect to MongoDB
        await connectToDB();

        // Fetch all jobs from the database
        const now = new Date();
        const stories = await Story.find({ expiresAt: { $gt: now } }).sort({ createdAt: -1 });

        // Return JSON response
        return NextResponse.json(stories, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch quote:', error);
        return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 });
    }
};
