'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

type QuoteData = {
    _id: string;
    quotes: string[];
    special: string;
    showSpecial: boolean;
};

export default function QuotesAdminPage() {
    const [quote, setQuote] = useState<QuoteData | null>(null);
    const [loading, setLoading] = useState(true);
    const [newQuote, setNewQuote] = useState('');

    // Fetch existing quote
    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const res = await fetch('/api/quote', { cache: 'no-store' });
                const data = await res.json();
                setQuote(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuote();
    }, []);

    const handleChangeQuote = (index: number, value: string) => {
        if (!quote) return;
        const newQuotes = [...quote.quotes];
        newQuotes[index] = value;
        setQuote({ ...quote, quotes: newQuotes });
    };

    const handleDeleteQuote = (index: number) => {
        if (!quote) return;
        const newQuotes = [...quote.quotes];
        newQuotes.splice(index, 1);
        setQuote({ ...quote, quotes: newQuotes });
    };

    const handleAddQuote = () => {
        if (!quote || !newQuote.trim()) return;
        setQuote({ ...quote, quotes: [...quote.quotes, newQuote.trim()] });
        setNewQuote('');
    };

    const handleSave = async () => {
        if (!quote) return;
        try {
            const res = await fetch('/api/quote', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    quotes: quote.quotes,
                    special: quote.special,
                    showSpecial: quote.showSpecial
                })
            });
            if (!res.ok) throw new Error('Failed to save');
            alert('Quotes updated successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to save quotes');
        }
    };

    if (loading) {
        return <div className='flex h-screen items-center justify-center text-gray-200'>Loading...</div>;
    }

    if (!quote) {
        return <div className='flex h-screen items-center justify-center text-gray-200'>No quote object found.</div>;
    }

    return (
        <main className='mx-auto min-h-screen max-w-7xl p-6'>
            {/* Back button */}
            <div className='mb-6'>
                <Link
                    href='/amin'
                    className='rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500'>
                    ← Back to Dashboard
                </Link>
            </div>

            {/* Page title */}
            <h1 className='mb-6 text-3xl font-bold text-white'>Manage Quotes</h1>
            <div className='rounded-2xl bg-gray-800 p-6 shadow-lg dark:bg-gray-800'>
                {/* Special text */}
                <div className='mb-6'>
                    <label className='block text-sm font-semibold text-gray-200'>Special Text</label>
                    <input
                        type='text'
                        value={quote.special}
                        onChange={(e) => setQuote({ ...quote, special: e.target.value })}
                        className='mt-2 w-full rounded bg-gray-700 p-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    />
                </div>

                {/* Toggle Switch */}
                <div className='mb-6 flex items-center gap-3'>
                    <span className='text-sm font-semibold text-gray-200'>Show Special?</span>
                    <button
                        onClick={() => setQuote({ ...quote, showSpecial: !quote.showSpecial })}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${
                            quote.showSpecial ? 'bg-green-500' : 'bg-gray-600'
                        }`}>
                        <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                                quote.showSpecial ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>

                {/* Quotes array */}
                <div className='mb-6'>
                    <h2 className='mb-2 text-xl font-semibold text-white'>Quotes</h2>
                    {quote.quotes.map((q, i) => (
                        <div key={i} className='mb-3 flex items-center gap-2'>
                            <input
                                type='text'
                                value={q}
                                onChange={(e) => handleChangeQuote(i, e.target.value)}
                                className='flex-1 rounded bg-gray-700 p-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none'
                            />
                            <button
                                onClick={() => handleDeleteQuote(i)}
                                className='rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700'>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add new quote */}
                <div className='mb-6 flex items-center gap-2'>
                    <input
                        type='text'
                        value={newQuote}
                        onChange={(e) => setNewQuote(e.target.value)}
                        placeholder='New quote...'
                        className='flex-1 rounded bg-gray-700 p-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none'
                    />
                    <button
                        onClick={handleAddQuote}
                        className='rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700'>
                        Add
                    </button>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className='rounded bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700'>
                    Save Changes
                </button>
            </div>
        </main>
    );
}
