import React from 'react';

import { Movie } from '@/types/ApiMovie';

import MovieCard from './admin/MovieCard';

type MovieGridProps = {
    movies: Movie[];
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    isAdmin: boolean;
};

function MovieGrid({ movies, setMovies, isAdmin }: MovieGridProps) {
    const handleMovieChange = async (movie: Movie) => {
        try {
            const response = await fetch('/api/movie/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            });

            if (!response.ok) {
                const res = await response.text();
                alert(`Failed to save movie: ${res}`);
                console.error('Failed to save movie:', res);
            }
        } catch (error) {
            alert(`Catch save movie error: ${error}`);
            console.error('Catch save movie error:', error);
        }
    };

    const handleDeleteItem = async (movie: Movie) => {
        const hasConfirmed = confirm('Are you sure you want to delete this Movie?');
        if (hasConfirmed) {
            const res = await fetch(`/api/movie/${movie._id}`, { method: 'DELETE' });
            if (res.ok) {
                const tmpMovies = movies.filter((m) => m._id !== movie._id);
                setMovies(tmpMovies);
            } else alert(`Delete request failed code:${res.status} status:${res.statusText}`);
        }
    };

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
                                    onMovieChange={handleMovieChange}
                                    handleDelete={handleDeleteItem}
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
