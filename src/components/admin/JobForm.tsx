'use client';

import { useState } from 'react';

import Link from 'next/link';

import type { JobInput, JobItem } from '@/types/JobData';

type BaseFormProps<T extends JobInput | JobItem> = {
    type: T extends JobInput ? 'Create' : 'Edit';
    job: T;
    setJob: React.Dispatch<React.SetStateAction<T>>;
    submitting: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function JobForm<T extends JobInput | JobItem>({
    type,
    job,
    setJob,
    submitting,
    handleSubmit,
    files,
    setFiles
}: BaseFormProps<T>) {
    const [newResponsibility, setNewResponsibility] = useState('');
    const [newSkill, setNewSkill] = useState('');

    /* ---------------- Responsibilities ---------------- */
    const addResponsibility = () => {
        if (!newResponsibility.trim()) return;
        setJob((prev) => ({
            ...prev,
            responsibilities: {
                ...prev.responsibilities,
                items: [...prev.responsibilities.items, newResponsibility.trim()]
            }
        }));
        setNewResponsibility('');
    };

    const removeResponsibility = (index: number) => {
        setJob((prev) => ({
            ...prev,
            responsibilities: {
                ...prev.responsibilities,
                items: prev.responsibilities.items.filter((_, i) => i !== index)
            }
        }));
    };

    const handleResponsibilityChange = (index: number, value: string) => {
        const newItems = [...job.responsibilities.items];
        newItems[index] = value;
        setJob((prev) => ({
            ...prev,
            responsibilities: { ...prev.responsibilities, items: newItems }
        }));
    };

    const handleResponsibilityTitleChange = (value: string) => {
        setJob((prev) => ({
            ...prev,
            responsibilities: { ...prev.responsibilities, title: value }
        }));
    };

    /* ---------------- Skills ---------------- */
    const addSkill = () => {
        if (!newSkill.trim()) return;
        setJob((prev) => ({
            ...prev,
            skills: [...prev.skills, newSkill.trim()]
        }));
        setNewSkill('');
    };

    const removeSkill = (index: number) => {
        setJob((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const handleSkillChange = (index: number, value: string) => {
        const newSkills = [...job.skills];
        newSkills[index] = value;
        setJob((prev) => ({ ...prev, skills: newSkills }));
    };

    /* ---------------- Photos ---------------- */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const newFiles = Array.from(e.target.files);
        setFiles((prev) => [...prev, ...newFiles]);
    };

    return (
        <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
            {/* Back button */}
            <Link
                href='/amin/jobs'
                className='mb-6 inline-block rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                ← Back to Jobs
            </Link>

            {/* Page title */}
            <h1 className='mb-6 text-3xl font-bold text-white'>{type} Job</h1>

            {/* Form container */}
            <div className='rounded-2xl bg-gray-900 p-6 shadow-lg dark:bg-gray-800'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                    {/* Job title */}
                    <div>
                        <label className='mb-2 block text-sm font-medium text-gray-200'>Job title</label>
                        <input
                            type='text'
                            required
                            value={job.title}
                            onChange={(e) => setJob({ ...job, title: e.target.value })}
                            placeholder='Job title'
                            className='w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                        />
                    </div>

                    {/* Job dates */}
                    <div className='flex flex-col gap-4 sm:flex-row'>
                        <div className='flex w-64 flex-col space-y-2'>
                            <label className='text-sm font-medium text-gray-200'>Start Date</label>
                            <input
                                type='date'
                                value={job.dateStart}
                                onChange={(e) => setJob({ ...job, dateStart: e.target.value })}
                                className='rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-200 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                            />
                        </div>
                        <div className='flex w-64 flex-col space-y-2'>
                            <label className='text-sm font-medium text-gray-200'>Finish Date</label>
                            <input
                                type='date'
                                value={job.dateFinish}
                                onChange={(e) => setJob({ ...job, dateFinish: e.target.value })}
                                className='rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-200 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                            />
                        </div>
                    </div>

                    {/* Job description */}
                    <div>
                        <label className='mb-2 block text-sm font-medium text-gray-200'>Job description</label>
                        <textarea
                            required
                            rows={6}
                            value={job.jobDescription}
                            onChange={(e) => setJob({ ...job, jobDescription: e.target.value })}
                            placeholder='Write your job description here...'
                            className='w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                        />
                    </div>

                    {/* Responsibilities */}
                    <div>
                        <h3 className='mb-2 text-lg font-semibold text-white'>Responsibilities</h3>

                        <label className='mb-2 block text-sm font-medium text-gray-200'>Responsibility title</label>
                        <input
                            type='text'
                            required
                            value={job.responsibilities.title}
                            onChange={(e) => handleResponsibilityTitleChange(e.target.value)}
                            placeholder='Responsibility title'
                            className='mb-4 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                        />

                        <div className='space-y-2'>
                            {job.responsibilities.items.map((item, i) => (
                                <div key={i} className='flex items-center gap-2'>
                                    <input
                                        type='text'
                                        value={item}
                                        onChange={(e) => handleResponsibilityChange(i, e.target.value)}
                                        className='w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                                    />
                                    <button
                                        type='button'
                                        onClick={() => removeResponsibility(i)}
                                        className='rounded bg-red-600 px-2 py-1 text-white hover:bg-red-500'>
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className='mt-4 flex gap-2'>
                            <input
                                type='text'
                                value={newResponsibility}
                                onChange={(e) => setNewResponsibility(e.target.value)}
                                placeholder='New Responsibility'
                                className='w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                            />
                            <button
                                type='button'
                                onClick={addResponsibility}
                                className='rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500'>
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Skills */}
                    <div>
                        <h3 className='mb-2 text-lg font-semibold text-white'>Skills</h3>
                        <div className='space-y-2'>
                            {job.skills.map((skill, i) => (
                                <div key={i} className='flex items-center gap-2'>
                                    <input
                                        type='text'
                                        value={skill}
                                        onChange={(e) => handleSkillChange(i, e.target.value)}
                                        className='flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                                    />
                                    <button
                                        type='button'
                                        onClick={() => removeSkill(i)}
                                        className='rounded bg-red-600 px-2 py-1 text-white hover:bg-red-500'>
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className='mt-4 flex gap-2'>
                            <input
                                type='text'
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder='New Skill'
                                className='w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                            />
                            <button
                                type='button'
                                onClick={addSkill}
                                className='rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500'>
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className='mb-2 block text-sm font-medium text-gray-200'>Location</label>
                        <input
                            type='text'
                            required
                            value={job.location}
                            onChange={(e) => setJob({ ...job, location: e.target.value })}
                            placeholder='Location'
                            className='w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                        />
                    </div>

                    {/* Photos */}
                    <div>
                        <label className='block text-sm font-medium text-gray-200'>Upload Photos</label>
                        <input
                            type='file'
                            accept='image/*'
                            multiple
                            onChange={handleFileChange}
                            className='mt-2 block w-full text-sm text-gray-200 file:mr-4 file:rounded-lg file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100'
                        />
                    </div>

                    {files.length > 0 && (
                        <div className='grid grid-cols-3 gap-4'>
                            {files.map((file, i) => (
                                <div key={i} className='group relative'>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`preview-${i}`}
                                        className='h-24 w-full rounded-lg object-cover shadow-sm'
                                    />
                                    <span className='absolute bottom-1 left-1 rounded bg-black/50 px-1 text-xs text-white'>
                                        {file.name.slice(0, 10)}…
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className='flex justify-end gap-4'>
                        <Link
                            href='/admin/jobs'
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
