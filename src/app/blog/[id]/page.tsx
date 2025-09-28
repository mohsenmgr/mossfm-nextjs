import React from 'react';

import Link from 'next/link';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type paramsType = Promise<{ id: string }>;

type Props = {
    params: paramsType;
};

async function getPost(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/blog/${id}`, { cache: 'no-store' });
    return res.json();
}

export default async function BlogPostPage({ params }: Props) {
    const { id } = await params; // keeping your destructuring exactly
    let post = null;
    try {
        post = await getPost(id);
    } catch (error) {
        return (
            <div className='flex min-h-screen items-center justify-center bg-transparent px-4'>
                <div className='w-full max-w-md rounded-2xl bg-gray-800 p-8 text-center shadow-lg'>
                    <h1 className='mb-4 text-3xl font-bold text-red-600'>:( Blog Post Not Found</h1>
                    <p className='mb-6 text-gray-300'>Sorry, the blog post you are looking for does not exist.</p>
                    <Link
                        href='/blog'
                        className='inline-block rounded bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700'>
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    if (post)
        return (
            <main className='min-h-screen w-full bg-transparent'>
                {/* Images */}
                {post.photos?.length > 0 && (
                    <div className='mt-0 w-full'>
                        {post.photos.map((url: string, idx: number) => (
                            <div key={idx} className='mb-6 w-full'>
                                <img
                                    src={url}
                                    alt={`Blog photo ${idx + 1}`}
                                    className='max-h-[80vh] w-full rounded-md object-cover shadow-lg'
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Content Card */}
                <section className='relative z-10 mx-auto -mt-12 mb-5 w-11/12 max-w-sm rounded-2xl bg-gray-800 p-6 shadow-lg sm:max-w-md sm:p-8 md:max-w-3xl lg:max-w-5xl'>
                    {/* Header */}
                    <header className='w-full bg-transparent px-2 py-8 text-center sm:px-6'>
                        <h1 className='mb-2 text-4xl font-bold text-white sm:text-5xl'>{post.title}</h1>
                        <p className='text-md text-gray-400 sm:text-lg'>
                            {new Date(post.date).toLocaleDateString()} • {post.author}
                        </p>
                    </header>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ node, ...props }) => (
                                <h1 className='my-6 text-3xl font-bold text-white sm:text-4xl' {...props} />
                            ),
                            h2: ({ node, ...props }) => (
                                <h2 className='my-5 text-2xl font-semibold text-white sm:text-3xl' {...props} />
                            ),
                            h3: ({ node, ...props }) => (
                                <h3 className='my-4 text-xl font-semibold text-white sm:text-2xl' {...props} />
                            ),
                            h4: ({ node, ...props }) => (
                                <h4 className='my-3 text-lg font-semibold text-white sm:text-xl' {...props} />
                            ),
                            h5: ({ node, ...props }) => (
                                <h5 className='my-2 text-base font-semibold text-white sm:text-lg' {...props} />
                            ),
                            h6: ({ node, ...props }) => (
                                <h6 className='my-1 text-sm font-semibold text-white sm:text-base' {...props} />
                            ),
                            p: ({ node, ...props }) => <p className='mb-4 leading-relaxed text-gray-200' {...props} />,
                            ul: ({ node, ...props }) => (
                                <ul className='mb-4 ml-4 list-inside list-disc text-gray-200' {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                                <ol className='mb-4 ml-4 list-inside list-decimal text-gray-200' {...props} />
                            ),
                            li: ({ node, ...props }) => <li className='mb-2' {...props} />,
                            code: ({ node, ...props }) => (
                                <code className='rounded bg-gray-700 px-1 py-0.5' {...props} />
                            ),
                            pre: ({ node, ...props }) => (
                                <pre className='mb-4 overflow-x-auto rounded bg-gray-800 p-4' {...props} />
                            )
                        }}>
                        {post.content}
                    </ReactMarkdown>
                </section>
            </main>
        );
}
