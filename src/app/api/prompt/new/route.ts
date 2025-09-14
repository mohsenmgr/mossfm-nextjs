// app/api/prompt/new/route.ts
import { NextRequest } from 'next/server';

import connectToDB from '@/lib/mongoose';
import Prompt, { IPrompt } from '@/models/prompt';

export const POST = async (req: NextRequest) => {
    try {
        await connectToDB();

        const { userId, prompt, tag }: { userId: string; prompt: string; tag: string } = await req.json();

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to create prompt', { status: 500 });
    }
};
