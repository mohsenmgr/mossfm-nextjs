import { NextRequest } from 'next/server';

import checkAuthority from '@/lib/checkAuthority';
import connectToDB from '@/lib/mongoose';
import Movie from '@/models/Movie';

export const GET = async (req: NextRequest) => {
    await connectToDB();

    try {
        await checkAuthority();
        // Aauthorized → return all

        const movies = await Movie.find({});

        return new Response(JSON.stringify(movies), { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error && 'status' in error) {
            const httpError = error as { status?: number; message: string };

            if (httpError.status === 401) {
                return new Response(JSON.stringify({ error: httpError.message }), { status: httpError.status });
            }

            return new Response(JSON.stringify({ error: httpError.message }), { status: httpError.status || 500 });
        }

        // fallback
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};
