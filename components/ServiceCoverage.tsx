"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function ServiceCoverage() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
                            Service Area
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                            Serving All of Saudi Arabia
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            From our headquarters in Jeddah, we deploy installation teams across the entire Kingdom. No location is too remote for Detco standards.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {['Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Jubail', 'Yanbu', 'Tabuk', 'Madinah', 'Makkah', 'Abha'].map((city, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-700 font-medium">
                                    <span className="w-2 h-2 bg-primary rounded-full" />
                                    {city}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative h-[400px] w-full rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                        {/* Placeholder for Map Image */}
                        <div className="absolute inset-0 bg-[url('https://placehold.co/800x600/f3f4f6/006666?text=Saudi+Arabia+Map')] bg-cover bg-center opacity-80" />
                        <div className="relative z-10 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center">
                            <h4 className="font-bold text-primary text-xl mb-1">Nationwide Coverage</h4>
                            <p className="text-sm text-gray-600">Fast Mobilization & Installation</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
