'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import Chip from './Chip';

export type Job = {
    _id?: string;
    title: string;
    location?: string;
    dateStart?: string;
    dateFinish?: string;
    jobDescription?: string;
    responsibilities: {
        title?: string;
        items?: string[];
    };
    skills?: string[];
    photos?: string[];
};

interface MultiTabProps {
    initialJobs: Job[];
}

export default function MultiTab({ initialJobs }: MultiTabProps) {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [disableLoadMore, setdisableLoadMore] = useState(false);

    const loadMore = async () => {
        setLoadingMore(true);
        try {
            const res = await fetch(`/api/job?page=${page + 1}&limit=2`);
            if (!res.ok) throw new Error('Failed to fetch more jobs');
            const newJobs: Job[] = await res.json();
            if (newJobs.length > 0) {
                setJobs((prev) => [...prev, ...newJobs]);
                setPage((prev) => prev + 1);
            } else setdisableLoadMore(true);
        } catch (err) {
            console.error('Load more failed:', err);
        } finally {
            setLoadingMore(false);
        }
    };

    if (!jobs || jobs.length === 0) {
        return <div className='p-6 text-gray-300'>No jobs to display.</div>;
    }

    return (
        <div className='space-y-12'>
            {jobs.map((job, idx) => (
                <JobCard key={job._id ?? idx} job={job} />
            ))}
            {!disableLoadMore && (
                <div className='flex justify-center py-6'>
                    <button
                        onClick={loadMore}
                        disabled={loadingMore}
                        className='rounded-lg bg-green-600 px-6 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-50'>
                        {loadingMore ? 'Loading...' : 'Load more'}
                    </button>
                </div>
            )}
        </div>
    );
}

function JobCard({ job }: { job: Job }) {
    const [activeTab, setActiveTab] = useState<'about' | 'services' | 'gallery'>('about');
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    const photos = job.photos ?? [];
    const hasGallery = photos.length > 0;

    const nextPhoto = () => setCurrentPhoto((prev) => (prev + 1) % photos.length);
    const prevPhoto = () => setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);

    return (
        <div className='px-4 sm:px-6 lg:px-8'>
            <div className='w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800'>
                {/* TAB HEADERS */}
                <ul
                    className='flex flex-wrap rounded-t-lg border-b border-gray-200 bg-[rgba(13,52,58,1)] text-center text-sm font-medium dark:border-gray-700 dark:text-green-100'
                    role='tablist'>
                    <li className='me-2'>
                        <button
                            type='button'
                            aria-selected={activeTab === 'about'}
                            onClick={() => setActiveTab('about')}
                            className={`inline-block p-4 transition-colors ${
                                activeTab === 'about' ? 'text-green-400' : 'text-green-100 hover:text-green-400'
                            }`}>
                            Job
                        </button>
                    </li>

                    <li className='me-2'>
                        <button
                            type='button'
                            aria-selected={activeTab === 'services'}
                            onClick={() => setActiveTab('services')}
                            className={`inline-block p-4 transition-colors ${
                                activeTab === 'services' ? 'text-green-400' : 'text-green-100 hover:text-green-400'
                            }`}>
                            Responsibilities
                        </button>
                    </li>

                    {hasGallery && (
                        <li className='me-2'>
                            <button
                                type='button'
                                aria-selected={activeTab === 'gallery'}
                                onClick={() => setActiveTab('gallery')}
                                className={`inline-block p-4 transition-colors ${
                                    activeTab === 'gallery' ? 'text-green-400' : 'text-green-100 hover:text-green-400'
                                }`}>
                                Gallery
                            </button>
                        </li>
                    )}
                </ul>

                {/* TAB CONTENT */}
                <div className='rounded-lg bg-[rgba(13,52,58,1)] p-4 md:p-8'>
                    {/* ABOUT */}
                    {activeTab === 'about' && (
                        <div>
                            <h2 className='mb-1 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
                                {job.title}
                            </h2>
                            <p className='mb-4 text-sm text-gray-300 italic'>
                                📍 {job.location ?? 'N/A'} — {job.dateStart ?? '?'} to {job.dateFinish ?? '?'}
                            </p>
                            <p className='mb-3 whitespace-pre-line text-gray-100'>{job.jobDescription}</p>
                        </div>
                    )}

                    {/* RESPONSIBILITIES */}
                    {activeTab === 'services' && (
                        <div>
                            <h2 className='mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
                                {job.responsibilities?.title ?? 'Responsibilities'}
                            </h2>
                            {job.responsibilities?.items?.length ? (
                                <ul className='space-y-4 text-gray-500 dark:text-gray-100'>
                                    {job.responsibilities.items.map((item, idx) => (
                                        <li key={idx} className='flex items-center space-x-2 rtl:space-x-reverse'>
                                            <svg
                                                className='h-3.5 w-3.5 shrink-0 text-green-600 dark:text-green-500'
                                                aria-hidden='true'
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='currentColor'
                                                viewBox='0 0 20 20'>
                                                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                                            </svg>
                                            <span className='leading-tight'>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className='text-gray-300'>No responsibilities listed.</p>
                            )}
                        </div>
                    )}

                    {/* GALLERY */}
                    {activeTab === 'gallery' && hasGallery && (
                        <div className='relative h-96 w-full overflow-hidden rounded-xl'>
                            <Image
                                src={photos[currentPhoto]}
                                alt={`Photo ${currentPhoto + 1}`}
                                fill
                                className='cursor-pointer rounded-xl object-cover'
                                onClick={() => setModalOpen(true)}
                            />

                            {/* Prev button */}
                            <button
                                onClick={prevPhoto}
                                className='absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70'>
                                ‹
                            </button>

                            {/* Next button */}
                            <button
                                onClick={nextPhoto}
                                className='absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70'>
                                ›
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* CHIPS */}
            {job.skills && job.skills.length > 0 && (
                <div className='my-4 flex flex-wrap gap-2'>
                    {job.skills.map((skill, idx) => (
                        <Chip key={idx} text={skill} />
                    ))}
                </div>
            )}

            {/* MODAL */}
            {modalOpen && (
                <div
                    className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'
                    onClick={() => setModalOpen(false)}>
                    <div
                        className='relative flex h-full max-h-[90vh] w-full max-w-5xl items-center justify-center p-4'
                        onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={photos[currentPhoto]}
                            alt={`Photo ${currentPhoto + 1}`}
                            width={1200}
                            height={800}
                            className='max-h-[90vh] w-auto rounded-lg object-contain'
                        />

                        {/* Close button */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className='absolute top-4 right-4 rounded-full bg-black/70 px-3 py-1 text-white'>
                            ✕
                        </button>

                        {/* Prev */}
                        <button
                            onClick={prevPhoto}
                            className='absolute top-1/2 left-6 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white'>
                            ‹
                        </button>

                        {/* Next */}
                        <button
                            onClick={nextPhoto}
                            className='absolute top-1/2 right-6 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white'>
                            ›
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
