"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import ProjectQuickView from '@/components/ProjectQuickView';
import { useProjects, Project } from '@/hooks/use-projects';
import { Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProjectsPage() {
    const { projectsQuery } = useProjects();
    const { data: projectsData, isLoading } = projectsQuery;
    const projects: Project[] = projectsData?.data || [];

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const handleQuickView = (project: Project) => {
        setSelectedProject(project);
        setIsQuickViewOpen(true);
    };

    return (
        <main className="min-h-screen bg-white pb-24">
            {/* Header */}
            <div className="relative py-16 md:py-24 lg:py-28 bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://placehold.co/1920x600/0f766e/ffffff?text=Our+Products')] opacity-10 bg-cover bg-center" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Our Projects
                    </h1>
                    <p className="text-teal-100 text-base md:text-xl max-w-2xl mx-auto">
                        Engineering excellence across Saudi Arabia. Discover our architectural sunshade solutions.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="h-[450px] bg-gray-50 animate-pulse rounded-[2.5rem] border border-gray-100"
                            />
                        ))}
                    </div>
                ) : projects.length === 0 ? (
                    <div className="bg-white border border-gray-100 rounded-[3rem] p-24 shadow-xl flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-8 border shadow-inner">
                            <Layers size={48} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Gallery under construction</h3>
                        <p className="text-gray-500 max-w-sm text-lg leading-relaxed">
                            We are currently updating our project portfolio. Please check back later or contact us for recent works.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                id={project.id}
                                title={project.title}
                                service={project.service?.title || "Project"}
                                location={project.location}
                                thumbnail={project.thumbnail?.url || ""}
                                index={index}
                                onQuickView={() => handleQuickView(project)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Project Quick View Modal */}
            <ProjectQuickView
                project={selectedProject}
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
            />
        </main>
    );
}
