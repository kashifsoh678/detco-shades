"use client";

import React from 'react';
import IndustriesServed from '@/components/IndustriesServed';
import QualityStandards from '@/components/QualityStandards';
import WhyChooseUs from '@/components/WhyChooseUs';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* 1. Hero / Header */}
            <div className="relative py-16 md:py-24 bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://placehold.co/1920x600/0f766e/ffffff?text=Fabric+Pattern')] opacity-10 bg-cover bg-center" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        About Detco
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-teal-100 text-base md:text-xl max-w-2xl mx-auto"
                    >
                        Pioneers in Tensile Structures & Sun Control Solutions in Saudi Arabia
                    </motion.p>
                </div>
            </div>

            {/* 2. Company Overview */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-3 block">
                                Company Overview
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
                                Who We Are
                            </h2>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                                Detco Systems Co. is a premier engineering firm established with a commitment to **excellence** in the field of tensile structures and sun shade systems.
                                Based in Jeddah and serving the entire Kingdom of Saudi Arabia, we combine architectural creativity with engineering precision to deliver comfortable, shaded environments.
                            </p>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                                Our portfolio spans across commercial, residential, government, and industrial sectors. We pride ourselves on being a one-stop solution provider—handling everything from design and engineering to manufacturing and installation.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Vision & Mission */}
            <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-8 md:p-10 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Our Vision
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                To be the undisputed leader in shading solutions across the Middle East, recognized for innovation, quality, and our contribution to sustainable urban development.
                            </p>
                        </motion.div>

                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white p-8 md:p-10 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border-t-4 border-teal-700"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Our Mission
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                To engineer superior protection against the harsh climate while enhancing aesthetic appeal. We aim to deliver projects on time, within budget, and above expectations through rigorous quality control and safety standards.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 4. Our Expertise (Reusable Component) */}
            <IndustriesServed />

            {/* 5. Quality & Safety (Reusable Component) */}
            <QualityStandards />

            {/* 6. Why Choose DetcoShades (Reusable/Shared Component) */}
            <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-3 block">
                                Why Choose Us
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                                The Detco Advantage
                            </h2>
                        </motion.div>
                    </div>
                    <WhyChooseUs />
                </div>
            </section>
        </main>
    );
}
