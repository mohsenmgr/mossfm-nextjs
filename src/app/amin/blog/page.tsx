'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { redirect } from 'next/navigation';

interface BlogPost {
    _id: string;
    title: string;
    date: string;
    slug: string;
}

export default function AdminBlogListPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    const fetchPosts = async () => {
        const res = await fetch('/api/blog');
        const data = await res.json();
        setPosts(data);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        await fetch(`/api/blog/${id}`, { method: 'DELETE' });
        fetchPosts();
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
            <button
                onClick={() => redirect('/amin/dashboard')}
                className='mb-6 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                ← Back to Dashboard
            </button>

            <div className='mb-4 flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-white'>Manage Blog</h1>
                <button
                    onClick={() => redirect('/amin/blog/new')}
                    className='rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                    + Create New
                </button>
            </div>

            <div className='min-h-[80vh] rounded-2xl bg-gray-800 p-6 shadow-lg dark:bg-gray-800'>
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className='flex flex-col justify-between rounded-xl bg-gray-900 p-4 shadow-md transition hover:shadow-lg'>
                            <div>
                                <h2 className='text-lg font-semibold text-white'>{post.title}</h2>
                                <p className='text-sm text-gray-400'>{new Date(post.date).toLocaleDateString()}</p>
                            </div>

                            <div className='mt-4 flex gap-2'>
                                <Link
                                    href={`/amin/blog/edit/${post._id}`}
                                    className='flex-1 rounded bg-blue-600 px-3 py-2 text-center text-sm text-white hover:bg-blue-700'>
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className='flex-1 rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
