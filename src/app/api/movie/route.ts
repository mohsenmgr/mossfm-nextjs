import { NextRequest } from 'next/server';

import checkAuthority from '@/lib/checkAuthority';
import connectToDB from '@/lib/mongoose';
import Movie from '@/models/Movie';

export const GET = async (req: NextRequest) => {
    await connectToDB();

    try {
        await checkAuthority();
        console.log('check authority');
        const movies = await Movie.find({});
        return new Response(JSON.stringify(movies), { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error && 'status' in error) {
            console.log('going to catch');

            const httpError = error as { status?: number; message: string };

            if (httpError.status === 401) {
                // Unauthorized → return all movies
                const movies = await Movie.find({ hidden: false });
                return new Response(JSON.stringify(movies), { status: 200 });
            }

            return new Response(JSON.stringify({ error: httpError.message }), { status: httpError.status || 500 });
        }

        // fallback
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};
