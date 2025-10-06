'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import MovieGrid from '@/components/MovieGrid';
import MovieCard from '@/components/admin/MovieCard';
import Tabs from '@/components/tab';
import { useMoviePagination } from '@/hooks/useMoviePagination';
import { Movie } from '@/types/ApiMovie';

function AdminMovie() {
    const { movies, isLoading, errorMessage, pageNumber, totalPages, setCategory, goToPage } =
        useMoviePagination('watchlist');
    const handleCategoryChange = (index: number) => {
        const currentTab = tabData[index].label.toLowerCase();
        setCategory(currentTab);
    };
    const tabData = [
        { label: 'Watchlist', content: <MovieGrid movies={movies} isAdmin={true} /> },
        { label: 'Watched', content: <MovieGrid movies={movies} isAdmin={true} /> },
        { label: 'Recommended', content: <MovieGrid movies={movies} isAdmin={true} /> }
    ];

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
