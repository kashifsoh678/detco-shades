"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, HardHat, Shield } from 'lucide-react';

const standards = [
    {
        icon: CheckCircle2,
        title: "ISO Certified",
        description: "We strictly adhere to international quality management standards ensuring consistent excellence."
    },
    {
        icon: HardHat,
        title: "Safety First",
        description: "Rigorous safety protocols during manufacturing and on-site installation to protect our team and your property."
    },
    {
        icon: Shield,
        title: "10-Year Warranty",
        description: "Most of our fabric structures come with a comprehensive 10-year warranty against UV degradation."
    },
    {
        icon: Award,
        title: "SASO Compliant",
        description: "All materials and engineering designs comply with the Saudi Standards, Metrology and Quality Organization."
    }
];

export default function QualityStandards() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
                    <div className="lg:w-1/2">
                        <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-3 block">
                            Our Commitment
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                            Quality & Safety Standards
                        </h2>
                        <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                            At Detco, quality isn't just a buzzword—it's the foundation of everything we build. We engineer structures that stand the test of time and nature.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {standards.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="p-2 bg-green-50 text-green-600 rounded-lg shrink-0">
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full">
                        <div className="relative h-[500px] w-full bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-[url('https://placehold.co/800x1000/e0e0e0/006666?text=Quality+Control')] bg-cover bg-center" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <p className="font-bold text-2xl mb-2">Engineered for Durability</p>
                                    <p className="opacity-90">Every connection, weld, and stitch is inspected.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
