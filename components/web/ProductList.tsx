"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { PLACEHOLDER_IMAGE } from "@/constants/api";

interface Product {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    thumbnailUrl?: string;
}

interface ProductListProps {
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

export default function ProductList({ products }: ProductListProps) {
    if (products.length === 0) {
        return (
            <div className="bg-white border border-gray-100 rounded-[3rem] p-24 shadow-xl flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-8 border shadow-inner">
                    <Layers size={48} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">
                    No Products Found
                </h3>
                <p className="text-gray-500 max-w-sm text-lg leading-relaxed">
                    We are currently updating our catalog. Please check back soon.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col rounded-3xl"
                >
                    <ProductCardItem product={product} />
                </motion.div>
            ))}
        </div>
    );
}
