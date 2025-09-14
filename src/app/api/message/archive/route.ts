// app/api/prompt/new/route.ts
import { NextRequest } from 'next/server';

import connectToDB from '@/lib/mongoose';
import type { IMessagePayload } from '@/models/Message';
import MessageArchive, { IMessageArchive } from '@/models/MessageArchive';

export const POST = async (req: NextRequest) => {
    try {
        await connectToDB();

        const body = (await req.json()) as IMessagePayload;
        const newArchiveMessage = new MessageArchive({
            ...body,
            originalCreatedAt: body.createdAt
        });
        await newArchiveMessage.save();

        return new Response(JSON.stringify(newArchiveMessage), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to create message archive', { status: 500 });
    }
};
