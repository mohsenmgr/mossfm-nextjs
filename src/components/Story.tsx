'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';

interface Story {
    _id: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    likes?: string[];
    comments?: { name: string; text: string }[];
}

interface Props {
    onClose: () => void;
}

export default function StoryModal({ onClose }: Props) {
    const [stories, setStories] = useState<Story[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showStory, setShowStory] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [showNameInput, setShowNameInput] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [likedByMe, setLikedByMe] = useState(false);

    const storyTimer = useRef<NodeJS.Timeout | null>(null);
    const story = stories[activeIndex];

    // Generate or retrieve a unique user ID
    const getUserId = () => {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = crypto.randomUUID();
            localStorage.setItem('userId', userId);
        }
        return userId;
    };

    useEffect(() => {
        const fetchStories = async () => {
            const res = await fetch('/api/story');
            const data = await res.json();
            setStories(data);
        };
        fetchStories();
    }, []);

    // Check if current user already liked this story
    useEffect(() => {
        if (!story) return;
        const userId = getUserId();
        setLikedByMe(story.likes?.includes(userId) || false);
    }, [story]);

    // Auto-advance images every 30 seconds
    useEffect(() => {
        if (!story || !showStory) return;
        if (story.mediaType === 'image') {
            if (storyTimer.current) clearTimeout(storyTimer.current);
            storyTimer.current = setTimeout(() => {
                if (activeIndex < stories.length - 1) setActiveIndex(activeIndex + 1);
                else onClose();
            }, 5 * 1000);
        }
        return () => {
            if (storyTimer.current) clearTimeout(storyTimer.current);
        };
    }, [activeIndex, showStory, story]);

    if (!stories.length) return null;

    const handleAnonymous = () => setShowStory(true);

    const handleNameSubmit = async () => {
        if (!nameInput.trim()) return;
        setShowStory(true);
        setShowNameInput(false);

        await fetch(`/api/story/${story._id}/view`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nameInput })
        });
    };

    const handleLike = async () => {
        const userId = getUserId();
        if (likedByMe) return;

        await fetch(`/api/story/${story._id}/like`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });

        const updatedStories = [...stories];
        updatedStories[activeIndex].likes = updatedStories[activeIndex].likes || [];
        updatedStories[activeIndex].likes.push(userId);
        setStories(updatedStories);
        setLikedByMe(true);
    };

    const handleCommentSubmit = async () => {
        if (!commentInput.trim()) return;
        const userName = nameInput.trim() || 'Anonymous';

        await fetch(`/api/story/${story._id}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: userName, text: commentInput })
        });

        const updatedStories = [...stories];
        updatedStories[activeIndex].comments = updatedStories[activeIndex].comments || [];
        updatedStories[activeIndex].comments.push({ name: userName, text: commentInput });
        setStories(updatedStories);
        setCommentInput('');
    };

    const handleCommentKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCommentSubmit();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 text-white'>
            <button className='absolute top-4 right-4 z-50 text-gray-400 hover:text-white' onClick={onClose}>
                <X size={30} />
            </button>

            {/* Inputs / Choice overlay */}
            {!showStory && (
                <div className='absolute inset-0 z-50 flex items-center justify-center'>
                    <div className='mx-auto w-full max-w-md space-y-4 rounded-lg border border-gray-700 bg-[rgba(13,52,58,1)] p-6 shadow-lg'>
                        {!showNameInput ? (
                            <>
                                <button
                                    onClick={handleAnonymous}
                                    className='w-full rounded-lg bg-gray-700 px-4 py-3 text-white hover:bg-gray-600'>
                                    View anonymously
                                </button>
                                <button
                                    onClick={() => setShowNameInput(true)}
                                    className='w-full rounded-lg bg-gray-700 px-4 py-3 text-white hover:bg-gray-600'>
                                    Insert Name
                                </button>
                            </>
                        ) : (
                            <div className='space-y-4'>
                                <input
                                    type='text'
                                    placeholder='Enter your name'
                                    className='block w-full rounded-lg border border-gray-300 bg-[#1F4B52] p-3 text-white placeholder-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                />
                                <button
                                    onClick={handleNameSubmit}
                                    className='w-full rounded-lg bg-green-600 px-4 py-3 text-white hover:bg-green-500'>
                                    OK
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Story Media */}
            <div
                className={`relative flex h-[500px] w-full max-w-md items-center justify-center overflow-hidden rounded-2xl ${
                    !showStory ? 'blur-xl' : ''
                }`}>
                {story.mediaType === 'image' ? (
                    <Image src={story.mediaUrl} alt='Story' fill className='object-contain' />
                ) : (
                    <video src={story.mediaUrl} className='h-full w-full object-contain' controls autoPlay />
                )}

                {/* Instagram-style footer */}
                {showStory && (
                    <div className='absolute right-4 bottom-4 left-4 flex items-center gap-3'>
                        <button
                            onClick={handleLike}
                            className={`flex items-center justify-center rounded-full p-2 hover:bg-black/70 ${
                                likedByMe ? 'bg-red-500' : 'bg-black/50'
                            }`}>
                            <Heart className='h-5 w-5 text-white' />
                        </button>

                        <div className='relative flex-1'>
                            <input
                                type='text'
                                placeholder='Add a comment...'
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                onKeyDown={handleCommentKeyPress}
                                className='w-full rounded-full bg-black/50 px-4 py-2 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none'
                            />
                            <button
                                onClick={handleCommentSubmit}
                                className='absolute top-1/2 right-1 -translate-y-1/2 rounded-full bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-500'>
                                OK
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
