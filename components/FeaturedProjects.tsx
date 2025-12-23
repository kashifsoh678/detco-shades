"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

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
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            title={project.title}
                            category={project.category}
                            location={project.location}
                            image={project.image}
                            index={index}
                        />
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
