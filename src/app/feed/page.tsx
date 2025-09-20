import { Metadata } from 'next';

import Feed from '@/components/Feed';
import { getLastUpdate } from '@/lib/lastUpdate';
import FeedModel from '@/models/Feed';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_NAME;
    let lastUpdated = null;
    let imageUrl = null;

    const res = await getLastUpdate(FeedModel);
    if (!res.error) {
        lastUpdated = new Date(res.updatedAt).toISOString();
        imageUrl = res.imageUrl || `${baseUrl}/og-image.png`;
    }

    return {
        title: 'Feed Updates',
        description: 'Feed Updates MossFM – Software Engineer, developer, and creator of modern digital solutions.',
        alternates: {
            canonical: `${baseUrl}/feed`
        },
        openGraph: {
            url: `${baseUrl}/feed`,
            type: 'article',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: 'Feed preview image'
                }
            ]
        },
        ...(lastUpdated && { other: { 'last-modified': lastUpdated } })
    };
}

export default async function Page() {
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
