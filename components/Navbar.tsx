"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Clients', href: '/clients' },
];

export const AdminDashboardRoutes = [
    '/admin',
    '/admin/projects',
    '/admin/clients',
    '/admin/services',
    '/admin/products',
]

export function hasAdminPath(str: string) {
    return str.toLowerCase().startsWith('/admin');
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);

    const isDashboardRoute = hasAdminPath(pathname);
    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            // Store the current scroll position
            const scrollY = window.scrollY;

            // Prevent scrolling
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';

            // Prevent scrolling on iOS
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.style.position = 'fixed';
            document.documentElement.style.width = '100%';

            return () => {
                // Restore scrolling
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';

                document.documentElement.style.overflow = '';
                document.documentElement.style.position = '';
                document.documentElement.style.width = '';

                // Restore scroll position
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen]);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return !isDashboardRoute && (
        <>

            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
                <div className="container mx-auto px-4 py-4 lg:py-4">
                    <div className="flex justify-between items-center h-10 lg:h-18 xl:h-28">
                        <Link href="/" className={`flex flex-col relative z-50 group   `}>
                            <Image
                                src="/images/detco_logo.png"
                                alt="DETCO - Al-Dorman Est."
                                width={260}
                                height={100}
                                className="h-18 lg:h-28 xl:h-34 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                priority
                                unoptimized
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
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
                                className="bg-primary text-white text-xs xl:text-sm font-bold px-6 py-3 rounded shadow-lg shadow-teal-700/20 hover:shadow-teal-700/40 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                CONTACT US
                            </Link>
                        </nav>



                        {/* Mobile Menu Button - Hide when menu is open */}
                        {!isOpen && (
                            <button
                                className="lg:hidden p-2 text-gray-800 focus:outline-none z-50 relative"
                                onClick={() => setIsOpen(true)}
                                aria-label="Open menu"
                                aria-expanded={isOpen}
                            >
                                <div className="w-6 h-5 flex flex-col justify-between">
                                    <span className="w-full h-0.5 bg-current transform transition-all duration-300" />
                                    <span className="w-full h-0.5 bg-current transition-all duration-300" />
                                    <span className="w-full h-0.5 bg-current transform transition-all duration-300" />
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile Nav Overlay - Full Screen (Outside header for proper positioning) */}

            <div
                className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-white z-9999 flex flex-col items-center justify-center space-y-4 p-6 lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'
                    }`}
                ref={menuRef}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                aria-hidden={!isOpen}
                style={{
                    pointerEvents: isOpen ? 'auto' : 'none',
                }}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 p-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg transition-colors z-10"
                    aria-label="Close menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Navigation Links */}
                <nav className="flex flex-col items-center justify-center  space-y-6  flex-1 px-4">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-2xl font-bold transition-colors w-full   text-center py-3 px-4 ${isActive
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-gray-800 hover:text-primary'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name.toUpperCase()}
                            </Link>
                        );
                    })}
                </nav>

                {/* Contact Button */}
                <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="w-full max-w-xs bg-primary text-white text-lg font-bold px-8 py-4 rounded-lg shadow-xl hover:bg-teal-700 transition-colors text-center"
                >
                    CONTACT US
                </Link>
            </div>

        </>
    )

}
