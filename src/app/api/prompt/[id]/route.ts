import { NextRequest } from 'next/server';

import connectToDB from '@/lib/mongoose';
import Prompt, { IPrompt } from '@models/prompt';

import { Types } from 'mongoose';

// GET (read)
export const GET = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
    try {
        const { id } = await params;

        if (!Types.ObjectId.isValid(id)) {
            return new Response('Invalid ID format', { status: 400 });
        }

        await connectToDB();

        const prompt = await Prompt.findById(id).populate('creator');

        if (!prompt) {
            return new Response('Prompt not found!', { status: 404 });
        }

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error('GET error:', error);
        return new Response('Failed to fetch prompt', { status: 500 });
    }
};

// PATCH (update)
export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
    try {
        const { id } = await params;
        const { prompt, tag }: { prompt: string; tag: string } = await req.json();

        if (!Types.ObjectId.isValid(id)) {
            return new Response('Invalid ID format', { status: 400 });
        }

        await connectToDB();

        const existingPrompt = await Prompt.findById(id);
        if (!existingPrompt) {
            return new Response('Prompt not found!', { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        console.error('PATCH error:', error);
        return new Response('Failed to update the prompt', { status: 500 });
    }
};

// DELETE (delete)
export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> => {
    try {
        const { id } = await params;

        if (!Types.ObjectId.isValid(id)) {
            return new Response('Invalid ID format', { status: 400 });
        }

        await connectToDB();
        await Prompt.findByIdAndDelete(id);

        return new Response('Prompt deleted successfully', { status: 200 });
    } catch (error) {
        console.error('DELETE error:', error);
        return new Response('Failed to delete the prompt', { status: 500 });
    }
};
