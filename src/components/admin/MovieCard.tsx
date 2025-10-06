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
                    <div className='mt-4 grid grid-cols-2 gap-3'>
                        {/* Watched Button */}
                        <button
                            onClick={() => toggleWatched(movie)}
                            className={`w-full rounded-xl px-4 py-2.5 text-sm font-medium shadow-md transition ${
                                watched
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}>
                            {watched ? '✅ Watched' : 'Mark Watched'}
                        </button>

                        {/* Watchlist Button */}
                        <button
                            onClick={() => toggleWatchlist(movie)}
                            className={`w-full rounded-xl px-4 py-2.5 text-sm font-medium shadow-md transition ${
                                watchListed
                                    ? 'bg-blue-500 text-white hover:bg-blue-400'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}>
                            {watchListed ? '✅ In List' : 'Add to Watchlist'}
                        </button>

                        {/* Recommended Button */}
                        <button
                            onClick={() => toggleRecommended(movie)}
                            className={`w-full truncate rounded-xl px-4 py-2.5 text-sm font-medium shadow-md transition ${
                                recommended
                                    ? 'bg-indigo-500 text-white hover:bg-indigo-400'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}>
                            {recommended ? '✅ Recommended' : 'Recommend'}
                        </button>

                        {/* Delete Button */}
                        {(watched || recommended || watchListed) && (
                            <button
                                onClick={() => handleDelete(movie)}
                                className='w-full rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-red-400'>
                                🗑 Delete
                            </button>
                        )}

                        {/* Hide Button */}
                        <button
                            onClick={() => toggleHidden(movie)}
                            className={`w-full rounded-xl px-4 py-2.5 text-sm font-medium shadow-md transition ${
                                hidden
                                    ? 'bg-yellow-500 text-white hover:bg-yellow-400'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}>
                            {hidden ? 'Unhide' : 'Hide'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
