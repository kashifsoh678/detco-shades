import React from 'react';

export default function TopBar() {
    return (
        <div className="bg-white border-b border-gray-100 py-2 hidden md:block">
            <div className="container mx-auto px-4 flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center gap-4">
                    <span>High Quality Sun Shades in Saudi Arabia</span>
                </div>
                <div className="flex items-center gap-6">
                    <a href="tel:+966559611821" className="hover:text-primary transition-colors flex items-center gap-1">
                        <span>+966 55 961 1821</span>
                    </a>
                    <span className="text-gray-300">|</span>
                    <a href="tel:+966508304644" className="hover:text-primary transition-colors flex items-center gap-1">
                        <span>+966 50 830 4644</span>
                    </a>
                    {/* Social icons could go here */}
                </div>
            </div>
        </div>
    );
}
