"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const clients = [
    { name: "Aramco", logo: "https://placehold.co/150x60/transparent/006666?text=Aramco" },
    { name: "SABIC", logo: "https://placehold.co/150x60/transparent/006666?text=SABIC" },
    { name: "Ministry of Health", logo: "https://placehold.co/150x60/transparent/006666?text=MOH" },
    { name: "Riyadh Metro", logo: "https://placehold.co/150x60/transparent/006666?text=Riyadh+Metro" },
    { name: "King Saud University", logo: "https://placehold.co/150x60/transparent/006666?text=KSU" },
    { name: "Al Marai", logo: "https://placehold.co/150x60/transparent/006666?text=Al+Marai" },
    { name: "STC", logo: "https://placehold.co/150x60/transparent/006666?text=STC" },
    { name: "SEC", logo: "https://placehold.co/150x60/transparent/006666?text=SEC" },
    { name: "Bin Laden Group", logo: "https://placehold.co/150x60/transparent/006666?text=Bin+Laden" },
    { name: "Red Sea Global", logo: "https://placehold.co/150x60/transparent/006666?text=Red+Sea" },
];

// Duplicate list for seamless loop
const allClients = [...clients, ...clients, ...clients];

export default function ClientsTicker() {
    return (
        <section className="py-16 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="container mx-auto px-4 mb-10 text-center">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Trusted By</p>
            </div>

            <div
                className="flex relative overflow-hidden"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                }}
            >
                <motion.div
                    className="flex gap-12 md:gap-24 items-center whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear",
                        },
                    }}
                >
                    {allClients.map((client, index) => (
                        <div
                            key={`${client.name}-${index}`}
                            className="relative w-[120px] h-[50px] md:w-[150px] md:h-[60px] shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                        >
                            <Image
                                src={client.logo}
                                alt={client.name}
                                fill
                                sizes="(max-width: 768px) 120px, 150px"
                                className="object-contain"
                                unoptimized // Using remote placehold.co images
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
