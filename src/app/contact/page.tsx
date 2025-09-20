import React from 'react';

import { Metadata } from 'next';

import ContactForm from '@/components/ContactForm';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_NAME;

    return {
        title: 'Contact Me',
        description: 'Contact Form MossFM – Software Engineer, developer, and creator of modern digital solutions.',
        alternates: {
            canonical: `${baseUrl}/contact`
        },
        openGraph: {
            url: `${baseUrl}/contact`
        }
    };
}

function ContactPage() {
    return <ContactForm />;
}

export default ContactPage;
