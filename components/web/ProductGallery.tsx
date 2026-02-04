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

import { PLACEHOLDER_IMAGE } from "@/constants/api";

// Helper function to detect video platform and get embed URL
const getVideoEmbedInfo = (url: string): { platform: 'youtube' | 'vimeo' | 'direct', embedUrl: string, thumbnailUrl?: string } => {
    // YouTube detection
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
        return {
            platform: 'youtube',
            embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=0&rel=0`,
            thumbnailUrl: `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`
        };
    }

    // Vimeo detection
    const vimeoRegex = /vimeo\.com\/(?:.*\/)?(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
        return {
            platform: 'vimeo',
            embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`
        };
    }

    // Cloudinary detection (simple extension swap)
    if (url.includes('cloudinary.com') && url.includes('/video/upload/')) {
        const thumbUrl = url.replace(/\.[^/.]+$/, ".jpg");
        return {
            platform: 'direct',
            embedUrl: url,
            thumbnailUrl: thumbUrl
        };
    }

    // Direct video file
    return {
        platform: 'direct',
        embedUrl: url
    };
};

const SafeImage = ({ src, alt, className, fill, priority }: { src: string, alt: string, className?: string, fill?: boolean, priority?: boolean }) => {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            fill={fill}
            className={className}
            priority={priority}
            onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
        />
    );
};

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
                    (() => {
                        const videoInfo = getVideoEmbedInfo(activeItem.url);

                        if (videoInfo.platform === 'youtube' || videoInfo.platform === 'vimeo') {
                            return (
                                <iframe
                                    key={videoInfo.embedUrl}
                                    src={videoInfo.embedUrl}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Product video"
                                />
                            );
                        }

                        // Direct video file
                        return (
                            <video
                                key={videoInfo.embedUrl}
                                src={videoInfo.embedUrl}
                                controls
                                className="w-full h-full object-contain"
                                autoPlay
                                muted
                                playsInline
                                disablePictureInPicture
                                disableRemotePlayback
                                controlsList="nodownload"
                                preload="auto"
                                loop
                            >
                                Your browser does not support the video tag.
                            </video>
                        );
                    })()
                ) : (
                    <SafeImage
                        key={activeItem.url} // Re-mount on url change to reset error state
                        src={activeItem.url}
                        alt={activeItem.alt || "Product image"}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-700"
                        priority={activeIndex === 0}
                    />
                )}
            </div>

            {/* Thumbnails */}
            {items.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar snap-x">
                    {items.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={cn(
                                "relative aspect-square w-20 sm:w-24 shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all border-2 snap-start",
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
                                    {/* Priority: Detect Thumbnail > Item Poster */}
                                    {(() => {
                                        const videoInfo = getVideoEmbedInfo(item.url);
                                        const displayThumb = videoInfo.thumbnailUrl || item.poster;
                                        if (displayThumb) {
                                            return <SafeImage src={displayThumb} alt="Video thumbnail" fill className="object-cover opacity-60" />;
                                        }
                                        return null;
                                    })()}
                                </div>
                            ) : (
                                <SafeImage
                                    src={item.url}
                                    alt={item.alt || "Thumbnail"}
                                    fill
                                    className="object-cover"
                                />
                            )
                            }
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGallery;
