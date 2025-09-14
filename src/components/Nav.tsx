'use client';

import React, { useState } from 'react';

import Link from 'next/link';

function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <>
            <header className='site-header sticky top-0 z-50 flex h-20 w-full items-center bg-gray-900 px-6 shadow-lg backdrop-blur-sm'>
                <div className='grid flex-1 grid-cols-[auto_1fr_auto] items-center gap-4'>
                    <div className='text-center text-2xl font-extrabold whitespace-nowrap text-white select-none'>
                        <Link href='/'>Mohsen FM</Link>
                    </div>
                </div>

                {/* Hamburger Button */}
                <button
                    id='menu-btn'
                    aria-label='Toggle menu'
                    onClick={toggleMenu}
                    className='absolute top-1/2 right-4 z-50 flex h-10 w-10 -translate-y-1/2 transform flex-col items-center justify-center space-y-1 focus:outline-none md:hidden'>
                    <span
                        className={`block h-0.5 w-7 origin-left rounded bg-gray-300 transition-transform ${
                            isOpen ? 'translate-y-2 rotate-45' : ''
                        }`}></span>
                    <span
                        className={`block h-0.5 w-7 rounded bg-gray-300 transition-opacity ${
                            isOpen ? 'opacity-0' : ''
                        }`}></span>
                    <span
                        className={`block h-0.5 w-7 origin-left rounded bg-gray-300 transition-transform ${
                            isOpen ? '-translate-y-2 -rotate-45' : ''
                        }`}></span>
                </button>

                {/* Desktop Menu */}
                <ul className='ml-6 hidden place-items-center gap-10 font-medium text-gray-300 md:flex'>
                    <li>
                        <Link href='/' className='transition-colors duration-300 ease-in-out hover:text-green-200'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href='/about' className='transition-colors duration-300 ease-in-out hover:text-green-200'>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href='/work' className='transition-colors duration-300 ease-in-out hover:text-green-200'>
                            Work
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/contact'
                            className='transition-colors duration-300 ease-in-out hover:text-green-200'>
                            Contact
                        </Link>
                    </li>
                    <Link
                        href='/api/cv'
                        className='group relative overflow-hidden rounded-md border border-white px-5 py-2 font-semibold text-white transition-colors duration-500'>
                        <span className='absolute inset-0 origin-bottom-left scale-x-0 bg-green-200 transition-transform duration-700 ease-in-out group-hover:scale-x-100'></span>
                        <span className='relative z-10 transition-colors duration-500 group-hover:text-gray-900'>
                            Curriculum Vitae
                        </span>
                    </Link>
                </ul>
            </header>

            {/* Mobile Menu */}
            <div
                id='mobile-menu'
                className={`bg-opacity-95 overflow-hidden bg-gray-900 shadow-lg transition-all duration-300 ease-in-out md:hidden ${
                    isOpen ? 'max-h-screen' : 'max-h-0'
                }`}>
                <ul className='flex flex-col gap-4 p-4 font-medium text-gray-300'>
                    <li>
                        <Link
                            href='/'
                            className='transition-colors duration-300 ease-in-out hover:text-green-500'
                            onClick={() => setIsOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/about'
                            className='transition-colors duration-300 ease-in-out hover:text-green-500'
                            onClick={() => setIsOpen(false)}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/work'
                            className='transition-colors duration-300 ease-in-out hover:text-green-500'
                            onClick={() => setIsOpen(false)}>
                            Work
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/contact'
                            className='transition-colors duration-300 ease-in-out hover:text-green-500'
                            onClick={() => setIsOpen(false)}>
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/api/cv'
                            className='transition-colors duration-300 ease-in-out hover:text-green-500'
                            onClick={() => setIsOpen(false)}>
                            Curriculum Vitae
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Nav;
