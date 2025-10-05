import React, { useState } from 'react';

import { Movie } from '@/types/ApiMovie';

type MovieProps = {
    movie: Movie;
    onMovieChange: (movie: Movie) => void;
    handleDelete: (movie: Movie) => void;
    isAdmin: boolean;
};

export default function MovieCard({ movie, onMovieChange, handleDelete, isAdmin }: MovieProps) {
    const [watchListed, setWatchlisted] = useState(movie.watchlist);
    const [recommended, setRecommended] = useState(movie.recommended);
    const [watched, setWatched] = useState(movie.watched);

    console.log(recommended);

    const [hidden, setHidden] = useState(movie.hidden);

    const toggleWatched = (movie: Movie) => {
        setWatched(!watched);
        movie.watched = !watched;
        onMovieChange(movie);
    };

    const toggleWatchlist = (movie: Movie) => {
        setWatchlisted(!watchListed);
        movie.watchlist = !watchListed;
        onMovieChange(movie);
    };

    const toggleRecommended = (movie: Movie) => {
        setRecommended(!recommended);
        movie.recommended = !recommended;
        onMovieChange(movie);
    };

    const toggleHidden = (movie: Movie) => {
        setHidden(!hidden);
        movie.hidden = !movie.hidden;
        onMovieChange(movie);
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
                    <div className='mt-4 flex flex-wrap gap-2'>
                        {/* Watchlist Button */}
                        <button
                            onClick={() => toggleWatched(movie)}
                            className={`flex-1 rounded px-3 py-2 text-sm text-white transition ${
                                watched ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-500'
                            }`}>
                            {watched ? '✅ Watched' : '+ Watched'}
                        </button>

                        <button
                            onClick={() => toggleWatchlist(movie)}
                            className={`flex-1 rounded px-3 py-2 text-sm text-white transition ${
                                watchListed ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-500'
                            }`}>
                            {watchListed ? '✅ In List' : '+ Watchlist'}
                        </button>

                        <button
                            onClick={() => toggleRecommended(movie)}
                            className={`flex-1 rounded px-3 py-2 text-sm text-white transition ${
                                recommended ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-500'
                            }`}>
                            {recommended ? '✅ Recommended' : '+ Recommended'}
                        </button>

                        {(watched || recommended || watchListed) && (
                            <button
                                onClick={() => handleDelete(movie)}
                                className={
                                    'flex-1 rounded bg-red-700 px-3 py-2 text-sm text-white transition hover:bg-red-600'
                                }>
                                Delete
                            </button>
                        )}

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
