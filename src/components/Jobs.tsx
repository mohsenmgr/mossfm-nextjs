'use client';

import React, { useEffect, useState } from 'react';

import MultiTab from '@/components/MultiTab';
import Skeleton from '@/components/Skeleton';
import { IJob } from '@/models/Job';

function Jobs() {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch('/api/job'); // your GET API route
                if (!res.ok) throw new Error('Failed to fetch jobs');
                const data: IJob[] = await res.json();
                setJobs(data);
            } catch (err: any) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className='flex min-h-screen flex-col'>
            <div className='flex flex-1'>
                <main className='mx-auto min-h-[1300px] max-w-4xl flex-1 pt-8'>
                    <div className='space-y-8'>
                        <section>
                            {loading
                                ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)
                                : jobs.map((job) => <MultiTab key={job._id as string} job={job} />)}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Jobs;
