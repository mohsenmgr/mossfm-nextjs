import { type ReactNode, Suspense } from 'react';

import type { Metadata } from 'next';
import { Exo } from 'next/font/google';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
import { Analytics } from '@vercel/analytics/next';

// Google Font via next/font
const exo = Exo({
    subsets: ['latin'],
    display: 'swap'
});

export const metadata: Metadata = {
    title: 'Moss FM',
    description: 'Moss FM portfolio | Software Engineer'
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
