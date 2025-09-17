// app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';

import connectToDB from '@/lib/mongoose';
import AboutMe from '@/models/About';

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectToDB();
        const payload = await req.json();
        const { id } = await params;

        const res = await AboutMe.findByIdAndUpdate(id, payload, { new: true });
        if (!res) return new Response('About not found', { status: 404 });

        return new Response(JSON.stringify(res), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to update feed post', { status: 500 });
    }
};
