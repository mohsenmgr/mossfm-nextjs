'use client';

import React, { useRef, useState } from 'react';

import Image from 'next/image';

import { useFeedFetch } from '@/hooks/usePaginatedFetch';

export interface FeedItem {
    _id: string;
    text: string;
    imageUrl?: string;
    hidden: boolean;
    createdAt: string;
}

interface FeedProps {
    apiUrl: string; // e.g., '/api/feed'
    profileImage: string;
    authorName: string;
}

const Feed: React.FC<FeedProps> = ({ apiUrl, profileImage, authorName }) => {
    const [expanded, setExpanded] = useState<{ _id: string | null; height: number | null }>({
        _id: null,
        height: null
    });

    const containerRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    // Fetch paginated feed
    const { data: items = [], loading, loadMore, hasMore } = useFeedFetch<FeedItem>(apiUrl, 5);

    const handleToggle = async (item: FeedItem) => {
        if (expanded._id === item._id) {
            setExpanded({ _id: null, height: null });
            return;
        }

        if (!item.imageUrl) return;

        const container = containerRefs.current.get(item._id);
        const containerWidth = container?.clientWidth ?? Math.min(window.innerWidth, 720);

        const img = new window.Image();
        img.src = item.imageUrl;

        await new Promise<void>((resolve) => {
            if (img.complete && img.naturalWidth) return resolve();
            img.onload = () => resolve();
            img.onerror = () => resolve();
        });

        const naturalW = img.naturalWidth || containerWidth;
        const naturalH = img.naturalHeight || Math.round(containerWidth * 0.6);

        let scaledHeight = Math.round((naturalH * containerWidth) / naturalW);
        const maxAllowed = Math.round(window.innerHeight * 0.8);
        if (scaledHeight > maxAllowed) scaledHeight = maxAllowed;

        setExpanded({ _id: item._id, height: scaledHeight });
    };

    // Filter out hidden posts for public feed
    const visibleItems = items.filter((item) => !item.hidden);

    if (loading && visibleItems.length === 0) {
        return <div className='flex justify-center py-10 text-gray-500'>Loading feed...</div>;
    }

    return (
        <div className='mx-auto max-w-2xl space-y-6'>
            {visibleItems.map((item) => (
                <div
                    key={item._id}
                    className='flex items-start space-x-4 rounded-2xl bg-white p-5 shadow-md transition hover:shadow-lg dark:bg-gray-900'>
                    <Image
                        src={profileImage}
                        alt={authorName}
                        className='h-12 w-12 rounded-full border border-gray-300 dark:border-gray-700'
                        width={48}
                        height={48}
                    />

                    <div className='flex-1'>
                        <div className='flex items-center justify-between'>
                            <span className='font-semibold text-gray-900 dark:text-white'>{authorName}</span>
                            <span className='text-xs text-gray-500'>{new Date(item.createdAt).toLocaleString()}</span>
                        </div>

                        <p className='mt-2 whitespace-pre-line text-gray-700 dark:text-gray-300'>{item.text}</p>

                        {item.imageUrl && (
                            <div className='mt-3'>
                                <div
                                    ref={(el) => {
                                        if (el) containerRefs.current.set(item._id, el);
                                        else containerRefs.current.delete(item._id);
                                    }}
                                    onClick={() => handleToggle(item)}
                                    className={`relative w-full max-w-xl cursor-pointer overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 dark:border-gray-700 ${
                                        expanded._id === item._id ? '' : 'h-64'
                                    }`}
                                    style={
                                        expanded._id === item._id && expanded.height
                                            ? { height: `${expanded.height}px`, maxHeight: '80vh' }
                                            : undefined
                                    }>
                                    <Image
                                        src={item.imageUrl}
                                        alt='post'
                                        fill
                                        className={`rounded-xl ${expanded._id === item._id ? 'object-contain' : 'object-cover'}`}
                                    />
                                </div>

                                <p className='mt-1 text-center text-xs text-gray-500'>
                                    {expanded._id === item._id ? 'Click to collapse' : 'Click to expand'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {hasMore && (
                <button
                    onClick={loadMore}
                    className='w-full rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                    {loading ? 'Loading...' : 'Load More'}
                </button>
            )}
        </div>
    );
};

export default Feed;
