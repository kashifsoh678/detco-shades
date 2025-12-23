import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* Column 1: About */}
                    <div>
                        <div className="mb-6">
                            <Image
                                src="/images/detco_logo.png"
                                alt="DETCO Logo"
                                width={180}
                                height={70}
                                className="h-30 w-auto object-contain brightness-0 invert opacity-90"
                                unoptimized
                            />
                        </div>
                        <h3 className="text-xl font-bold mb-6 border-b border-gray-600 pb-2 inline-block">Al-Dorman Est.</h3>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Al-Dorman Est. For Trading & Contracting (DETCO) is a premier provider of shade and tent services in Saudi Arabia. We specialize in engineering, manufacturing, and installing high-quality tensile structures.
                        </p>
                        <div className="flex gap-4">
                            {/* Social placeholders */}
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">F</div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">T</div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-primary cursor-pointer transition-colors">L</div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 border-b border-gray-600 pb-2 inline-block">Quick Links</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/products" className="hover:text-primary transition-colors">Our Products</Link></li>
                            <li><Link href="/projects" className="hover:text-primary transition-colors">Completed Projects</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 border-b border-gray-600 pb-2 inline-block">Contact Info</h3>
                        <div className="space-y-4 text-gray-400">
                            <p className="flex items-start gap-3">
                                <span className="text-primary mt-1">📍</span>
                                <span>HQ, Jeddah, Saudi Arabia<br />Service Regions: Riyadh, Dammam, Khobar, Jubail, Yanbu, Tabuk</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="text-primary">📞</span>
                                <a href="tel:+966559611821" className="hover:text-primary transition-colors">+966 55 961 1821</a>
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="text-primary">✉️</span>
                                <a href="mailto:info@detco.sa" className="hover:text-primary transition-colors">info@detco.sa</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Al-Dorman Est. (DETCO). All rights reserved.</p>
                    <p>Designed for Excellence.</p>
                </div>
            </div>
        </footer>
    );
}
