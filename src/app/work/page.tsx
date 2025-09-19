import React from 'react';

import { Metadata } from 'next';

import Jobs from '@/components/Jobs';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = 'https://www.mossfm.it';

    return {
        title: 'Previous work',
        description:
            'Previous work experiences MossFM – Software Engineer, developer, and creator of modern digital solutions.',
        alternates: {
            canonical: `${baseUrl}/work`
        },
        openGraph: {
            url: `${baseUrl}/work`
        }
    };
}

function page() {
    return <Jobs />;
}

export default page;
