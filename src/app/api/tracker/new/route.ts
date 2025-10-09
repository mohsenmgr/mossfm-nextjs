import { NextRequest } from 'next/server';

import checkAuthority from '@/lib/checkAuthority';
import connectToDB from '@/lib/mongoose';
import FollowerModel from '@/models/Follower';
import { Follower } from '@/types/Follower';

export const POST = async (req: NextRequest) => {
    try {
        await checkAuthority();
        await connectToDB();

        const follower: Follower = await req.json();

        const newFollower = new FollowerModel(follower);

        const result = await newFollower.save();

        return new Response(JSON.stringify(result), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Failed to create follower', { status: 500 });
    }
};
