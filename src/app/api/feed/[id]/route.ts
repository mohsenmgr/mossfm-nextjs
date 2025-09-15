// app/api/feed/[id]/route.ts
import { NextRequest } from 'next/server';

import connectToDB from '@/lib/mongoose';
import Feed from '@/models/Feed';

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectToDB();
        const body = await req.json();

        const { id } = await params;

        const updated = await Feed.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return new Response('Feed not found', { status: 404 });

        return new Response(JSON.stringify(updated), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to update feed post', { status: 500 });
    }
};

// app/api/feed/[id]/route.ts (add this below PATCH)
export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectToDB();

        const { id } = await params;

        await Feed.findByIdAndDelete(id);
        return new Response('Deleted successfully', { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to delete feed post', { status: 500 });
    }
};
