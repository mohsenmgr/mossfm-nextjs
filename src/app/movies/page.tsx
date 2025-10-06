'use client';

import React, { useEffect, useState } from 'react';

import MovieGrid from '@/components/MovieGrid';
import Tabs from '@/components/tab';
import { useMoviePagination } from '@/hooks/useMoviePagination';

function PublicMovie() {
    const { movies, isLoading, errorMessage, pageNumber, totalPages, setCategory, goToPage, resetPage, setMovies } =
        useMoviePagination('watchlist');

    const handleCategoryChange = (index: number) => {
        const currentTab = tabData[index].label.toLowerCase();
        resetPage();
        setCategory(currentTab);
    };

    const tabData = [
        { label: 'Watchlist', content: <MovieGrid setMovies={setMovies} movies={movies} isAdmin={false} /> },
        { label: 'Watched', content: <MovieGrid setMovies={setMovies} movies={movies} isAdmin={false} /> },
        { label: 'Recommended', content: <MovieGrid setMovies={setMovies} movies={movies} isAdmin={false} /> }
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

export default PublicMovie;
