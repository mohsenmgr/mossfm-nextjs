import React from 'react';

import Link from 'next/link';

async function getPosts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/blog`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
}

// Helper to create a short excerpt from Markdown
function getExcerpt(content: string, length: number = 150) {
    const plain = content.replace(/[#_*~`>-]/g, ''); // simple Markdown cleanup
    return plain.length > length ? plain.slice(0, length) + '...' : plain;
}

export default async function BlogListingPage() {
    const posts = await getPosts();

    return (
        <section className='mx-auto max-w-6xl p-6'>
            <h1 className='mb-8 text-3xl font-bold'>Blog</h1>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {posts.map((post: any) => (
                    <div
                        key={post._id}
                        className='flex flex-col rounded-2xl bg-gray-900 p-6 shadow-lg transition hover:shadow-xl dark:bg-gray-800'>
                        {/* Thumbnail */}
                        {post.photos?.length > 0 && (
                            <img
                                src={post.photos[0]}
                                alt={`Thumbnail for ${post.title}`}
                                className='mb-4 h-48 w-full rounded-xl object-cover'
                            />
                        )}

                        {/* Title & Date */}
                        <h2 className='mb-1 text-xl font-semibold text-white'>{post.title}</h2>
                        <p className='mb-4 text-sm text-gray-400'>{new Date(post.date).toLocaleDateString()}</p>

                        {/* Excerpt */}
                        <p className='mb-4 text-gray-300'>{getExcerpt(post.content)}</p>

                        {/* Read More */}
                        <Link
                            href={`/blog/${post._id}`}
                            className='mt-auto inline-block rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700'>
                            Read More
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
