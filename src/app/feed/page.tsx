import { Metadata } from 'next';

import Feed from '@/components/Feed';
import { getLastUpdate } from '@/lib/lastUpdate';
import FeedModel from '@/models/Feed';
import type { IError, IFeed } from '@/models/Feed';

type FeedResponse = IFeed | IError;
// 👇 This re-runs page + metadata every 60s
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_NAME;
    let lastUpdated = new Date().toISOString();
    let imageUrl = `${baseUrl}/og-image.png`;
    let title = 'MossFM';

    const res: FeedResponse = await getLastUpdate(FeedModel);

    if (!('error' in res) && !res.hidden) {
        title = res.text;
        lastUpdated = new Date(res.updatedAt).toISOString();
        imageUrl = res.imageUrl ? `${res.imageUrl}?v=${new Date(res.updatedAt).getTime()}` : imageUrl;
    } else if ('error' in res) {
        console.log(res.error);
    }

    return {
        title: 'Feed Updates',
        description: `Feed Updates – ${title}`,
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
            ],
            locale: 'en',
            siteName: 'MossFM'
        },
        other: {
            'last-modified': lastUpdated
        }
    };
}

export default async function Page() {
    return (
        <div className='min-h-screen bg-gray-100 p-6 dark:bg-gray-950'>
            <Feed apiUrl='/api/feed?public=true' profileImage='/images/mohsen.png' authorName='MossFM profile pic' />
        </div>
    );
}
