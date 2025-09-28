'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BlogForm from '@/components/admin/BlogForm';

export default function NewBlogPage() {
    const router = useRouter();

    return (
        <section className='mx-auto max-w-4xl p-6'>
            <Link
                href='/amin/blog'
                className='mb-6 inline-block rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                ← Back to Blog
            </Link>
            <h1 className='mb-6 text-2xl font-bold'>Create New Blog Post</h1>
            <BlogForm onSuccess={() => router.push('/amin/blog')} />
        </section>
    );
}
