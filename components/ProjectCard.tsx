"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Eye } from 'lucide-react';

interface ProjectCardProps {
    id: string | number;
    title: string;
    category: string;
    location: string;
    image: string;
    index?: number;
}

export default function ProjectCard({ title, category, location, image, index = 0 }: ProjectCardProps) {
    return (
        <motion.div
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
                    style={{ backgroundImage: `url('${image}')` }}
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
                    {category}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary transition-colors">
                    {title}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    {location}
                </div>
            </div>
        </motion.div>
    );
}
