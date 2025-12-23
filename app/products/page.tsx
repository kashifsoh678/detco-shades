import React from 'react';
import ProductsGrid from "@/components/ProductsGrid";

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="bg-primary py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-white">Our Products</h1>
                    <p className="text-teal-100 mt-2">Explore our comprehensive range of shading solutions</p>
                </div>
            </div>

            {/* Reusing the Grid Component */}
            <ProductsGrid />
        </main>
    );
}
