"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
    return (
        <section className="relative py-20 bg-primary overflow-hidden">
            {/* Background Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            {/* Animated Shapes */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-2xl"
            />

            <div className="container relative z-10 mx-auto px-4 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl font-bold text-white mb-6"
                >
                    Ready to Transform Your Space?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-teal-100 mb-10 max-w-2xl mx-auto"
                >
                    Get a custom quote for your tensile structure or shading project today.
                    Our experts are ready to bring your vision to life.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-primary font-bold py-4 px-10 rounded-sm shadow-xl hover:bg-gray-100 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                        GET A FREE QUOTE
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
