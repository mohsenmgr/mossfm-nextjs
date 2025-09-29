import { NextRequest } from 'next/server';

import checkAuthority from '@/lib/checkAuthority';
import connectToDB from '@/lib/mongoose';
import Message from '@/models/Message';

import { Types } from 'mongoose';

// GET (read)
export const GET = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
    try {
        await checkAuthority();

        const { id } = await params;

        if (!Types.ObjectId.isValid(id)) {
            return new Response('Invalid ID format', { status: 400 });
        }

        await connectToDB();

        const message = await Message.findById(id);

        if (!message) {
            return new Response('Message not found!', { status: 404 });
        }

        return new Response(JSON.stringify(message), { status: 200 });
    } catch (error) {
        console.error('GET error:', error);
        return new Response('Failed to fetch message', { status: 500 });
    }
};

// DELETE (delete)
export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
    try {
        await checkAuthority();

        const { id } = await params;

        if (!Types.ObjectId.isValid(id)) {
            return new Response('Invalid ID format', { status: 400 });
        }

        await connectToDB();
        await Message.findByIdAndDelete(id);

        return new Response('Message deleted successfully', { status: 200 });
    } catch (error) {
        console.error('DELETE error:', error);
        return new Response('Failed to delete the message', { status: 500 });
    }
};
