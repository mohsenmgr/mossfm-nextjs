'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

interface Message {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string; // ISO string
}

export default function MessagesPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    // Redirect if not authenticated
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/amin'); // back to login
        }
    }, [status, router]);

    // Fetch messages
    useEffect(() => {
        if (!session) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch('/api/message');
                if (!res.ok) throw new Error('Failed to fetch messages');

                const data: Message[] = await res.json();
                setMessages(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [session]);

    // Delete/Archive handler
    const handleDelete = async (msg: Message) => {
        if (!confirm('Are you sure you want to move this message to archive?')) return;

        try {
            let res = await fetch(`/api/message/${msg._id}`, {
                method: 'DELETE'
            });

            if (!res.ok) throw new Error('Failed to delete message');

            res = await fetch('/api/message/archive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(msg)
            });

            if (!res.ok) throw new Error('Failed to archive message');

            // Remove from state after archiving
            setMessages((prev) => prev.filter((m) => m._id !== msg._id));
        } catch (err) {
            console.error(err);
            alert('Error archiving message');
        }
    };

    if (status === 'loading' || loading) {
        return (
            <main className='mx-auto flex min-h-screen max-w-6xl items-center justify-center p-6'>
                <p className='text-lg text-gray-400'>Loading messages...</p>
            </main>
        );
        //  return (
        //     <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
        //         {Array.from({ length: 3 }).map((_, i) => (
        //             <Skeleton key={i} />
        //         ))}
        //     </main>
        // );
    }

    return (
        <main className='mx-auto min-h-screen max-w-6xl flex-1 p-6'>
            <button
                onClick={() => router.push('/amin/dashboard')}
                className='mb-6 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                ← Back to Dashboard
            </button>

            <h1 className='mb-6 text-3xl font-bold text-white'>Inbox</h1>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {messages.length === 0 ? (
                    <p className='text-gray-400'>No messages yet.</p>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg._id}
                            className='flex flex-col justify-between rounded-2xl bg-gray-900 p-5 shadow-lg transition hover:shadow-xl dark:bg-gray-800'>
                            <div>
                                <h2 className='text-xl font-semibold text-white'>{msg.subject}</h2>
                                <p className='mt-1 text-sm text-gray-400'>
                                    {msg.name} ({msg.email})
                                </p>
                                <p className='mt-3 text-gray-300'>{msg.message}</p>
                            </div>
                            <div className='mt-4 flex items-center justify-between'>
                                <p className='text-xs text-gray-500'>{new Date(msg.createdAt).toLocaleString()}</p>
                                <button
                                    onClick={() => handleDelete(msg)}
                                    className='rounded-md bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-500'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}
