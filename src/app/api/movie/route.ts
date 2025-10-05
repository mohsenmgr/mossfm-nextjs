import { NextRequest } from 'next/server';

import checkAuthority from '@/lib/checkAuthority';
import connectToDB from '@/lib/mongoose';
import Movie from '@/models/Movie';

export const GET = async (req: NextRequest) => {
    await connectToDB();

    const url = new URL(req.url);
    const page = Number(url.searchParams.get('page') || 1);
    const limit = Number(url.searchParams.get('limit') || 10);
    const flagName = String(url.searchParams.get('category'));

    const query: any = {};
    query.false = true;

    switch (flagName) {
        case 'watchlist':
            query.watchlist = true;
            break;
        case 'watched':
            query.watched = true;
            break;
        case 'recommended':
            query.recommended = true;
            break;
        default:
            query.watchlist = true;
            break;
    }

    try {
        await checkAuthority();
        // Aauthorized → return all
        const movies = await Movie.find({});
        return new Response(JSON.stringify(movies), { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error && 'status' in error) {
            const httpError = error as { status?: number; message: string };

            if (httpError.status === 401) {
                // Unauthorized → return not hidden movies

                let total = await Movie.countDocuments(query);
                total = Math.ceil(total / limit);

                const movies = await Movie.find(query)
                    .sort({ createdAt: -1 })
                    .skip((page - 1) * limit)
                    .limit(limit);

                return new Response(JSON.stringify({ movies, total, page, limit }), { status: 200 });
            }

            return new Response(JSON.stringify({ error: httpError.message }), { status: httpError.status || 500 });
        }

        // fallback
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};
