'use client';

import { FormEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import JobForm from '@/components/admin/JobForm';
import { JobItem } from '@/types/JobData';

export default function JobEditClient({ job }: { job: JobItem }) {
    const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);
    const [formJob, setFormJob] = useState<JobItem>(job);
    const [submitting, setSubmitting] = useState(false);

    const editJob = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // --- 1) Upload photos (if needed) ---
            const uploadedUrls: string[] = [];

            // --- 2) Prepare job object ---
            const jobToSave = {
                ...formJob,
                photos: uploadedUrls
            };

            // --- 3) Save job ---
            const response = await fetch(`/api/job/${formJob._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
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
            job={formJob}
            setJob={setFormJob}
            submitting={submitting}
            handleSubmit={editJob}
            files={files}
            setFiles={setFiles}
        />
    );
}
