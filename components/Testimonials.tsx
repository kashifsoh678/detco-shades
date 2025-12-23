"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        quote: "Detco provided exceptional service for our mall parking project. The quality of the tensile fabric is outstanding and the installation was completed on schedule.",
        author: "Ahmed Al-Sayed",
        role: "Project Manager, Red Sea Mall",
        rating: 5
    },
    {
        quote: "We chose Detco for our school courtyard shades because of their safety standards and engineering expertise. Highly recommended.",
        author: "Sarah Johnson",
        role: "Principal, International School",
        rating: 5
    },
    {
        quote: "Professional team, competitive pricing, and high-quality finish. The car parking shades have transformed our residential compound.",
        author: "Mohammad Al-Ghamdi",
        role: "Property Manager",
        rating: 5
    }
];

export default function Testimonials() {
    return (

        // <section className="py-24 bg-teal-900 text-white relative overflow-hidden">
        <section className="relative py-20 bg-primary overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-teal-400 font-bold tracking-widest uppercase text-sm mb-3 block">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold">
                        What Our Clients Say
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/10 relative"
                        >
                            <Quote className="absolute top-6 right-6 text-teal-500/20 w-12 h-12" />
                            <div className="flex gap-1 mb-6 text-yellow-400">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>
                            <p className="text-gray-300 italic mb-6 leading-relaxed">
                                "{item.quote}"
                            </p>
                            <div>
                                <h4 className="font-bold text-white text-lg">{item.author}</h4>
                                <p className="text-teal-400 text-sm">{item.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
