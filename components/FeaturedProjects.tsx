"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Eye } from 'lucide-react';

const projects = [
    {
        id: 'riyadh-metro',
        title: "Riyadh Metro Stations",
        category: "Tensile Structures",
        location: "Riyadh, KSA",
        image: "https://placehold.co/800x600/006666/FFFFFF?text=Riyadh+Metro",
        description: "Innovative PTFE tensile fabric structures for passenger terminals."
    },
    {
        id: 'ksu-stadium',
        title: "King Saud University",
        category: "Stadium Shading",
        location: "Riyadh, KSA",
        image: "https://placehold.co/800x600/006666/FFFFFF?text=KSU+Stadium",
        description: "Massive cantilever shades designed for stadium seating."
    },
    {
        id: 'diplomatic-quarter',
        title: "Diplomatic Quarter",
        category: "Walkway & Park Shades",
        location: "Riyadh, KSA",
        image: "https://placehold.co/800x600/006666/FFFFFF?text=Diplomatic+Quarter",
        description: "Aesthetically pleasing geometric shade structures."
    }
];

export default function FeaturedProjects() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
                            Our Portfolio
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Signature Projects
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden md:block"
                    >
                        <Link href="/projects" className="group flex items-center gap-2 text-primary font-bold hover:text-teal-700 transition-colors">
                            VIEW ALL PROJECTS
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                        >
                            {/* Image - Hover View Icon */}
                            <div className="aspect-4/3 w-full overflow-hidden relative">
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${project.image}')` }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                        <Eye className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>

                            {/* Content - Simple & Clean */}
                            <div className="flex flex-col p-6 items-start">
                                <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2">
                                    {project.category}
                                </span>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>

                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    {project.location}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-primary font-bold hover:text-teal-700 transition-colors">
                        VIEW ALL PROJECTS
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
