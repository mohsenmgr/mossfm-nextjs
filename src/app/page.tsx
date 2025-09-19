import { Metadata } from 'next';

import Main from '@/components/Main';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = 'https://www.mossfm.it';

    return {
        title: 'Home | MossFM',
        description:
            'Welcome to MossFM – Discover More about MossFM | AI Engineer | Software Engineer | Contact | previous jobs | About Me',
        alternates: {
            canonical: baseUrl
        }
    };
}

function Page() {
    return <Main />;
}

export default Page;
