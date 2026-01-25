"use client";

import React, { useState } from "react";
import { X, MapPin, ChevronLeft, ChevronRight, Layers, Layout } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/hooks/use-projects";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectQuickViewProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectQuickView = ({ project, isOpen, onClose }: ProjectQuickViewProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!project) return null;

    const images = project.images?.map(img => img.image.url) || [];
    if (project.thumbnail?.url && !images.includes(project.thumbnail.url)) {
        images.unshift(project.thumbnail.url);
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-7xl bg-white rounded-4xl overflow-hidden flex flex-col md:flex-row h-full max-h-[90vh] shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute cursor-pointer top-6 right-6 z-10 p-1 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all md:text-gray-900 md:bg-gray-100 md:hover:bg-gray-200"
                        >
                            <X size={18} />
                        </button>

                        {/* Left Side: Image Slider */}
                        <div className="relative w-full md:w-3/5 h-[400px] md:h-auto bg-gray-900 group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentImageIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="relative w-full h-full"
                                >
                                    {images.length > 0 ? (
                                        <Image
                                            src={images[currentImageIndex]}
                                            alt={project.title}
                                            fill
                                            className="object-contain md:object-cover"
                                            priority
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-700 bg-gray-100">
                                            <Layout size={64} />
                                            <p className="mt-4 font-bold uppercase tracking-widest text-xs">No images available</p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Slider Navigation */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/30 text-white rounded-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/30 text-white rounded-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                                    >
                                        <ChevronRight size={24} />
                                    </button>

                                    {/* Thumbnail Navigation Indicators */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                        {images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImageIndex(idx)}
                                                className={cn(
                                                    "h-1 transition-all duration-300 rounded-full",
                                                    idx === currentImageIndex ? "w-8 bg-white" : "w-2 bg-white/40"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Right Side: Content */}
                        <div className="flex-1 p-6 md:p-8  overflow-y-auto custom-scrollbar flex flex-col bg-white border">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="w-fit flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full uppercase tracking-widest border border-gray-200">
                                        <MapPin size={10} /> {project.location}
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                                        {project.title}
                                    </h2>
                                </div>
                                <div className="w-16 h-1.5 bg-primary rounded-full" />

                                <div className="w-fit px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-widest border border-primary/10">
                                    {project.service?.title || "Project"}
                                </div>

                                <div className="prose prose-lg text-gray-600 max-w-none quill-content capitalize text-[12px]!">
                                    <div dangerouslySetInnerHTML={{ __html: project.description }} />
                                </div>
                            </div>

                            {/* Footer / CTA in modal */}
                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                                <span className="text-xs text-gray-400 font-medium">© {new Date().getFullYear()} DETCO SHADES</span>
                                <Button className="" asChild>
                                    <a href="#quote-section" onClick={onClose}>Request an Estimate</a>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectQuickView;
