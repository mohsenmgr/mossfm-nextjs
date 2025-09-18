import React from 'react';

import { Metadata } from 'next';

import Main from '@/components/Main';

export async function generateMetadata({ params }: { params: { slug?: string[] } }): Promise<Metadata> {
    const baseUrl = 'https://mossfm.it';

    // Build path dynamically from params
    const path = params.slug ? `/${params.slug.join('/')}` : '';

    return {
        title: 'Home',
        description:
            'Welcome to MossFM – Discover More about MossFM | AI Engineer | Software Engineer | Contact | previous jobs | About Me',
        alternates: {
            canonical: `${baseUrl}${path}`
        }
    };
}

export const metadata: Metadata = {};

function page() {
    return <Main />;
}

export default page;
