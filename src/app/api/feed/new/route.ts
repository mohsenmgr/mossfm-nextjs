// app/api/feed/new/route.ts
import { NextRequest } from 'next/server';

import connectToDB from '@/lib/mongoose';
import Feed from '@/models/Feed';

export const POST = async (req: NextRequest) => {
    try {
        await connectToDB();
        const body = await req.json();

        const lastPost = await Feed.findOne().sort({ order: -1 });
        const newOrder = lastPost ? lastPost.order + 1 : 1;

        const feed = new Feed({
            text: body.text,
            imageUrl: body.imageUrl || undefined,
            hidden: body.hidden || false,
            order: newOrder
        });

        await feed.save();

        return new Response(JSON.stringify(feed), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to create feed post', { status: 500 });
    }
};
