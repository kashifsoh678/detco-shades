import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { products } from '@/db/schema/products';
import { eq, desc } from 'drizzle-orm';
import ProductList from '@/components/web/ProductList';

export const revalidate = 0; // Ensure fresh data on every request (or set to 60 for ISR)

export default async function ProductsPage() {
    // Fetch active products
    const productsData = await db.query.products.findMany({
        where: eq(products.isActive, true),
        with: {
            thumbnail: true,
        },
        orderBy: [desc(products.order), desc(products.createdAt)],
    });

    // Transform for UI
    const formattedProducts = productsData.map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        shortDescription: p.shortDescription || '',
        thumbnailUrl: p.thumbnail?.url,
    }));

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative py-16 md:py-24 lg:py-28 bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://placehold.co/1920x600/0f766e/ffffff?text=Our+Products')] opacity-10 bg-cover bg-center" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Our Products
                    </h1>
                    <p className="text-teal-100 text-base md:text-xl max-w-2xl mx-auto">
                        Explore our comprehensive range of premium shading solutions engineered for durability.
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 -mt-10 relative z-20 pb-24">
                <ProductList products={formattedProducts} />
            </div>

            {/* CTA Section */}
            <div className="bg-teal-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Need a Custom Solution?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Our engineering team can tackle unique challenges. Contact us to discuss your specific requirements.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center bg-primary text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-teal-700 transition-all transform hover:-translate-y-1"
                    >
                        Request Consultation
                    </Link>
                </div>
            </div>
        </main>
    );
}
