import { NextRequest } from 'next/server';

import checkAuthority from '@/lib/checkAuthority';
import connectToDB from '@/lib/mongoose';
import Follower from '@/models/Follower';

import { Types } from 'mongoose';

export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
    try {
        await checkAuthority();

        const { id } = await params;

        if (!Types.ObjectId.isValid(id)) {
            return new Response('Invalid ID format', { status: 400 });
        }

        await connectToDB();
        await Follower.findByIdAndDelete(id);

        return new Response('Follower deleted successfully', { status: 200 });
    } catch (error) {
        console.error('DELETE error:', error);
        return new Response('Failed to delete the follower', { status: 500 });
    }
};
