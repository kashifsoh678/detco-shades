"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Users } from "lucide-react";
import { PLACEHOLDER_IMAGE } from "@/constants/api";

interface Client {
    id: string;
    name: string;
    imageUrl?: string;
}

interface ClientListProps {
    clients: Client[];
}

const ClientCardItem = ({ client }: { client: Client }) => {
    const [imgSrc, setImgSrc] = useState(client.imageUrl || PLACEHOLDER_IMAGE);

    return (
        <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center h-48 relative overflow-hidden">

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />

            <div className="relative w-full h-full">
                <Image
                    src={imgSrc}
                    alt={client.name}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                    onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
                    sizes="(max-width: 768px) 50vw, 33vw"
                />
            </div>
            {/* Name Tooltip (Optional, or just for accessibility) */}
            <div className="absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-bold text-primary uppercase tracking-wider bg-white/90 px-2 py-1 rounded-full">{client.name}</span>
            </div>
        </div>
    );
};

export default function ClientList({ clients }: ClientListProps) {
    if (clients.length === 0) {
        return (
            <div className="bg-white border border-gray-100 rounded-[3rem] p-24 shadow-xl flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-8 border shadow-inner">
                    <Users size={48} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">
                    No Clients Found
                </h3>
                <p className="text-gray-500 max-w-sm text-lg leading-relaxed">
                    We are currently updating our client list. Please check back soon.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {clients.map((client, idx) => (
                <motion.div
                    key={client.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                    <ClientCardItem client={client} />
                </motion.div>
            ))}
        </div>
    );
}
