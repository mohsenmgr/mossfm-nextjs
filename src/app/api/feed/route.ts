// app/api/feed/route.ts
import { NextRequest } from 'next/server';

import connectToDB from '@/lib/mongoose';
import Feed from '@/models/Feed';

export async function GET(req: NextRequest) {
    await connectToDB();

    const url = new URL(req.url);
    const page = Number(url.searchParams.get('page') || 1);
    const limit = Number(url.searchParams.get('limit') || 5);
    const admin = url.searchParams.get('admin') === 'true';

    // Build query
    const query: any = {};
    if (!admin) query.hidden = false;

    // Total count
    const total = await Feed.countDocuments(query);

    // Fetch posts, newest first
    const posts = await Feed.find(query)
        .sort({ createdAt: -1 }) // latest posts first
        .skip((page - 1) * limit)
        .limit(limit);

    return new Response(JSON.stringify({ posts, total, page, limit }));
}
