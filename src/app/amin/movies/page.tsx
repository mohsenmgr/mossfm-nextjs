'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import MovieCard from '@/components/admin/MovieCard';
import { Movie } from '@/types/ApiMovie';

function AdminMovie() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const savedResponse = await fetch('/api/movie', {
                    method: 'GET',
                    headers: { accept: 'application/json' }
                });

                const savedMovies: { id: number; watched: boolean; hidden: boolean }[] = await savedResponse.json();

                // Fetch all TMDB details in parallel
                const moviesWithDetails = await Promise.all(
                    savedMovies.map(async (movie) => {
                        const endpoint = `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/movie/${movie.id}?language=en-US`;
                        const response = await fetch(endpoint, {
                            method: 'GET',
                            headers: {
                                accept: 'application/json',
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                            }
                        });

                        if (!response.ok) throw new Error('Failed to fetch movie');
                        const data = await response.json();

                        return { ...data, ...movie }; // merge db fields with TMDB data
                    })
                );

                setMovies(moviesWithDetails);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setErrorMessage('Error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []); // ✅ empty dependency array

    return (
        <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
            <div className='mb-2 flex items-center justify-between'>
                <Link
                    href='/amin/dashboard'
                    className='mb-6 inline-block rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                    ← Back to Dashboard
                </Link>

                <Link
                    href='/amin/movies/search'
                    className='mb-6 inline-block rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                    Search →
                </Link>
            </div>
            {/* Page Header */}
            <h1 className='mb-6 text-3xl font-bold text-white'>Movie Watchlist</h1>

            {/* Loading & Errors */}
            {isLoading && <h3 className='text-center text-gray-400'>Loading...</h3>}
            {errorMessage && <h4 className='text-center text-red-500'>{errorMessage}</h4>}

            {/* Movie Grid */}
            <div className='min-h-[70vh] rounded-2xl bg-gray-800 p-6 shadow-lg'>
                {movies.length === 0 ? (
                    <p className='text-center text-gray-400'>Loading movies...</p>
                ) : (
                    <>
                        <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                            {movies.map((movie) => (
                                <MovieCard
                                    isAdmin={false}
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
        </main>
    );
}

export default AdminMovie;
