"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Client {
    name: string;
    logo: string;
}

interface ClientsTickerProps {
    clients: Client[];
}

export default function ClientsTicker({ clients }: ClientsTickerProps) {
    if (!clients || clients.length === 0) return null;

    // Duplicate list for seamless loop - ensuring enough items for a continuous animation
    const allClients = [...clients, ...clients, ...clients, ...clients];

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
                    animate={{ x: [0, -2000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 60,
                            ease: "linear",
                        },
                    }}
                >
                    {allClients.map((client, index) => (
                        <div
                            key={`${client.name}-${index}`}
                            className="relative w-[120px] h-[50px] md:w-[150px] md:h-[60px] shrink-0 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                        >
                            {client.logo ? (
                                <Image
                                    src={client.logo}
                                    alt={client.name}
                                    fill
                                    sizes="(max-width: 768px) 120px, 150px"
                                    className="object-contain"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-xs border border-dashed border-gray-200 rounded">
                                    {client.name}
                                </div>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
