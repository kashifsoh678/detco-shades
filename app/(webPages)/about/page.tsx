"use client";

import React from 'react';
import IndustriesServed from '@/components/IndustriesServed';
import QualityStandards from '@/components/QualityStandards';
import WhyChooseUs from '@/components/WhyChooseUs';
import { motion } from 'framer-motion';
import PageBanner from '@/components/web/PageBanner';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* 1. Hero / Header */}
            <PageBanner title="About Detco" subtitle="Pioneers in Tensile Structures & Sun Control Solutions in Saudi Arabia" />

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
                            <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-3 block text-center">
                                Company Overview
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-10 leading-tight text-center">
                                Who We Are
                            </h2>
                            <div className="text-left">
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4">
                                    <strong className='text-primary text-2xl'>DETCO</strong> is one of the national leading companies in the Kingdom of Saudi Arabia and is considered to be one of the important companies in the development and construction process in the Kingdom.  Especially in construction and technical work fields of shades, covers, and stretched membranes, masonry works, turn-key projects, in addition to all metal and iron works.
                                </p>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Company's specializations and activities:
                                </h3>
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                                    Providing and installing car park shades of all types, fabricated from high-quality materials as per international specifications which we firmly commit to. Also, the accurate properties of our control program in manufacturing ensure the stability of the final product.
                                </p>

                                <ul className="text-base md:text-lg text-gray-600 leading-relaxed list-none space-y-4 mb-8">
                                    <li className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-primary/20 transition-colors">
                                        <span className="text-primary text-2xl leading-none mt-1">•</span>
                                        <span>Stretched construction installations for public squares and gardens with aesthetic forms of open and covered areas that add an aesthetic touch to the place.</span>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-primary/20 transition-colors">
                                        <span className="text-primary text-2xl leading-none mt-1">•</span>
                                        <span>Installations of shades for schools and gardens, which are subject to international standard specifications to ensure they block ultraviolet rays.</span>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-primary/20 transition-colors">
                                        <span className="text-primary text-2xl leading-none mt-1">•</span>
                                        <span>Covering of swimming pools, playgrounds and recreation centers, mobile shades, wall blocks, and wind barriers.</span>
                                    </li>
                                    <li className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-primary/20 transition-colors">
                                        <span className="text-primary text-2xl leading-none mt-1">•</span>
                                        <span>Metal fences, doors, protection windows, hangers, and warehouses as per the highest specifications, factories (Pre-Engineered Structures), and commercial showrooms.</span>
                                    </li>
                                </ul>

                                <div className="p-5 bg-primary/5 rounded-xl border border-primary/10 text-center">
                                    <p className="text-base md:text-lg text-primary font-semibold tracking-wide">
                                        Car Parking Shades <span className="mx-2 text-gray-300">|</span> Sails Shade <span className="mx-2 text-gray-300">|</span> Swimming Pool Shade <span className="mx-2 text-gray-300">|</span> Outdoor Sitting Area Shade
                                    </p>
                                </div>
                            </div>
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
                                In addition to maintaining leadership in the construction of all awnings, DETCO is committed to increasing its market share in other sectors, mainly in the Space Frame, Skylight sector, and Metal Works through strategic alliances with national and international reputable companies.
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
                                To engineer superior protection against the harsh climate while enhancing aesthetic appeal. We aim to deliver turn-key projects, including advanced masonry and metal work, on time, within budget, and above expectations through rigorous quality control, safety standards, and reliable strategic alliances.
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
