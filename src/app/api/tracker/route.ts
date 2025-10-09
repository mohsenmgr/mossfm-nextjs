import { NextRequest, NextResponse } from 'next/server';

import checkAuthority from '@/lib/checkAuthority';
import connectToDB from '@/lib/mongoose';
import Follower from '@/models/Follower';

export const GET = async (req: NextRequest) => {
    try {
        await checkAuthority();

        // Connect to MongoDB
        await connectToDB();

        const followers = await Follower.find({});

        // Return JSON response
        return NextResponse.json(followers, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch quote:', error);
        return NextResponse.json({ error: 'Failed to fetch followers' }, { status: 500 });
    }
};
