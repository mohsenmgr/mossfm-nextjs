// app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';

import checkAuthority from '@/lib/checkAuthority';
import connectToDB from '@/lib/mongoose';
import type { IMovie } from '@/models/Movie';
import MovieModel from '@/models/Movie';
import type { Movie } from '@/types/ApiMovie';
import { toIMovie } from '@/types/ApiMovie';

export const POST = async (req: NextRequest) => {
    try {
        await checkAuthority();
        // Connect to MongoDB
        await connectToDB();
        const movieItem: Movie = await req.json();
        const tmpMovie: IMovie = toIMovie(movieItem);

        if (!tmpMovie.id) {
            return NextResponse.json({ error: 'movie id is required' });
        }

        console.log(tmpMovie);

        const updatedMovie = await MovieModel.findOneAndUpdate(
            { id: tmpMovie.id }, // query
            { $set: { ...tmpMovie } }, // update fields
            { new: true, upsert: true } // return the new doc, create if doesn't exist
        );

        // Return JSON response
        return NextResponse.json({ message: 'Movie created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Failed to create movie:', error);
        return NextResponse.json({ error: 'Failed to create movie' }, { status: 500 });
    }
};
