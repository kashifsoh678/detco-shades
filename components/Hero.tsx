"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative w-full min-h-[85vh] flex items-center bg-gray-900 overflow-hidden">
            {/* Background Image with Ken Burns Effect */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                    className="w-full h-full bg-[url('https://placehold.co/1920x1080/0f172a/006666?text=Engineering+Excellence')] bg-cover bg-center opacity-60"
                />

                {/* Dramatic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4">
                <div className="max-w-3xl">
                    {/* Brand Tagline */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="h-0.5 w-12 bg-primary"></div>
                        <span className="text-primary font-bold tracking-widest uppercase text-sm md:text-base">
                            Detco Systems Co.
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
                    >
                        Engineering Excellence in <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">
                            Tensile Structures
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
                    >
                        We deliver premier sun control solutions and car shading systems across Saudi Arabia, combining durability with architectural elegance.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-5"
                    >
                        <Link href="/products">
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "#0f766e" }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-primary text-white font-bold rounded-sm shadow-lg shadow-teal-900/20 transition-all w-full sm:w-auto text-sm tracking-wide"
                            >
                                EXPLORE COLLECTION
                            </motion.button>
                        </Link>
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-transparent text-white border border-white/30 backdrop-blur-sm font-bold rounded-sm hover:border-white transition-all w-full sm:w-auto text-sm tracking-wide"
                            >
                                GET A CONSULTATION
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center p-1"
                >
                    <div className="w-1 h-2 bg-white/50 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
