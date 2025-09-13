'use client';

import React, { useState } from 'react';

import Image from 'next/image';

interface Creator {
    _id: string;
    username: string;
    email: string;
    image: string;
}

export interface Post {
    _id: string;
    prompt: string;
    tag: string;
    creator: Creator;
}

interface PromptCardProps {
    post: Post;
    isOwner?: boolean;
    onDelete?: (postId: string) => void;
    onEdit?: (postId: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ post, isOwner, onDelete, onEdit }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(post.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className='relative flex flex-col space-y-3 rounded-2xl bg-white p-5 pb-16 shadow-md transition hover:shadow-lg dark:bg-gray-900'>
            <div className='flex items-start justify-between'>
                <div className='flex items-center gap-3'>
                    <Image
                        src={post.creator.image}
                        alt={post.creator.username}
                        width={40}
                        height={40}
                        className='rounded-full object-cover'
                    />
                    <div className='flex flex-col'>
                        <span className='font-semibold text-gray-900 dark:text-white'>{post.creator.username}</span>
                        <span className='text-sm text-gray-500 dark:text-gray-400'>{post.creator.email}</span>
                    </div>
                </div>

                <button
                    onClick={handleCopy}
                    className='rounded-full bg-gray-200 p-2 transition hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'>
                    {copied ? '✅' : '📋'}
                </button>
            </div>

            <p className='whitespace-pre-line text-gray-700 dark:text-gray-300'>{post.prompt}</p>

            {isOwner && (
                <div className='absolute right-4 bottom-4 flex gap-3'>
                    {onEdit && (
                        <button
                            onClick={() => onEdit(post._id)}
                            className='rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500'>
                            Edit
                        </button>
                    )}

                    {onDelete && (
                        <button
                            onClick={() => onDelete(post._id)}
                            className='rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-500'>
                            Delete
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

interface PromptCardListProps {
    posts: Post[];
    currentUserId?: string;
    onDelete?: (postId: string) => void;
    onEdit?: (postId: string) => void;
}

export const PromptCardList: React.FC<PromptCardListProps> = ({ posts, currentUserId, onDelete, onEdit }) => {
    return (
        <>
            {posts.map((post) => (
                <PromptCard key={post._id} post={post} isOwner={true} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </>
    );
};
