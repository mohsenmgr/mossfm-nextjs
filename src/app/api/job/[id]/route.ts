// app/api/job/[id]/route.ts
import { NextRequest } from 'next/server';

import connectToDB from '@/lib/mongoose';
import Job from '@/models/Job';

import { Types } from 'mongoose';

export const GET = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
    try {
        const { id } = await params;

        if (!Types.ObjectId.isValid(id)) {
            return new Response('Invalid ID format', { status: 400 });
        }

        await connectToDB();

        const job = await Job.findById(id);

        if (!job) {
            return new Response('Job not found!', { status: 404 });
        }

        return new Response(JSON.stringify(job), { status: 200 });
    } catch (error) {
        console.error('GET error:', error);
        return new Response('Failed to fetch job', { status: 500 });
    }
};

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectToDB();
        const body = await req.json();

        const { id } = await params;

        const updated = await Job.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return new Response('Job not found', { status: 404 });

        return new Response(JSON.stringify(updated), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to update job', { status: 500 });
    }
};

// app/api/job/[id]/route.ts (add this below PATCH)
export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectToDB();

        const { id } = await params;

        await Job.findByIdAndDelete(id);
        return new Response('Deleted successfully', { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to delete job', { status: 500 });
    }
};
