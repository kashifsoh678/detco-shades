"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Ruler, Sparkles } from 'lucide-react';

const features = [
    {
        icon: ShieldCheck,
        title: "All-Weather Protection",
        description: "Engineered to withstand harsh climates, offering superior UV resistance and durability."
    },
    {
        icon: Ruler,
        title: "Custom Engineering",
        description: "Tailored shading solutions designed to fit unique architectural requirements perfectly."
    },
    {
        icon: Sparkles,
        title: "Premium Materials",
        description: "Utilizing high-grade PVC, PVDF, and HDPE fabrics for long-lasting aesthetics and performance."
    }
];

export default function Introduction() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Side: Text Content */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
                                About Us
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                                Leading Experts in <br />
                                <span className="text-primary">Shading Systems</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Detco Systems Co. specializes in providing high-quality sun shades tailored to meet diverse outdoor needs in Saudi Arabia.
                                These shades offer exceptional sun protection and enhance the aesthetic value of spaces, making them ideal for both residential and commercial applications.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-8">
                                With durable materials and innovative designs, our sun shades are perfect for car parks, swimming pools, and playgrounds.
                                Trust Detco Systems Co. to deliver reliable and stylish shading solutions.
                            </p>

                            <Link href="/about">
                                <motion.button
                                    whileHover={{ scale: 1.02, backgroundColor: "#0f766e" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-4 bg-primary text-white font-bold rounded-sm shadow-lg shadow-teal-900/20 transition-all w-full sm:w-auto text-sm tracking-wide"
                                >
                                    READ MORE
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Side: Feature Grid */}
                    <div className="lg:w-1/2 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 ${index === 2 ? 'md:col-span-2' : ''}`}
                                >
                                    <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mb-6 text-primary">
                                        <feature.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
