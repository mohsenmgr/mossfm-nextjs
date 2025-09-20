import { type ReactNode, Suspense } from 'react';

import type { Metadata } from 'next';
import { Exo } from 'next/font/google';
import Script from 'next/script';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import Footer from '@/components/Footer';
import GoogAnalytics from '@/components/GoogleAnalytics';
import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Google Font via next/font
const exo = Exo({
    subsets: ['latin'],
    display: 'swap'
});

export const metadata: Metadata = {
    title: {
        default:
            'Moss FM portfolio | Software Engineer | Full stack developer | AI Engineer | Latest updates | Discover collaboration opportunities',
        template: '%s | MossFM'
    },
    authors: { url: process.env.NEXT_PUBLIC_DOMAIN_NAME, name: 'mossfm' },
    description: 'Discover latest news, updates, and get in touch with MossFM.',
    keywords: ['software engineer', 'ai', 'portfolio', 'career', 'linkedin', 'indeed', 'italy', 'MossFM'],
    openGraph: {
        type: 'website',
        url: process.env.NEXT_PUBLIC_DOMAIN_NAME,
        title: 'MossFM – Software Engineer',
        description: 'Engineer, passionate developer, writer and traveller.',
        siteName: 'MossFM',
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/favicon.ico`,
                width: 16,
                height: 16,
                alt: 'MossFM logo'
            },
            {
                url: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'MossFM preview image'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        site: '@mossfm',
        creator: '@mossfm'
    },
    alternates: {
        canonical: process.env.NEXT_PUBLIC_DOMAIN_NAME
    },
    verification: {
        google: `${process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}`
    }
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html suppressHydrationWarning lang='en'>
            <head></head>
            <body className={exo.className}>
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>

                    <main className='app'>
                        <Nav />
                        <ThemeProvider attribute='class' defaultTheme='dark'>
                            <Suspense> {children}</Suspense>
                            <SpeedInsights />
                        </ThemeProvider>
                        <Footer />
                    </main>
                </Provider>
                <Analytics />
                <GoogAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICSID!} />
            </body>
            <Script
                id='ld-json-software-engineer'
                type='application/ld+json'
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Person',
                        name: 'MossFM',
                        url: process.env.NEXT_PUBLIC_DOMAIN_NAME,
                        jobTitle: 'Software Engineer'
                    })
                }}
            />
        </html>
    );
};

export default Layout;
