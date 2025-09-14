'use client';

import React, { useState } from 'react';

import ReCAPTCHA from 'react-google-recaptcha';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!captchaToken) {
            setStatus('Please verify that you are not a robot.');
            return;
        }

        setLoading(true);
        setStatus('');

        try {
            // Placeholder POST request
            const res = await fetch('/api/message/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, captchaToken })
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus(`Error: ${data.error || 'Something went wrong.'}`);
            }
        } catch (err) {
            setStatus('Failed to send message.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8'>
            <div className='w-full rounded-lg border border-gray-700 bg-[rgba(13,52,58,1)] p-4 shadow-lg md:p-8'>
                <h2 className='mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white'>Contact Me</h2>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label
                            htmlFor='name'
                            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
                            Your Name
                        </label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder='John Doe'
                            value={formData.name}
                            onChange={handleChange}
                            className='block w-full rounded-lg border border-gray-300 bg-[#1F4B52] p-3 text-white placeholder-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='email'
                            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
                            Your Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='john@example.com'
                            value={formData.email}
                            onChange={handleChange}
                            className='block w-full rounded-lg border border-gray-300 bg-[#1F4B52] p-3 text-white placeholder-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='subject'
                            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
                            Subject
                        </label>
                        <input
                            type='text'
                            id='subject'
                            name='subject'
                            placeholder="Let's work together"
                            value={formData.subject}
                            onChange={handleChange}
                            className='block w-full rounded-lg border border-gray-300 bg-[#1F4B52] p-3 text-white placeholder-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'
                        />
                    </div>

                    <div>
                        <label
                            htmlFor='message'
                            className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
                            Message
                        </label>
                        <textarea
                            id='message'
                            name='message'
                            rows={5}
                            placeholder='Your message...'
                            value={formData.message}
                            onChange={handleChange}
                            className='block w-full rounded-lg border border-gray-300 bg-[#1F4B52] p-3 text-white placeholder-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none'></textarea>
                    </div>

                    <div className='w-full'>
                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                            onChange={(token) => setCaptchaToken(token)}
                            className='w-full'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='flex w-full items-center justify-center rounded-lg bg-green-200 px-6 py-3 font-medium text-gray-900 shadow-md transition duration-200 hover:bg-green-500 focus:ring-2 focus:ring-blue-500 focus:outline-none'>
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>

                    {status && <p className='mt-2 text-white'>{status}</p>}
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
