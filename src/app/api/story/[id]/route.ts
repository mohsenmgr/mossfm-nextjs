import { NextRequest } from 'next/server';

import checkAuthority from '@/lib/checkAuthority';
import connectToDB from '@/lib/mongoose';
import Story from '@/models/Story';

export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await checkAuthority();
        await connectToDB();

        const { id } = await params;

        await Story.findByIdAndDelete(id);
        return new Response('Deleted successfully', { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to delete story', { status: 500 });
    }
};
