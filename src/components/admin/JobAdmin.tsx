'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export type Job = {
    _id: string;
    title: string;
    jobDescription?: string;
    dateStart?: string;
    dateFinish?: string;
    photos?: string[];
};

export default function AdminJobPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/job?admin=true');
            if (!res.ok) throw new Error('Failed to fetch jobs');
            const data: Job[] = await res.json();
            setJobs(data);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const deleteJob = async (id: string) => {
        if (!confirm('Are you sure you want to delete this job?')) return;
        try {
            const res = await fetch(`/api/job/${id}`, {
                method: 'DELETE'
            });
            if (!res.ok) throw new Error('Failed to delete job');
            setJobs((prev) => prev.filter((j) => j._id !== id));
        } catch (err) {
            alert('Error deleting job');
        }
    };

    return (
        <div className='p-8'>
            {/* Header with Insert button */}
            <div className='mb-8 flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-100'>Manage Jobs</h1>
                <Link
                    href='/amin/jobs/insert'
                    className='rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700'>
                    + New Job
                </Link>
            </div>

            {loading && <p className='text-gray-400'>Loading...</p>}
            {error && <p className='text-red-400'>{error}</p>}

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className='flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800'>
                        {/* Thumbnail */}
                        {job.photos && job.photos.length > 0 ? (
                            <Image
                                src={job.photos[0]}
                                alt={job.title}
                                width={400}
                                height={200}
                                className='h-40 w-full object-cover'
                            />
                        ) : (
                            <div className='flex h-40 w-full items-center justify-center bg-gray-200 text-gray-500 dark:bg-gray-700'>
                                No Image
                            </div>
                        )}

                        {/* Content */}
                        <div className='flex-1 p-4'>
                            <h2 className='mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100'>{job.title}</h2>
                            <p className='line-clamp-3 text-sm text-gray-600 dark:text-gray-300'>
                                {job.jobDescription || 'No description'}
                            </p>
                            <p className='mt-2 text-xs text-gray-400'>
                                {job.dateStart} → {job.dateFinish}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className='flex items-center justify-between border-t border-gray-200 px-4 py-2 dark:border-gray-700'>
                            <button
                                onClick={() => router.push(`/admin/job/edit/${job._id}`)}
                                className='rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700'>
                                Edit
                            </button>
                            <button
                                onClick={() => deleteJob(job._id)}
                                className='rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700'>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
