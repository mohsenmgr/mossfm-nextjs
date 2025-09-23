'use client';

import React, { FormEvent, useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import JobForm from '@/components/admin/JobForm';
import { JobInput, JobItem } from '@/types/JobData';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function AdminJobEdit({ params }: Props) {
    const { id } = await params; // ✅ unwrap the promise

    const [files, setFiles] = useState<File[]>([]);

    const [job, setJob] = useState<JobItem>({
        _id: '',
        title: '',
        dateStart: '',
        dateFinish: '',
        jobDescription: '',
        responsibilities: { title: '', items: [] },
        skills: [],
        location: '',
        photos: []
    });

    useEffect(() => {
        if (!id) return;

        const fetchJob = async () => {
            try {
                const res = await fetch(`/api/job/${id}`);
                if (!res.ok) throw new Error('Failed to fetch job');

                const data = await res.json();
                setJob(data);
            } catch (err) {
                console.error(err);
                alert('Failed to fetch prompt data');
            }
        };

        fetchJob();
    }, [id]);

    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const editJob = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // --- 1) Upload each photo to Cloudinary ---
            const uploadedUrls: string[] = [];
            // for (const file of files) {
            //     const formData = new FormData();
            //     formData.append('file', file);
            //     formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
            //     formData.append('folder', 'job');

            //     const uploadRes = await fetch(
            //         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
            //         {
            //             method: 'POST',
            //             body: formData
            //         }
            //     );

            //     const data = await uploadRes.json();
            //     if (data.secure_url) {
            //         uploadedUrls.push(data.secure_url);
            //     }
            // }

            // --- 2) Replace job.photos with uploaded URLs ---
            const jobToSave = {
                ...job,
                photos: uploadedUrls
            };

            // --- 3) Save to your backend API ---
            const response = await fetch(`/api/job/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jobToSave)
            });

            if (response.ok) {
                router.push('/amin/jobs');
            } else {
                console.error('Failed to save job:', await response.text());
            }
        } catch (error) {
            console.error('Failed to edit job:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <JobForm<JobItem>
            type='Edit'
            job={job!}
            setJob={setJob}
            submitting={submitting}
            handleSubmit={editJob}
            files={files}
            setFiles={setFiles}
        />
    );
}
