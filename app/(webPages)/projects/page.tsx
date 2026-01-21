import React from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';

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
            <div className="relative py-16 md:py-24 bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://placehold.co/1920x600/0f766e/ffffff?text=Our+Projects')] opacity-10 bg-cover bg-center" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Our Projects
                    </h1>
                    <p
                        className="text-teal-100 text-base md:text-xl max-w-2xl mx-auto"
                    >
                        A showcase of our engineering excellence across Saudi Arabia
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            title={project.title}
                            category={project.category}
                            location={project.location}
                            image={project.image}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
