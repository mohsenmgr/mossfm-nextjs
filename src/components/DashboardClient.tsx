'use client';

import Link from 'next/link';

import { signOut } from 'next-auth/react';
import {
    FaBlogger,
    FaBook,
    FaBriefcase,
    FaEnvelope,
    FaFileUpload,
    FaFilm,
    FaInstagram,
    FaMusic,
    FaQuoteLeft,
    FaRss,
    FaSignOutAlt,
    FaTwitter,
    FaUser
} from 'react-icons/fa';
import { FaNoteSticky } from 'react-icons/fa6';

export default function DashboardClient({ session }: { session: any }) {
    const cards = [
        { title: 'About Me', icon: <FaUser />, href: '/amin/about', query: '' },
        { title: 'Jobs', icon: <FaBriefcase />, href: '/amin/jobs', query: '' },
        { title: 'Quotes', icon: <FaQuoteLeft />, href: '/amin/quotes', query: '' },
        { title: 'Feed', icon: <FaRss />, href: '/amin/feed', query: { admin: true } },
        { title: 'Upload CV', icon: <FaFileUpload />, href: '/amin/cv', query: '' },
        { title: 'Messages', icon: <FaEnvelope />, href: '/amin/messages', query: '' },
        { title: 'Prompts', icon: <FaNoteSticky />, href: '/amin/prompts', query: '' },
        { title: 'Blog', icon: <FaBlogger />, href: '/amin/blog', query: '' },
        { title: 'Social', icon: <FaInstagram />, href: '/amin/social', query: '' },
        { title: 'Books', icon: <FaBook />, href: '/amin/books', query: '' },
        { title: 'Music', icon: <FaMusic />, href: '/amin/music', query: '' },
        { title: 'Movies', icon: <FaFilm />, href: '/amin/movies', query: '' },
        { title: 'Tracker', icon: <FaTwitter />, href: '/amin/tracker', query: '' }
    ];

    return (
        <div className='min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-800 p-8 text-white'>
            <div className='mx-auto max-w-6xl'>
                {/* Header */}
                <div className='mb-10 flex items-center justify-between'>
                    <h1 className='text-3xl font-bold'>Welcome back, {session?.user?.name}</h1>
                    <button
                        onClick={() => signOut({ callbackUrl: '/amin' })}
                        className='flex items-center space-x-2 rounded-xl bg-green-700 px-4 py-2 text-white transition hover:bg-green-600'>
                        <FaSignOutAlt />
                        <span>Sign Out</span>
                    </button>
                </div>

                {/* Dashboard Cards */}
                <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                    {cards.map((card) => (
                        <Link
                            key={card.title}
                            href={{ pathname: card.href, query: card.query }}
                            className='group flex cursor-pointer flex-col items-center justify-center space-y-4 rounded-2xl border border-green-700 bg-gradient-to-br from-green-800 to-green-900 p-6 shadow-lg transition-all duration-300 hover:from-green-700 hover:to-green-800'>
                            <div className='text-4xl text-green-400 transition group-hover:text-green-300'>
                                {card.icon}
                            </div>
                            <h2 className='text-xl font-semibold group-hover:text-green-200'>{card.title}</h2>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
