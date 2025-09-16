'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useFeedFetch } from '@/hooks/usePaginatedFetch';
import type { FeedImage } from '@/types/feed';
import { AdvancedImage } from '@cloudinary/react';

interface FeedItem {
    _id: string;
    text: string;
    imageUrl: FeedImage | null;
    hidden: boolean;
    createdAt: string;
}

export default function FeedAdminPage() {
    const router = useRouter();

    const {
        data: posts = [],
        loading,
        hasMore,
        loadMore,
        removeItem,
        updateItem
    } = useFeedFetch<FeedItem>('/api/feed?admin=true', 5);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`/api/feed/${id}`, { method: 'DELETE' });
            if (res.ok) {
                removeItem(id);
            }
        } catch (error) {
            alert(`Delete request failed ${error}`);
        }
    };

    const toggleHidden = async (id: string, hidden: boolean) => {
        const res = await fetch(`/api/feed/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hidden: !hidden })
        });
        if (res.ok) {
            updateItem(id, { hidden: !hidden });
        }
    };

    return (
        <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
            {/* Top buttons */}
            <div className='mb-4 flex items-center justify-between'>
                <button
                    onClick={() => router.push('/amin/dashboard')}
                    className='rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                    ← Back to Dashboard
                </button>

                <button
                    onClick={() => router.push('/amin/feed/new')}
                    className='rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                    + Create Post
                </button>
            </div>

            <h1 className='mb-6 text-3xl font-bold text-white'>Manage Feed Posts</h1>

            {/* Posts list */}
            <div className='grid grid-cols-1 gap-6'>
                {posts.length === 0 && !loading && <p className='text-gray-400'>No feed posts yet.</p>}

                {posts.map((post) => (
                    <div key={post._id} className='flex flex-col gap-2 rounded-lg border bg-gray-900 p-4 shadow-md'>
                        <p className='font-medium text-white'>{post.text}</p>

                        {post.imageUrl && (
                            <div className='relative max-h-64 w-full overflow-hidden rounded-lg'>
                                {post.imageUrl.type === 'cloudinary' ? (
                                    <AdvancedImage
                                        cldImg={post.imageUrl.value}
                                        className='h-full w-full object-cover'
                                    />
                                ) : (
                                    <Image
                                        src={post.imageUrl.value}
                                        alt='Post image'
                                        width={600}
                                        height={400}
                                        className='h-full w-full object-cover'
                                    />
                                )}
                            </div>
                        )}

                        <p className='text-xs text-gray-500'>{new Date(post.createdAt).toLocaleString()}</p>

                        <div className='mt-2 flex gap-2'>
                            <button
                                onClick={() => toggleHidden(post._id, post.hidden)}
                                className='rounded bg-yellow-500 px-3 py-1 text-sm text-white'>
                                {post.hidden ? 'Unhide' : 'Hide'}
                            </button>

                            <button
                                onClick={() => handleDelete(post._id)}
                                className='rounded bg-red-600 px-3 py-1 text-sm text-white'>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More button */}
            {hasMore && (
                <button
                    onClick={loadMore}
                    className='mt-6 w-full rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                    {loading ? 'Loading...' : 'Load More'}
                </button>
            )}

            {loading && posts.length === 0 && <p className='mt-6 text-center text-gray-400'>Loading feed...</p>}
        </main>
    );
}
