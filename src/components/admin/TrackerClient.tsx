'use client';

import { useEffect, useState } from 'react';

import { redirect } from 'next/navigation';

import { Follower } from '@/types/Follower';

import TrackerForm from './TrackerForm';
import TrackerGrid from './TrackerGrid';

const TrackerClient = () => {
    const [followers, setFollowers] = useState<Follower[]>([]);

    const fetchFollowers = async () => {
        try {
            const result = await fetch('/api/tracker', {
                method: 'GET'
            });

            if (!result.ok) throw new Error('Failed to fetch followers');
            const json = await result.json();
            setFollowers(json);
        } catch (error) {
            alert(`Error fetching: ${error}`);
        }
    };

    useEffect(() => {
        fetchFollowers();
    }, []);

    const refreshItems = async () => {
        fetchFollowers();
    };

    return (
        <div>
            <button
                onClick={() => redirect('/amin/dashboard')}
                className='mb-6 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                ← Back to Dashboard
            </button>
            <h1 className='mb-2 flex justify-start text-2xl font-bold text-white'>Total: {followers.length}</h1>
            <div className='min-h-[80vh] rounded-2xl bg-gray-800 p-6 shadow-lg dark:bg-gray-800'>
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1'>
                    <TrackerForm items={followers} setItems={setFollowers} refresh={refreshItems} />
                    <TrackerGrid items={followers} setItems={setFollowers} />
                </div>
            </div>
        </div>
    );
};

export default TrackerClient;
