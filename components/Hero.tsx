import React from 'react';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative w-full h-[500px] flex items-center justify-center bg-gray-100 overflow-hidden">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-gray-200">
                {/* In production, this would be an <Image /> component */}
                <div className="w-full h-full bg-[url('https://placehold.co/1920x600/e0e0e0/006666?text=Detco+Shades+Systems')] bg-cover bg-center opacity-50"></div>
            </div>

            {/* Overlay Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                    <span className="block text-primary">Detco Systems Co.</span>
                    <span className="text-2xl md:text-3xl font-normal text-gray-600">The Future of Sun Control in Saudi Arabia</span>
                </h1>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                    We specialize in high-quality tensile structures, car parking shades, and sun control solutions for residential and commercial projects.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/products"
                        className="px-8 py-3 bg-primary text-white font-bold rounded hover:bg-teal-700 transition-colors"
                    >
                        VIEW OUR PRODUCTS
                    </Link>
                    <Link
                        href="/contact"
                        className="px-8 py-3 bg-white text-primary border-2 border-primary font-bold rounded hover:bg-gray-50 transition-colors"
                    >
                        CONTACT US
                    </Link>
                </div>
            </div>
        </section>
    );
}
