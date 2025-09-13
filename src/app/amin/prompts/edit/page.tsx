'use client';

import { FormEvent, Suspense, useEffect, useState } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import PromptForm from '@/components/PromptForm';
import Skeleton from '@/components/Skeleton';

import { useSession } from 'next-auth/react';

interface Prompt {
    _id: string;
    prompt: string;
    tag: string;
    creator: {
        _id: string;
        username: string;
        email: string;
        image: string;
    };
}

export default function EditPromptPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const { data: session } = useSession();

    const [post, setPost] = useState({ prompt: '', tag: '' });
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch the prompt data
    useEffect(() => {
        if (!promptId) return;

        const fetchPrompt = async () => {
            try {
                const res = await fetch(`/api/prompt/${promptId}`);
                if (!res.ok) throw new Error('Failed to fetch prompt');

                const data: Prompt = await res.json();
                setPost({ prompt: data.prompt, tag: data.tag });
            } catch (err) {
                console.error(err);
                alert('Failed to fetch prompt data');
            } finally {
                setLoading(false);
            }
        };

        fetchPrompt();
    }, [promptId]);

    const updatePrompt = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

            if (!res.ok) throw new Error('Failed to update prompt');

            alert('Prompt updated successfully!');
            router.push('/amin/prompts'); // back to Manage Prompts
        } catch (err) {
            console.error(err);
            alert('Error updating prompt');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading)
        return (
            <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} />
                ))}
            </main>
        );

    return <PromptForm type='Edit' post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />;
}
