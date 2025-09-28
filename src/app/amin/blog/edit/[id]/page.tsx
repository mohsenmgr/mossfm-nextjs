'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import BlogForm from '@/components/admin/BlogForm';

export default function EditBlogPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        if (!id) return;

        const fetchData = async function () {
            const result = await fetch(`/api/blog/${id}`);
            const data = await result.json();
            setPost(data);
        };

        fetchData();
    }, [id]);

    if (!post) return <p className='p-6'>Loading...</p>;

    return (
        <section className='mx-auto max-w-4xl p-6'>
            <Link
                href='/amin/blog'
                className='mb-6 inline-block rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                ← Back to Blog
            </Link>
            <h1 className='mb-6 text-2xl font-bold'>Edit Blog Post</h1>
            <BlogForm initialData={post} onSuccess={() => router.push('/amin/blog')} />
        </section>
    );
}
