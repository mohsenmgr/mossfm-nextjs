'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Skeleton from '@/components/Skeleton';
import AboutMeAdmin from '@/components/admin/AboutMeAdmin';
import { FileUpload } from '@/lib/fileUpload';
import type { AboutMeObj } from '@/types/aboutMe';

function page() {
    const router = useRouter();

    const [aboutMe, setAboutMe] = useState<AboutMeObj>({
        _id: '',
        text: [],
        skills: [],
        photoUrl: ''
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);

    const onSave = async (obj: AboutMeObj) => {
        if (obj._id === '') {
            alert('about._id not set');
            return;
        }

        if (profilePhotoFile) {
            const files = [profilePhotoFile];
            // --- Upload profile photo to Cloudinary ---
            const photoUrls = await FileUpload(files, 'image', 'about');
            if (photoUrls.length > 0) obj.photoUrl = photoUrls[0];
        }

        const res = await fetch(`/api/about/${obj._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        });
        if (res.ok) {
            const newAbout = await res.json();
            setAboutMe(newAbout);
            alert('Update Successful');
            router.push('/amin/dashboard');
        } else alert('update failed!');
    };

    useEffect(() => {
        const fetAboutMe = async () => {
            try {
                const res = await fetch('/api/about'); // your GET API route
                if (!res.ok) throw new Error('Failed to fetch jobs');
                const data = await res.json();
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
            <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
                <button
                    onClick={() => router.push('/amin/dashboard')}
                    className='mb-6 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                    ← Back to Dashboard
                </button>

                <h1 className='mb-6 text-3xl font-bold text-white'>Edit About Me</h1>
                {loading ? (
                    Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} />)
                ) : (
                    <AboutMeAdmin aboutMeObject={aboutMe} onSave={onSave} setProfilePhotoFile={setProfilePhotoFile} />
                )}
            </main>
        </>
    );
}

export default page;
