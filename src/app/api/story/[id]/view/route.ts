import { NextRequest, NextResponse } from 'next/server';

import connectToDB from '@/lib/mongoose';
import Story from '@/models/Story';

export const POST = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectToDB();
        const { id } = await params;
        const { name } = await req.json();

        if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

        const story = await Story.findById(id);
        if (!story) return NextResponse.json({ error: 'Story not found' }, { status: 404 });

        // You could have a field `viewers` array to store names
        story.viewers = story.viewers || [];
        if (!story.viewers.includes(name)) story.viewers.push(name);

        await story.save();

        return NextResponse.json({ message: 'Viewer saved successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to save viewer' }, { status: 500 });
    }
};
