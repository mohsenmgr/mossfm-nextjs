import { NextRequest, NextResponse } from 'next/server';

import connectToDB from '@/lib/mongoose';
import Story from '@/models/Story';

export const POST = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectToDB();
        const { id } = await params;
        const { userId } = await req.json();

        const story = await Story.findById(id);
        if (!story) return new Response(JSON.stringify({ error: 'Story not found' }), { status: 404 });

        if (!story.likes.some((like: any) => like.userId === userId)) {
            story.likes.push({ userId });
            await story.save();
        }

        return new Response(JSON.stringify({ success: true, likesCount: story.likes.length }), {
            status: 200
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to like story' }, { status: 500 });
    }
};
