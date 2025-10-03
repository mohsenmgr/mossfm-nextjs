import React, { useState } from 'react';

import { Movie } from '@/types/ApiMovie';

type MovieProps = {
    movie: Movie;
    onAddToWatchlist: (movie: Movie) => void;
    onHide: (movie: Movie) => void;
    isAdmin: boolean;
};

export default function MovieCard({ movie, onHide, onAddToWatchlist, isAdmin }: MovieProps) {
    const [added, setAdded] = useState(movie.watched);
    const [hidden, setHidden] = useState(movie.hidden);

    const toggleWatchlist = (movie: Movie) => {
        setAdded(!added);
        movie.watched = !added;
        onAddToWatchlist(movie);
    };

    const toggleHidden = (movie: Movie) => {
        setHidden(!hidden);
        movie.hidden = !movie.hidden;
        onHide(movie);
    };

    return (
        <div className='flex flex-col overflow-hidden rounded-xl bg-gray-900 shadow-md transition hover:shadow-lg'>
            <img
                src={
                    movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/images/no-movie.png'
                }
                alt={movie.original_title}
                className='h-72 w-full object-cover'
            />

            <div className='flex flex-1 flex-col justify-between p-4'>
                {/* Title */}
                <h3 className='truncate text-lg font-semibold text-white'>{movie.original_title}</h3>

                {/* Info row */}
                <div className='mt-2 flex items-center gap-2 text-sm text-gray-400'>
                    <div className='flex items-center gap-1'>
                        <img src='/images/star.svg' alt='Star Icon' className='h-4 w-4' />
                        <p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
                    </div>
                    <span>•</span>
                    <p className='uppercase'>{movie.original_language}</p>
                    <span>•</span>
                    <p>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                </div>

                {/* Action buttons */}
                {isAdmin && (
                    <div className='mt-4 flex gap-2'>
                        {/* Watchlist Button */}
                        <button
                            onClick={() => toggleWatchlist(movie)}
                            className={`flex-1 rounded px-3 py-2 text-sm text-white transition ${
                                added ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-500'
                            }`}>
                            {added ? '✅ Added' : '+ Watchlist'}
                        </button>

                        {/* Hide Button */}
                        <button
                            onClick={() => toggleHidden(movie)}
                            className={`flex-1 rounded px-3 py-2 text-sm text-white transition ${
                                hidden ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-red-600 hover:bg-red-500'
                            }`}>
                            {hidden ? 'Unhide' : 'Hide'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
