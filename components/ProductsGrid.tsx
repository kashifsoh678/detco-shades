"use client";

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const products = [
    { id: 1, name: 'HDPE Car Parking Shades', image: 'https://placehold.co/600x400/e0e0e0/006666?text=HDPE+Shades' },
    { id: 2, name: 'PVC Car Parking Shades', image: 'https://placehold.co/600x400/e0e0e0/006666?text=PVC+Shades' },
    { id: 3, name: 'Tensile Structures', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Tensile+Structures' },
    { id: 4, name: 'Sails', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Sails' },
    { id: 5, name: 'Multi Level Sails', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Multi+Level+Sails' },
    { id: 6, name: 'Single Cantilever', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Single+Cantilever' },
    { id: 7, name: 'T-Cantilever', image: 'https://placehold.co/600x400/e0e0e0/006666?text=T-Cantilever' },
    { id: 8, name: 'Square & Rectangles', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Square+Rectangles' },
    { id: 9, name: 'Single Post', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Single+Post' },
    { id: 10, name: 'Walk Shade', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Walk+Shade' },
    { id: 11, name: 'Mega Spans', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Mega+Spans' },
    { id: 12, name: 'Double Cantilever', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Double+Cantilever' },
    { id: 13, name: 'Automatic Awnings', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Automatic+Awnings' },
    { id: 14, name: 'Rubber Wheel Stoppers', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Wheel+Stoppers' },
    { id: 15, name: 'Car Parking Marking', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Car+Parking+Marking' },
];

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 50,
            damping: 20
        }
    }
};

interface ProductsGridProps {
    showHeader?: boolean;
}

export default function ProductsGrid({ showHeader = false }: ProductsGridProps) {
    return (
        <section className="py-24 bg-white transition-colors mb-16">
            <div className="container mx-auto px-4">

                {/* Standardized Header - Conditional Rendering */}
                {showHeader && (
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
                                Our Collection
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                                Premium Products
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="hidden md:block"
                        >
                            <Link href="/products" className="group flex items-center gap-2 text-primary font-bold hover:text-teal-700 transition-colors">
                                VIEW ALL PRODUCTS
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                )}

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {products.map((product) => (
                        <motion.div key={product.id} variants={item}>
                            <Link
                                href={`/products/${product.id}`}
                                className="group block relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                            >
                                {/* Image Container */}
                                <div className="relative h-64 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 duration-500" />
                                    <div
                                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                                        style={{ backgroundImage: `url('${product.image}')` }}
                                    ></div>
                                </div>

                                {/* Original Label Design (Teal Bar) */}
                                <div className="bg-primary text-white text-center py-4 px-2 relative z-20">
                                    <h3 className="text-sm font-bold uppercase tracking-wider">{product.name}</h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/products" className="inline-flex items-center gap-2 text-primary font-bold hover:text-teal-700 transition-colors">
                        VIEW ALL PRODUCTS
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
