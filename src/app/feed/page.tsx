import { Metadata } from 'next';

import Feed from '@/components/Feed';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = 'https://mossfm.it';

    return {
        title: 'Feed Updates',
        description: 'Feed Updates MossFM – Software Engineer, developer, and creator of modern digital solutions.',
        alternates: {
            canonical: `${baseUrl}/feed`
        },
        openGraph: {
            url: `${baseUrl}/feed`
        }
    };
}

export default function Page() {
    return (
        <div className='min-h-screen bg-gray-100 p-6 dark:bg-gray-950'>
            <Feed
                apiUrl='/api/feed?public=true' // feed endpoint with public=true to hide hidden posts
                profileImage='/images/mohsen.png'
                authorName='MossFM profile pic'
            />
        </div>
    );
}
