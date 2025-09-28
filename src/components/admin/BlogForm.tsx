'use client';

import { useState } from 'react';

interface BlogFormProps {
    initialData?: {
        _id?: string;
        title: string;
        content: string;
        photos: string[];
    };
    onSuccess?: () => void;
}

export default function BlogForm({ initialData, onSuccess }: BlogFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [files, setFiles] = useState<File[]>([]);
    const [photos, setPhotos] = useState<string[]>(initialData?.photos || []);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const newFiles = Array.from(e.target.files);
        setFiles((prev) => [...prev, ...newFiles]);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // --- Upload new files to Cloudinary ---
            const uploadedUrls: string[] = [];
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
                formData.append('folder', 'blog');

                const uploadRes = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
                    { method: 'POST', body: formData }
                );

                const data = await uploadRes.json();
                if (data.secure_url) uploadedUrls.push(data.secure_url);
            }

            // Final photos list = old + new
            const finalPhotos = [...photos, ...uploadedUrls];

            // --- Decide create vs update ---
            const method = initialData?._id ? 'PATCH' : 'POST';
            const url = initialData?._id ? `/api/blog/${initialData._id}` : '/api/blog/new';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, photos: finalPhotos })
            });

            if (res.ok) {
                setMessage('✅ Blog post saved successfully!');
                setFiles([]);
                setPhotos(finalPhotos);
                if (!initialData) {
                    setTitle('');
                    setContent('');
                    setPhotos([]);
                }
                onSuccess?.();
            } else {
                const result = await res.json();
                setMessage(`❌ Error: ${result.error}`);
            }
        } catch (error) {
            setMessage('❌ Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-[80vh] rounded-2xl bg-gray-800 p-6 shadow-lg dark:bg-gray-800'>
            <div className='space-y-4'>
                {message && <p>{message}</p>}

                <input
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full rounded-lg border p-2'
                />

                <textarea
                    placeholder='Write your post in Markdown...'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={12}
                    className='w-full rounded-lg border p-2 font-mono'
                />

                <input type='file' multiple accept='image/*' onChange={handleFileChange} />

                {/* Existing + new previews */}
                <div className='flex flex-wrap gap-2'>
                    {[...photos, ...files.map((f) => URL.createObjectURL(f))].map((src, idx) => (
                        <img key={idx} src={src} alt='preview' className='h-24 w-24 rounded object-cover' />
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className='rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 disabled:opacity-50'>
                    {loading ? 'Saving...' : initialData ? 'Update Blog Post' : 'Publish Blog Post'}
                </button>
            </div>
        </div>
    );
}
