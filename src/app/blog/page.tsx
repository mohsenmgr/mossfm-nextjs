import { Metadata } from 'next';
import Link from 'next/link';

import BlogGrid from '@/components/BlogClient';
import { getLastUpdate } from '@/lib/lastUpdate';
import BlogPostModel from '@/models/BlogPost';
import { IBlogPost } from '@/models/BlogPost';
import { IError } from '@/models/Feed';

type BlogResponse = IBlogPost | IError;

export const revalidate = 3600;

async function getPosts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/blog`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
}

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_NAME!;
    let lastUpdated = new Date().toISOString();
    let imageUrl = `${baseUrl}/og-image.png`;
    let latestTitle = 'MossFM';

    const res: BlogResponse = await getLastUpdate(BlogPostModel);

    if (!('error' in res)) {
        latestTitle = res.title;
        lastUpdated = new Date(res.date).toISOString();
        imageUrl = res.photos?.length > 0 ? res.photos[0] : `${baseUrl}/og-image.png`;
    } else {
        console.error(res.error);
    }

    return {
        metadataBase: new URL(baseUrl),
        title: `Blog – Latest: ${latestTitle}`,
        description: `Catch up on the latest updates from MossFM. Most recent: ${latestTitle}`,
        alternates: {
            canonical: '/blog'
        },
        openGraph: {
            url: '/blog',
            type: 'website',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: 'Blog preview image'
                }
            ],
            locale: 'en_US',
            siteName: 'MossFM',
            title: `Blog – Latest: ${latestTitle}`,
            description: `Catch up on the latest updates from MossFM. Most recent: ${latestTitle}`
        },
        twitter: {
            card: 'summary_large_image',
            title: `Blog – Latest: ${latestTitle}`,
            description: `Catch up on the latest updates from MossFM. Most recent: ${latestTitle}`,
            images: [imageUrl]
        },
        other: {
            'last-modified': lastUpdated
        }
    };
}

export default async function BlogListingPage() {
    const posts: IBlogPost[] = await getPosts();
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_NAME!;

    // Build JSON-LD structured data
    const blogStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        url: `${baseUrl}/blog`,
        name: 'MossFM Blog',
        description: 'Latest posts and updates from MossFM',
        blogPost: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            datePublished: post.date,
            author: {
                '@type': 'Person',
                name: post.author
            },
            image: post.photos?.[0] || `${baseUrl}/og-image.png`,
            url: `${baseUrl}/blog/${post._id}`
        }))
    };

    return (
        <section className='mx-auto max-w-6xl p-6'>
            <h1 className='mb-8 text-3xl font-bold'>Blog</h1>

            {/* Inject JSON-LD structured data */}
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
            />

            <BlogGrid posts={posts} />
        </section>
    );
}
