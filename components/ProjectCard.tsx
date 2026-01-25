"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Eye } from 'lucide-react';
import Image from 'next/image';
import { PLACEHOLDER_IMAGE } from '@/constants/api';

interface ProjectCardProps {
    id: string;
    title: string;
    service: string;
    location: string;
    thumbnail: string;
    index?: number;
    onQuickView?: () => void;
}

export default function ProjectCard({ title, service, location, thumbnail, index = 0, onQuickView }: ProjectCardProps) {
    const [imgSrc, setImgSrc] = useState(thumbnail || PLACEHOLDER_IMAGE);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >
            {/* Image - Hover View Icon */}
            <div className="aspect-4/2 w-full overflow-hidden relative bg-gray-100">
                <Image
                    src={imgSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
                    <div onClick={onQuickView} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300 cursor-pointer">
                        <Eye className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Content - Simple & Clean */}
            <div className="flex flex-col p-7 items-start">

                <h3
                    className="text-xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors cursor-pointer line-clamp-2 min-h-14"
                    onClick={onQuickView}
                >
                    {title}
                </h3>
                <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2">
                    {service}
                </span>

                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                    <div className="p-1.5 bg-primary/5 rounded-lg text-primary">
                        <MapPin size={14} />
                    </div>
                    {location}
                </div>
            </div>
        </motion.div>
    );
}
