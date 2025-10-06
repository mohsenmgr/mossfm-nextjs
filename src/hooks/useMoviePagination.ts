import { useEffect, useState } from 'react';

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
    return response.json();
};

export function useMoviePagination(initialCategory = 'watchlist') {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [category, setCategory] = useState(initialCategory);

    const goToPage = (p: number) => {
        if (p >= 1 && p <= totalPages) {
            setPageNumber(p);
        }
    };

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            setMovies([]);
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

                // fetch TMDB details in parallel
                const moviesWithDetails = await Promise.all(
                    savedMovies.map(async (movie) => {
                        const data = await getMovieFromApi(movie.id);
                        return { ...data, ...movie };
                    })
                );

                setMovies(moviesWithDetails);
                setTotalPages(response.total);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setErrorMessage('Error fetching movies');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [pageNumber, category]);

    return {
        movies,
        isLoading,
        errorMessage,
        pageNumber,
        totalPages,
        category,
        setCategory,
        goToPage
    };
}
