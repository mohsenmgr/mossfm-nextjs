import React from 'react';

import { Metadata } from 'next';

import AboutMe from '@/components/AboutMe';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = 'https://www.mossfm.it';

    return {
        title: 'About Me',
        description: 'Learn more about MossFM – Software Engineer, developer, and creator of modern digital solutions.',
        alternates: {
            canonical: `${baseUrl}/about`
        },
        openGraph: {
            url: `${baseUrl}/about`
        }
    };
}

function AboutPage() {
    return (
        <section className='mx-auto max-w-5xl bg-none px-6 py-8 text-gray-100'>
            <AboutMe />
        </section>
    );
}

export default AboutPage;
