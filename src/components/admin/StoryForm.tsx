'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

type MediaType = 'image' | 'video';

export default function AdminCreateStory() {
    const [file, setFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [mediaType, setMediaType] = useState<MediaType>('image');
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            // Detect type automatically
            setMediaType(selected.type.startsWith('video') ? 'video' : 'image');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', 'story');
            formData.append('mediaType', mediaType);

            const res = await fetch('/api/story/new', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error('Failed to upload story');

            alert('Story uploaded successfully!');
            //redirect to dashboard
            router.push('/amin/dashboard');
        } catch (err: any) {
            alert(err.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
            {/* Back button */}
            <Link
                href='/amin/dashboard'
                className='mb-6 inline-block rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                ← Back to dashboard
            </Link>

            {/* Page title */}
            <h1 className='mb-6 text-3xl font-bold text-white'>Create Story</h1>

            {/* Form container */}
            <div className='rounded-2xl bg-gray-900 p-6 shadow-lg dark:bg-gray-800'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                    {/* File input */}
                    <div>
                        <label className='block text-sm font-medium text-gray-200'>Upload Image/Video</label>
                        <input
                            type='file'
                            accept='image/*,video/*'
                            onChange={handleFileChange}
                            className='mt-2 block w-full text-sm text-gray-200 file:mr-4 file:rounded-lg file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100'
                        />
                    </div>

                    {/* Actions */}
                    <div className='flex justify-end gap-4'>
                        <Link
                            href='/admin/jobs'
                            className='rounded-lg bg-gray-700 px-4 py-2 text-sm text-white transition hover:bg-gray-600'>
                            Cancel
                        </Link>
                        <button
                            type='submit'
                            disabled={submitting}
                            className='rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-500 disabled:opacity-50'>
                            {submitting ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
