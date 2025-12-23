"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import WhyChooseUs from './WhyChooseUs';

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
                                Why <span className="text-primary">DetcoShades?</span>
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
                        <WhyChooseUs columns={2} />
                    </div>

                </div>
            </div>
        </section>
    );
}
