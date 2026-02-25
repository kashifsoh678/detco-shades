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

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[
                                'Riyadh', 'Jeddah', 'Dammam',
                                'Khobar', 'Jubail', 'Yanbu',
                                'Tabuk', 'Madinah', 'Makkah',
                                'Abha', 'Taif', 'Al Qassim',
                                'Najran', 'Jazan', 'Ha\'il'
                            ].map((city, i) => (
                                <div key={i} className="flex items-center gap-2 text-gray-700 font-medium whitespace-nowrap">
                                    <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
                                    <span className="truncate">{city}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative h-[400px] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
                        {/* Google Map Embed */}
                        <iframe
                            src="https://maps.google.com/maps?q=Detco%20Systems%20Co.,%20Jeddah&t=&z=12&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full grayscale-[0.2] contrast-100"
                        />
                        <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-overlay" />

                        <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-md py-3 px-5 rounded-xl shadow-xl border border-white/20 pointer-events-none hidden sm:block">
                            <h4 className="font-bold text-primary text-base mb-0.5">Nationwide Coverage</h4>
                            <p className="text-xs text-gray-600 font-medium">Headquartered in Jeddah</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
