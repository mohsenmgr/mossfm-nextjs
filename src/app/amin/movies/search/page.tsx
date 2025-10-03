'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import MovieCard from '@/components/admin/MovieCard';
import MovieSearchForm from '@/components/admin/MovieSearchForm';
import type { ApiMovie, Movie } from '@/types/ApiMovie';

import { useDebounce } from 'react-use';

const AdminMovieSearch = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const handleSearch = async (input: string, pageNum = 1) => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            // fetch db movies
            const savedResponse = await fetch('/api/movie', {
                method: 'GET',
                headers: {
                    accept: 'application/json'
                }
            }); // create an endpoint that returns all saved movies
            const savedMovies: { id: number; watched: boolean; hidden: boolean }[] = await savedResponse.json();

            // Create a lookup map for fast access
            const savedMap = new Map(savedMovies.map((m) => [m.id, { watched: m.watched, hidden: m.hidden }]));

            const endpoint = `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/search/${mediaType}?query=${encodeURIComponent(
                input
            )}&include_adult=false&language=en-US&page=${pageNum}`;
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch movie');

            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                setErrorMessage('No movies found.');
                setMovies([]);
                return;
            }

            const mergedResults = data.results.map((movie: ApiMovie) => {
                const saved = savedMap.get(movie.id);
                if (saved) {
                    return {
                        ...movie,
                        watched: saved.watched,
                        hidden: saved.hidden
                    };
                }
                return {
                    ...movie,
                    watched: false,
                    hidden: false
                };
            });

            setMovies(mergedResults || []);
            setPage(data.page);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.log(`Error fetching movies ${error}`);
            setErrorMessage('Error fetching movies. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (debouncedSearchTerm !== '') handleSearch(debouncedSearchTerm, 1);
    }, [debouncedSearchTerm, mediaType]);

    const goToPage = (p: number) => {
        if (p >= 1 && p <= totalPages) {
            handleSearch(debouncedSearchTerm, p);
        }
    };

    const handleMovieChange = async (movie: Movie) => {
        try {
            const response = await fetch('/api/movie/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            });

            if (response.ok) {
                alert('movie added');
            } else {
                console.error('Failed to save movie:', await response.text());
            }
        } catch (error) {}
    };

    return (
        <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
            <Link
                href='/amin/movies'
                className='mb-6 inline-block rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                ← Back to Movies
            </Link>
            {/* Page Header */}
            <h1 className='mb-6 text-3xl font-bold text-white'>Movie Search</h1>

            {/* Search Form */}
            <div className='mb-6 flex justify-center'>
                <div className='w-full max-w-xl'>
                    <MovieSearchForm
                        mediaType={mediaType}
                        setMediaType={setMediaType}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>
            </div>

            {/* Loading & Errors */}
            {isLoading && <h3 className='text-center text-gray-400'>Loading...</h3>}
            {errorMessage && <h4 className='text-center text-red-500'>{errorMessage}</h4>}

            {/* Movie Grid */}
            <div className='min-h-[70vh] rounded-2xl bg-gray-800 p-6 shadow-lg'>
                {movies.length === 0 ? (
                    <p className='text-center text-gray-400'>Start typing to search for movies...</p>
                ) : (
                    <>
                        <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                            {movies.map((movie) => (
                                <MovieCard
                                    isAdmin={true}
                                    key={movie.id}
                                    movie={movie}
                                    onAddToWatchlist={handleMovieChange}
                                    onHide={handleMovieChange}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className='mt-6 flex justify-center space-x-2'>
                            <button
                                disabled={page === 1}
                                onClick={() => goToPage(page - 1)}
                                className='rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600 disabled:opacity-50'>
                                Prev
                            </button>

                            <span className='px-2 py-1 text-gray-300'>
                                Page {page} of {totalPages}
                            </span>

                            <button
                                disabled={page === totalPages}
                                onClick={() => goToPage(page + 1)}
                                className='rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600 disabled:opacity-50'>
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default AdminMovieSearch;
