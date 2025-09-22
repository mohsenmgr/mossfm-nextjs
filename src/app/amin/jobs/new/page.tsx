'use client';

import React, { FormEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import JobForm from '@/components/admin/JobForm';
import { JobInput, JobItem } from '@/types/JobData';

export default function AdminJobInsert() {
    const [files, setFiles] = useState<File[]>([]);

    const [job, setJob] = useState<JobInput>({
        title: '',
        dateStart: '',
        dateFinish: '',
        jobDescription: '',
        responsibilities: { title: '', items: [] },
        skills: [],
        location: '',
        photos: []
    });

    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const createJob = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // --- 1) Upload each photo to Cloudinary ---
            const uploadedUrls: string[] = [];
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
                formData.append('folder', 'job');

                const uploadRes = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
                    {
                        method: 'POST',
                        body: formData
                    }
                );

                const data = await uploadRes.json();
                if (data.secure_url) {
                    uploadedUrls.push(data.secure_url);
                }
            }

            // --- 2) Replace job.photos with uploaded URLs ---
            const jobToSave = {
                ...job,
                photos: uploadedUrls
            };

            // --- 3) Save to your backend API ---
            const response = await fetch('/api/job/new', {
                method: 'POST',
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
            console.error('Failed to create job:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <JobForm
            type='Create'
            job={job}
            setJob={setJob}
            submitting={submitting}
            handleSubmit={createJob}
            files={files}
            setFiles={setFiles}
        />
    );
}
