"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex flex-col">
                        {/* Placeholder Logo Text until Image is provided */}
                        <span className="text-2xl font-bold text-gray-800">DETCO</span>
                        <span className="text-[10px] tracking-widest text-primary font-bold uppercase">Shades Systems</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-gray-600'
                                        }`}
                                >
                                    {link.name.toUpperCase()}
                                </Link>
                            );
                        })}
                        <Link
                            href="/contact"
                            className="bg-primary text-white text-xs font-bold px-4 py-2 rounded transition-colors hover:bg-teal-700"
                        >
                            GET A QUOTE
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <nav className="flex flex-col p-4 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-600 hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name.toUpperCase()}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="bg-primary text-white text-xs font-bold px-4 py-3 rounded text-center"
                        >
                            GET A QUOTE
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
