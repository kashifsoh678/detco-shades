import React from 'react';
import Link from 'next/link';

// Detailed project placeholders based on analysis style
const projects = [
    { id: 1, title: 'PVC Sunshades for Alqunfotha Governorate', location: 'Alqunfotha', category: 'Car Parking', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Project+1' },
    { id: 2, title: 'Tensile Structure for University Stadium', location: 'Riyadh', category: 'Tensile', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Project+2' },
    { id: 3, title: 'Walkway Shades for Public Hospital', location: 'Jeddah', category: 'Walk Shade', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Project+3' },
    { id: 4, title: 'School Courtyard Shading', location: 'Dammam', category: 'Schools', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Project+4' },
    { id: 5, title: 'Swimming Pool Sail Shades', location: 'Khobar', category: 'Sails', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Project+5' },
    { id: 6, title: 'Mall Entrance Canopy', location: 'Jubail', category: 'Entrance', image: 'https://placehold.co/600x400/e0e0e0/006666?text=Project+6' },
];

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="bg-primary py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-white">Completed Projects</h1>
                    <p className="text-teal-100 mt-2">A showcase of our engineering excellence across Saudi Arabia</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                            <div className="relative h-64 bg-gray-200">
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${project.image}')` }}></div>
                                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-xs font-bold text-primary rounded-full">
                                    {project.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                                <p className="flex items-center text-gray-500 text-sm mb-4">
                                    <span className="mr-1">📍</span> {project.location}
                                </p>
                                <Link href="/contact" className="text-primary font-bold text-sm hover:underline">
                                    REQUEST SIMILAR &rarr;
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
