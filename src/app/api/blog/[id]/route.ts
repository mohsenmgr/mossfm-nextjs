// app/api/job/[id]/route.ts
import { NextRequest } from 'next/server';

import connectToDB from '@/lib/mongoose';
import BlogPost from '@/models/BlogPost';

import { Types } from 'mongoose';

export const GET = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
    try {
        const { id } = await params;

        if (!Types.ObjectId.isValid(id)) {
            return new Response('Invalid ID format', { status: 400 });
        }

        await connectToDB();

        const blogPost = await BlogPost.findById(id);

        if (!blogPost) {
            return new Response('Blog post not found!', { status: 404 });
        }

        return new Response(JSON.stringify(blogPost), { status: 200 });
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

        const updated = await BlogPost.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return new Response('Blog post not found', { status: 404 });

        return new Response(JSON.stringify(updated), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to update blog post', { status: 500 });
    }
};

export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        await connectToDB();

        const { id } = await params;

        await BlogPost.findByIdAndDelete(id);
        return new Response('Deleted successfully', { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to delete blog post', { status: 500 });
    }
};
