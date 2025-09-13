'use client';

import { FC, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { type Post, PromptCardList } from '@/components/PromptCardList';
import Skeleton from '@/components/Skeleton';

import { useSession } from 'next-auth/react';

export default function PromptPage() {
    const { data: session, status } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);
    const router = useRouter(); // <-- call the hook inside component

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/amin');
        }
    }, [status, router]);

    const handleDelete = async (postId: string) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${postId}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((p) => p._id !== postId);
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleEdit = async (postId: string) => {
        router.push(`/amin/prompts/edit?id=${postId}`);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            setPosts(data);
        };

        fetchPosts();
    }, [status]);

    if (status === 'loading')
        return (
            <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} />
                ))}
            </main>
        );
    return (
        <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
            <button
                onClick={() => router.push('/amin/dashboard')}
                className='mb-6 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                ← Back to Dashboard
            </button>

            <div className='mb-4 flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-white'>Manage Prompts</h1>
                <button
                    onClick={() => router.push('/amin/prompts/new')}
                    className='rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                    + Create Prompt
                </button>
            </div>

            <div className='min-h-[80vh] rounded-2xl bg-gray-900 p-6 shadow-lg dark:bg-gray-800'>
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    <PromptCardList
                        posts={posts}
                        currentUserId={session?.user.id}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                </div>
            </div>
        </main>
    );
}
