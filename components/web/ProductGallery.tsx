"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Pause, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaItem {
    type: "image" | "video";
    url: string;
    alt?: string;
    poster?: string; // For video thumbnail
}

interface ProductGalleryProps {
    items: MediaItem[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeItem = items[activeIndex];

    if (!items.length) {
        return (
            <div className="relative h-[300px] sm:h-[500px] w-full rounded-3xl bg-gray-100 flex items-center justify-center text-gray-400">
                <ImageIcon size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Main Media Viewer */}
            <div className="relative h-[300px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl group border border-gray-100 bg-black">
                {activeItem.type === "video" ? (
                    <video
                        src={activeItem.url}
                        poster={activeItem.poster}
                        controls
                        className="w-full h-full object-contain"
                        autoPlay={false}
                    />
                ) : (
                    <Image
                        src={activeItem.url}
                        alt={activeItem.alt || "Product image"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority={activeIndex === 0}
                    />
                )}
            </div>

            {/* Thumbnails */}
            {items.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                    {items.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={cn(
                                "relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all border-2",
                                activeIndex === idx
                                    ? "border-primary ring-2 ring-primary/20 ring-offset-2 scale-95"
                                    : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                            )}
                        >
                            {item.type === "video" ? (
                                <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                                            <Play size={16} className="text-white fill-white" />
                                        </div>
                                    </div>
                                    {/* Optional: Use a poster image if available for the thumbnail too */}
                                    {item.poster && (
                                        <Image src={item.poster} alt="Video thumbnail" fill className="object-cover opacity-60" />
                                    )}
                                </div>
                            ) : (
                                <Image
                                    src={item.url}
                                    alt={item.alt || "Thumbnail"}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGallery;
