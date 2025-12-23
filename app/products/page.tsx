import React from 'react';
import ProductsGrid from "@/components/ProductsGrid";


export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="relative py-16 md:py-24 bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://placehold.co/1920x600/0f766e/ffffff?text=Our+Products')] opacity-10 bg-cover bg-center" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Our Products
                    </h1>
                    <p
                        className="text-teal-100 text-base md:text-xl max-w-2xl mx-auto"
                    >
                        Explore our comprehensive range of shading solutions
                    </p>
                </div>
            </div>

            {/* Reusing the Grid Component */}
            <ProductsGrid />
        </main>
    );
}
