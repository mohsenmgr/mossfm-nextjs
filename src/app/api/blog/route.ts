import { NextRequest, NextResponse } from 'next/server';

import connectToDB from '@/lib/mongoose';
import BlogPost from '@/models/BlogPost';

export const GET = async (req: NextRequest) => {
    try {
        // Connect to MongoDB
        await connectToDB();

        const posts = await BlogPost.find().sort({ date: -1 });
        // Return JSON response
        return new Response(JSON.stringify(posts));
    } catch (error) {
        console.error('Failed to fetch jobs:', error);
        return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }
};
