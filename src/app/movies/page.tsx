'use client';

import React, { useEffect, useState } from 'react';

import MovieGrid from '@/components/MovieGrid';
import Tabs from '@/components/tab';
import { LocalMovie, Movie } from '@/types/ApiMovie';

const getMovieFromApi = async (id: number) => {
    const endpoint = `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/movie/${id}?language=en-US`;
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        }
    });

    if (!response.ok) throw new Error('Failed to fetch movie');
    const data = await response.json();

    return data;
};

function AdminMovie() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [category, setCategory] = useState('watchlist');

    const handleCategoryChange = (index: number) => {
        const currentTab = tabData[index].label.toLowerCase();
        setCategory(currentTab);
    };

    const goToPage = (p: number) => {
        if (p >= 1 && p <= totalPages) {
            setPageNumber(p);
        }
    };

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            try {
                const savedResponse = await fetch(`/api/movie?page=${pageNumber}&limit=10&category=${category}`, {
                    method: 'GET',
                    headers: { accept: 'application/json' }
                });

                const response: { movies: LocalMovie[]; total: number; page: number; limit: number } =
                    await savedResponse.json();

                if (!response || !Array.isArray(response.movies)) {
                    throw new Error('Invalid response format');
                }

                const savedMovies: LocalMovie[] = response.movies;

                // Fetch all TMDB details in parallel
                const moviesWithDetails = await Promise.all(
                    savedMovies.map(async (movie) => {
                        const data = await getMovieFromApi(movie.id);

                        return { ...data, ...movie }; // merge db fields with TMDB data
                    })
                );

                setMovies(moviesWithDetails);
                setTotalPages(response.total);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setErrorMessage('Error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [pageNumber, category]); // ✅ empty dependency array

    const tabData = [
        { label: 'Watchlist', content: <MovieGrid movies={movies} isAdmin={false} /> },
        { label: 'Watched', content: <MovieGrid movies={movies} isAdmin={false} /> },
        { label: 'Recommended', content: <MovieGrid movies={movies} isAdmin={false} /> }
    ];

    return (
        <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
            {/* Page Header */}
            <h1 className='mb-6 text-3xl font-bold text-white'>Movie Watchlist</h1>

            {/* Loading & Errors */}
            {isLoading && <h3 className='text-center text-gray-400'>Loading...</h3>}
            {errorMessage && <h4 className='text-center text-red-500'>{errorMessage}</h4>}

            <div className='flex-1 p-0'>
                {/*  <h1 className='mb-4 text-2xl font-bold text-white'></h1> */}
                <Tabs tabs={tabData} parentNotifyChange={handleCategoryChange} />
            </div>

            <div className='mt-6 flex justify-center space-x-2'>
                <button
                    disabled={pageNumber === 1}
                    onClick={() => goToPage(pageNumber - 1)}
                    className='rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600 disabled:opacity-50'>
                    Prev
                </button>

                <span className='px-2 py-1 text-gray-300'>
                    Page {pageNumber} of {totalPages}
                </span>

                <button
                    disabled={pageNumber === totalPages}
                    onClick={() => goToPage(pageNumber + 1)}
                    className='rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600 disabled:opacity-50'>
                    Next
                </button>
            </div>
        </main>
    );
}

export default AdminMovie;
