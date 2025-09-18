import React from 'react';

import { Metadata } from 'next';

import Main from '@/components/Main';

export const metadata: Metadata = {
    title: 'Home',
    description:
        'Welcome to MossFM – Discover More about MossFM | AI Engineer | Software Engineer | Contact | previous jobs | About Me'
};

function page() {
    return <Main />;
}

export default page;
