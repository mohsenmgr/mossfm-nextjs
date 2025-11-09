import { NextRequest, NextResponse } from 'next/server';

import connectToDB from '@/lib/mongoose';
import Story from '@/models/Story';

export const POST = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectToDB();
        const { id } = await params;
        const { name, text } = await req.json();

        if (!text) return NextResponse.json({ error: 'Comment text is required' }, { status: 400 });

        const story = await Story.findById(id);
        if (!story) return NextResponse.json({ error: 'Story not found' }, { status: 404 });

        story.comments = story.comments || [];
        story.comments.push({ name: name || 'Anonymous', text });

        await story.save();

        return NextResponse.json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
    }
};
