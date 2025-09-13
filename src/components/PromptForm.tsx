'use client';

import Link from 'next/link';

interface PostData {
    prompt: string;
    tag: string;
}

interface FormProps {
    type: 'Create' | 'Edit';
    post: PostData;
    setPost: React.Dispatch<React.SetStateAction<PostData>>;
    submitting: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form({ type, post, setPost, submitting, handleSubmit }: FormProps) {
    return (
        <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
            {/* Back button */}
            <Link
                href='/amin/prompts'
                className='mb-6 inline-block rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                ← Back to Prompts
            </Link>

            {/* Page title */}
            <h1 className='mb-6 text-3xl font-bold text-white'>{type} Prompt</h1>

            {/* Form container */}
            <div className='rounded-2xl bg-gray-900 p-6 shadow-lg dark:bg-gray-800'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                    {/* Prompt Textarea */}
                    <div>
                        <label className='mb-2 block text-sm font-medium text-gray-200'>Your AI Prompt</label>
                        <textarea
                            value={post.prompt}
                            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                            placeholder='Write your prompt here...'
                            required
                            rows={6}
                            className='w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                        />
                    </div>

                    {/* Tag Input */}
                    <div>
                        <label className='mb-2 block text-sm font-medium text-gray-200'>
                            Tag <span className='text-gray-400'>(#product, #webdevelopment, #idea)</span>
                        </label>
                        <input
                            value={post.tag}
                            onChange={(e) => setPost({ ...post, tag: e.target.value })}
                            type='text'
                            placeholder='#Tag'
                            required
                            className='w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                        />
                    </div>

                    {/* Actions */}
                    <div className='flex justify-end gap-4'>
                        <Link
                            href='/amin/prompts'
                            className='rounded-lg bg-gray-700 px-4 py-2 text-sm text-white transition hover:bg-gray-600'>
                            Cancel
                        </Link>
                        <button
                            type='submit'
                            disabled={submitting}
                            className='rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition hover:bg-green-500 disabled:opacity-50'>
                            {submitting ? `${type}...` : type}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
