"use client"
import React from 'react';
import { AdminDashboardRoutes, hasAdminPath } from './Navbar';
import { usePathname } from 'next/navigation';

export default function TopBar() {
    const pathname = usePathname();
    const isDashboardRoute = hasAdminPath(pathname);

    return !isDashboardRoute && (
        <div className="bg-white border-b border-gray-100 py-2 hidden md:block">
            <div className="container mx-auto px-4 flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center gap-4">
                    <span>High Quality Sun Shades in Saudi Arabia</span>
                </div>
                <div className="flex items-center gap-6">
                    <a href="tel:+966590391128" className="hover:text-primary transition-colors flex items-center gap-1">
                        <span>+966590391128</span>
                    </a>
                    <a href="tel:+966530275784" className="hover:text-primary transition-colors flex items-center gap-1">
                        <span>+966530275784</span>
                    </a>
                    {/* Social icons could go here */}
                </div>
            </div>
        </div>
    );
}
