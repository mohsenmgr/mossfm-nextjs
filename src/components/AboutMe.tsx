'use client';

import React, { FC, useEffect, useState } from 'react';

import Image from 'next/image';

import { IAbout } from '@/models/About';

import Skeleton from './Skeleton';

interface SimpleChipProps {
    chipText: string;
}

const SimpleChip: FC<SimpleChipProps> = ({ chipText }) => {
    return <li className='rounded-md bg-[rgba(13,52,58,1)] px-4 py-2 text-sm font-medium text-white'>{chipText}</li>;
};

const AboutMe: FC = () => {
    const [aboutMe, setAboutMe] = useState<Partial<IAbout>>({
        text: [],
        skills: []
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetAboutMe = async () => {
            try {
                const res = await fetch('/api/about'); // your GET API route
                if (!res.ok) throw new Error('Failed to fetch jobs');
                const data: IAbout = await res.json();
                setAboutMe(data);
            } catch (err: any) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetAboutMe();
    }, []);

    return (
        <>
            <div className='flex flex-col items-center gap-6'>
                <div className='h-40 w-40 overflow-hidden rounded-full border-4 border-green-200'>
                    <Image
                        src='/images/mohsen.png'
                        alt='MossFM profile pic'
                        className='h-full w-full object-cover'
                        width={150}
                        height={150}
                    />
                </div>

                <h1 className='text-center text-4xl font-extrabold text-green-200'>About Me</h1>
            </div>

            <div className='mt-6 space-y-6'>
                {loading ? (
                    <Skeleton />
                ) : (
                    <p className='text-lg leading-relaxed text-gray-100'>
                        {aboutMe.text &&
                            aboutMe.text.map((word, idx) => (
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
        </>
    );
};

export default AboutMe;
