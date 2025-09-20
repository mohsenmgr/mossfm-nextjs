import React from 'react';

import { Metadata } from 'next';
import Head from 'next/head';

import AboutMe from '@/components/AboutMe';
import { getLastUpdate } from '@/lib/lastUpdate';
import About from '@/models/About';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_NAME;

    let lastUpdated = null;

    const res = await getLastUpdate(About);
    if (!res.error) {
        lastUpdated = new Date(res.updatedAt).toISOString();
    }

    return {
        title: 'About Me',
        description: 'Learn more about MossFM – Software Engineer, developer, and creator of modern digital solutions.',
        alternates: {
            canonical: `${baseUrl}/about`
        },
        openGraph: {
            type: 'article',
            url: `${baseUrl}/about`,
            authors: ['MossFM']
        },
        ...(lastUpdated && { other: { 'last-modified': lastUpdated } })
    };
}

export default function AboutPage() {
    return (
        <section className='mx-auto max-w-5xl bg-none px-6 py-8 text-gray-100'>
            <AboutMe />
        </section>
    );
}
