"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PLACEHOLDER_IMAGE } from "@/constants/api";

interface Product {
    id: string;
    title: string;
    slug: string;
    thumbnailUrl?: string;
}

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
    products: Product[];
}

const ProductCardItem = ({ product }: { product: Product }) => {
    const [imgSrc, setImgSrc] = useState(product.thumbnailUrl || PLACEHOLDER_IMAGE);

    return (
        <Link
            href={`/products/${product.slug}`}
            className="group block relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
        >
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 duration-500" />

                <Image
                    src={imgSrc}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Original Label Design (Teal Bar) */}
            <div className="bg-primary text-white text-center py-4 px-2 relative z-20">
                <h3 className="text-sm font-bold uppercase tracking-wider">{product.title}</h3>
            </div>
        </Link>
    );
};

export default function ProductsGrid({ showHeader = false, products }: ProductsGridProps) {
    if (!products || products.length === 0) return null;

    return (
        <section className="py-24 bg-gray-50 transition-colors mb-16">
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
                                Our Shade Solutions
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
                            <ProductCardItem product={product} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Button at the bottom for all screens when many products */}
                <div className="mt-16 text-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-3 bg-primary text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl hover:bg-teal-700 transition-all transform hover:-translate-y-1 group"
                    >
                        VIEW ALL PRODUCTS
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
