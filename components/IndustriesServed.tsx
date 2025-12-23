"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, School, Plane, Home, Briefcase, Tent } from 'lucide-react';

const industries = [
    { icon: Briefcase, name: 'Commercial', description: 'Office complexes, retail parks, and malls.' },
    { icon: Home, name: 'Residential', description: 'Villas, compounds, and private gardens.' },
    { icon: School, name: 'Education', description: 'Schools, universities, and playgrounds.' },
    { icon: Building2, name: 'Government', description: 'Public sector buildings and municipalities.' },
    { icon: Plane, name: 'Airports & Transport', description: 'Terminals, bus stations, and parking lots.' },
    { icon: Tent, name: 'Events & Hospitality', description: 'Hotels, resorts, and temporary event structures.' },
];

export default function IndustriesServed() {
    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-3 block">
                        Our Expertise
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                        Industries We Serve
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {industries.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="
                                group relative bg-white p-8 rounded-2xl border border-gray-100 
                                shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
                                hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 hover:border-teal-500/30
                                transition-all duration-300 overflow-hidden flex flex-col items-start gap-4
                            "
                        >
                            {/* Hover Gradient Background */}
                            <div className="absolute inset-0 bg-linear-to-br from-teal-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="relative z-10 w-full">
                                <div className="w-16 h-16 bg-linear-to-br from-teal-50 to-teal-100 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                                    <item.icon size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
