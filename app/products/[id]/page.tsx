import React from 'react';
import Link from 'next/link';

// Using a static mapping for the demo - in a real app this would be a DB or CMS fetch
const productsMap: any = {
    1: { name: 'HDPE Car Parking Shades', description: 'High Density Polyethylene shades are perfect for UV protection and airflow. Ideal for large car parks in Saudi Arabia.' },
    2: { name: 'PVC Car Parking Shades', description: 'Waterproof and durable PVC shades providing complete protection from sun and rain.' },
    3: { name: 'Tensile Structures', description: 'Architectural tensile structures for stadiums, malls, and public spaces.' },
    4: { name: 'Sails', description: 'Aesthetic sail shades for pools, parks, and residential areas.' },
    5: { name: 'Multi Level Sails', description: 'Complex multi-layered sail structures for artistic shading.' },
    6: { name: 'Single Cantilever', description: 'Single-post cantilever shades perfect for maximizing parking space.' },
    7: { name: 'T-Cantilever', description: 'Double-sided cantilever shades for central parking medians.' },
    8: { name: 'Square & Rectangles', description: 'Standard geometric shapes for playgrounds and open areas.' },
    9: { name: 'Single Post', description: 'Umbrella-style single post shades for individual spots.' },
    10: { name: 'Walk Shade', description: 'Covered walkways to protect pedestrians from the sun.' },
    11: { name: 'Mega Spans', description: 'Large-scale shading for industrial or commercial compounds.' },
    12: { name: 'Double Cantilever', description: 'Heavy-duty double cantilever structures for expansive coverage.' },
    13: { name: 'Automatic Awnings', description: 'Retractable and motorized awnings for flexible shading.' },
    14: { name: 'Rubber Wheel Stoppers', description: 'Safety accessories for car parks.' },
    15: { name: 'Car Parking Marking', description: 'Professional line marking services for organized parking.' },
};

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = productsMap[id] || { name: 'Product Not Found', description: 'This product details are currently being updated.' };
    const name = product.name !== 'Product Not Found' ? productsMap[id]?.name || `Product Category ${id}` : product.name;

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-gray-100 py-8 border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="text-sm breadcrumbs text-gray-500 mb-2">
                        <Link href="/" className="hover:text-primary">Home</Link> / <Link href="/products" className="hover:text-primary">Products</Link> / <span className="text-gray-900">{name}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery Placeholder */}
                    <div className="space-y-4">
                        <div className="bg-gray-200 h-96 rounded w-full flex items-center justify-center text-gray-400 font-medium">
                            Image for {name}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="aspect-square bg-gray-100 rounded hover:border-2 border-primary cursor-pointer transition-all"></div>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Description</h2>
                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            {product.description}
                            <br /><br />
                            Our {name} are designed to withstand the harsh Saudi Arabian climate, providing superior durability and aesthetic appeal.
                            They come in various colors and designs to match your architectural requirements.
                        </p>

                        <h3 className="text-xl font-bold mb-4 text-gray-800">Specifications</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-8 border-l-4 border-gray-200 pl-4">
                            <li>Material: High-grade Commercial Standard</li>
                            <li>Warranty: 10 Years</li>
                            <li>Origin: European / Australian Fabric Options</li>
                            <li>Steel: Galvanized & Powder Coated</li>
                        </ul>

                        <div className="bg-teal-50 p-8 rounded-lg border border-teal-100">
                            <h4 className="font-bold mb-2 text-primary text-xl">Interested in this product?</h4>
                            <p className="text-base text-gray-600 mb-6">Get a custom quote for your project today from our engineering team.</p>
                            <Link href="/contact" className="block w-full bg-primary text-white text-center font-bold py-4 rounded hover:bg-teal-700 transition-colors uppercase tracking-wide">
                                Request Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
