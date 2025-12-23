"use client";

import React from 'react';
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

interface WhyChooseUsProps {
    className?: string;
    columns?: 1 | 2 | 3 | 4;
}

export default function WhyChooseUs({ className = "", columns = 3 }: WhyChooseUsProps) {
    const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    };

    return (
        <div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`
                        group relative bg-white p-8 rounded-2xl border border-gray-100 
                        shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
                        hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 hover:border-teal-500/30
                        transition-all duration-300 overflow-hidden
                        ${(columns === 2 && index === 2) ? 'md:col-span-2' : ''}
                    `}
                >
                    {/* Hover Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                            <feature.icon size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
                            {feature.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
