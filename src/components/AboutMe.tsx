'use client';

import React, { FC, useEffect, useState } from 'react';

import Image from 'next/image';

import { IAbout } from '@/models/About';

import Skeleton from './Skeleton';
import StoryModal from './Story';

interface SimpleChipProps {
    chipText: string;
}

const SimpleChip: FC<SimpleChipProps> = ({ chipText }) => (
    <li className='rounded-md bg-[rgba(13,52,58,1)] px-4 py-2 text-sm font-medium text-white'>{chipText}</li>
);

const AboutMe: FC = () => {
    const [aboutMe, setAboutMe] = useState<Partial<IAbout>>({
        text: [],
        skills: [],
        photoUrl: ''
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [showStory, setShowStory] = useState(false);
    const [hasStories, setHasStories] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [aboutRes, storyRes] = await Promise.all([fetch('/api/about'), fetch('/api/story')]);

                if (!aboutRes.ok || !storyRes.ok) throw new Error('Failed to fetch data');

                const aboutData: IAbout = await aboutRes.json();
                const storiesData = await storyRes.json();

                setAboutMe(aboutData);
                setHasStories(storiesData.length > 0);
            } catch (err: any) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {!showStory && (
                <div>
                    <div className='flex flex-col items-center gap-6'>
                        {/* Instagram-style gradient ring */}
                        <div
                            className={`relative h-40 w-40 cursor-pointer rounded-full p-[3px] transition-all duration-300 ${
                                hasStories
                                    ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 hover:scale-105'
                                    : 'bg-gray-700'
                            }`}
                            onClick={() => hasStories && setShowStory(true)}>
                            <div className='h-full w-full rounded-full bg-black p-[3px]'>
                                <div className='relative h-full w-full overflow-hidden rounded-full'>
                                    <Image
                                        src={aboutMe.photoUrl || '/images/mohsen.png'}
                                        alt='MossFM profile pic'
                                        className='h-full w-full rounded-full object-cover'
                                        width={150}
                                        height={150}
                                    />
                                </div>
                            </div>
                        </div>

                        <h2 className='text-center text-4xl font-extrabold text-green-200'>About Me</h2>
                    </div>

                    <div className='mt-6 space-y-6'>
                        {loading ? (
                            <Skeleton />
                        ) : (
                            <p className='text-lg leading-relaxed text-gray-100'>
                                {aboutMe.text?.map((word, idx) => (
                                    <span key={idx} className={word.highlight ? 'font-semibold' : ''}>
                                        {word.value}{' '}
                                    </span>
                                ))}
                            </p>
                        )}

                        {loading ? (
                            <Skeleton />
                        ) : (
                            aboutMe.skills && (
                                <div>
                                    <h3 className='mb-3 text-xl font-semibold text-green-200'>Key Skills</h3>
                                    <ul className='flex flex-wrap gap-3'>
                                        {aboutMe.skills.map((skill, idx) => (
                                            <SimpleChip key={idx} chipText={skill} />
                                        ))}
                                    </ul>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}

            {showStory && <StoryModal onClose={() => setShowStory(false)} />}
        </>
    );
};

export default AboutMe;
