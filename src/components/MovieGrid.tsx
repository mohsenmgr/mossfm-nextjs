import React from 'react';

import { Movie } from '@/types/ApiMovie';

import MovieCard from './admin/MovieCard';

type MovieGridProps = {
    movies: Movie[];
    isAdmin: boolean;
};

function MovieGrid({ movies, isAdmin }: MovieGridProps) {
    return (
        <>
            {/* Movie Grid */}
            <div className='min-h-[70vh] rounded-2xl bg-gray-800 p-6 shadow-lg'>
                {movies.length === 0 ? (
                    <p className='text-center text-gray-400'>No movies</p>
                ) : (
                    <>
                        <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                            {movies.map((movie) => (
                                <MovieCard
                                    isAdmin={isAdmin}
                                    key={movie.id}
                                    movie={movie}
                                    onAddToWatchlist={() => console.log()}
                                    onHide={() => console.log()}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default MovieGrid;
