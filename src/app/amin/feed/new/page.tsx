'use client';

import { FormEvent, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

export default function CreateFeedPage() {
    const router = useRouter();
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [folderName, setFolderName] = useState('feed');
    const [hidden, setHidden] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            let imageUrl = '';

            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

                formData.append('folder', 'feed');

                const uploadRes = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
                    {
                        method: 'POST',
                        body: formData
                    }
                );

                if (!uploadRes.ok) throw new Error('Failed to upload image');

                const data = await uploadRes.json();
                imageUrl = data.secure_url;
            }

            const res = await fetch('/api/feed/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, imageUrl, hidden })
            });

            if (!res.ok) throw new Error('Failed to create feed post');

            router.push('/amin/feed');
        } catch (err) {
            console.error(err);
            alert('Error creating feed post');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
            <button
                onClick={() => router.push('/amin/feed')}
                className='mb-6 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                ← Back to Posts
            </button>

            <h1 className='mb-6 text-3xl font-bold text-white'>Create Feed Post</h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4 rounded-2xl bg-gray-900 p-6 shadow-lg'>
                <label className='flex flex-col text-white'>
                    Text
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        className='mt-2 resize-none rounded-lg bg-gray-800 p-3 text-white focus:ring-2 focus:ring-green-500 focus:outline-none'
                        rows={5}
                    />
                </label>

                {/* Upload button + filename display */}
                <div className='flex items-center gap-3'>
                    <button
                        type='button'
                        onClick={handleFileClick}
                        className='rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500'>
                        Upload Image
                    </button>
                    <span className='text-sm text-gray-300'>{file ? file.name : 'No file chosen'}</span>
                    <input
                        type='file'
                        accept='image/*'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className='hidden'
                    />
                </div>

                {/* <label className='flex flex-col text-white'>
                    Folder Name (optional)
                    <input
                        type='text'
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        placeholder='e.g. feed-posts'
                        className='mt-2 rounded-lg bg-gray-800 p-3 text-white focus:ring-2 focus:ring-green-500 focus:outline-none'
                    />
                </label> */}

                <label className='flex items-center gap-2 text-white'>
                    <input
                        type='checkbox'
                        checked={hidden}
                        onChange={(e) => setHidden(e.target.checked)}
                        className='h-4 w-4 accent-green-500'
                    />
                    Hidden
                </label>

                <button
                    type='submit'
                    disabled={submitting}
                    className='mt-4 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                    {submitting ? 'Creating...' : 'Create Post'}
                </button>
            </form>
        </main>
    );
}
