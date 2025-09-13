'use client';

import { FormEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import PromptForm from '@/components/PromptForm';

import { useSession } from 'next-auth/react';

interface PostData {
    prompt: string;
    tag: string;
}

export default function CreatePrompt() {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState<PostData>({
        prompt: '',
        tag: ''
    });

    const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user?.id,
                    tag: post.tag
                })
            });

            if (response.ok) {
                router.push('/amin/prompts');
            }
        } catch (error) {
            console.error('Failed to create prompt:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <PromptForm type='Create' post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />
    );
}
