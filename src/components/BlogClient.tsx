'use client';

import Link from 'next/link';

import BlogCarousel from './BlogCarousel';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function getExcerpt(content: string, length: number = 150) {
    const plain = content.replace(/[#_*~`>-]/g, '');
    return plain.length > length ? plain.slice(0, length) + '...' : plain;
}

export default function BlogGrid({ posts }: { posts: any[] }) {
    return (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {posts.map((post) => (
                <div
                    key={post._id}
                    className='flex flex-col rounded-2xl bg-gray-900 p-6 shadow-lg transition hover:shadow-xl dark:bg-gray-800'>
                    {/* Carousel for photos */}
                    {post.photos?.length > 0 && (
                        <div className='mb-4'>
                            <BlogCarousel photos={post.photos} detailPage={false} />
                        </div>
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
    );
}
