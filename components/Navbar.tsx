"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Projects', href: '/projects' },
    { name: 'Clients', href: '/clients' },
    { name: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
            <div className="container mx-auto px-4 max-md:py-4">
                <div className="flex justify-between items-center h-20 md:h-28">
                    {/* Logo */}
                    <Link href="/" className="flex flex-col relative z-50 group">
                        <Image
                            src="/images/detco_logo.png"
                            alt="DETCO - Al-Dorman Est."
                            width={260}
                            height={100}
                            className="h-10 md:h-20 xl:h-30 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            priority
                            unoptimized
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-10">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative text-sm font-bold tracking-wide transition-colors duration-300 hover:text-primary py-2
                                        ${isActive ? 'text-primary' : 'text-gray-600'}
                                    `}
                                >
                                    {link.name.toUpperCase()}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                        <Link
                            href="/contact"
                            className="bg-primary text-white text-xs lg:text-sm font-bold px-6 py-3 rounded shadow-lg shadow-teal-700/20 hover:shadow-teal-700/40 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            GET A QUOTE
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-800 focus:outline-none z-50 relative"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-2xl font-bold text-gray-800 hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name.toUpperCase()}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="mt-8 bg-primary text-white text-lg font-bold px-8 py-4 rounded-lg shadow-xl"
                    >
                        GET A QUOTE
                    </Link>
                </div>
            </div>
        </header>
    );
}
