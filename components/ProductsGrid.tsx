import React from 'react';
import Link from 'next/link';

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

export default function ProductsGrid() {
    return (
        <section className="py-16 bg-gray-50 mb-16">
            <div className="container mx-auto px-4">
                {/* <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
                    OUR <span className="text-primary">PRODUCTS</span>
                </h2> */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Link
                            href={`/products/${product.id}`}
                            key={product.id}
                            className="group block relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow rounded-sm"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <div
                                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                                    style={{ backgroundImage: `url('${product.image}')` }}
                                ></div>
                            </div>

                            {/* Label Bar */}
                            <div className="bg-primary text-white text-center py-4 px-2">
                                <h3 className="text-sm font-bold uppercase tracking-wider">{product.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
