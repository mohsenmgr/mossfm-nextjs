import { type ReactNode, Suspense } from 'react';

import type { Metadata } from 'next';
import { Exo } from 'next/font/google';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import Footer from '@/components/Footer';
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
    description: 'Discover latest news, updates, and get in touch with MossFM.',
    keywords: ['software engineer', 'ai', 'portfolio', 'career', 'linkedin', 'indeed', 'italy', 'MossFM'],
    openGraph: {
        type: 'website',
        url: 'https://www.mossfm.it',
        title: 'MossFM – Software Engineer',
        description: 'Engineer, passionate developer, writer and traveller.',
        siteName: 'MossFM',
        images: [
            {
                url: 'https://www.mossfm.it/favicon.ico',
                width: 16,
                height: 16,
                alt: 'MossFM logo'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        site: '@mossfm',
        creator: '@mossfm'
    },
    alternates: {
        canonical: 'https://www.mossfm.it'
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
            </body>
        </html>
    );
};

export default Layout;
