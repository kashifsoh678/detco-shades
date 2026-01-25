import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { clients } from '@/db/schema/clients';
import { eq, desc, asc } from 'drizzle-orm';
import ClientList from '@/components/web/ClientList';

export const revalidate = 0;

export default async function ClientsPage() {
    // Fetch active clients
    const clientsData = await db.query.clients.findMany({
        where: eq(clients.isActive, true),
        with: {
            image: true,
        },
        orderBy: [asc(clients.order), desc(clients.createdAt)],
    });

    // Transform for UI
    const formattedClients = clientsData.map(c => ({
        id: c.id,
        name: c.name,
        imageUrl: c.image?.url,
    }));

    return (
        <main className="min-h-full bg-white">
            {/* Hero Section */}
            <div className="relative py-16 md:py-24 lg:py-28 bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://placehold.co/1920x600/0f766e/ffffff?text=Our+Clients')] opacity-10 bg-cover bg-center" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Our Clients
                    </h1>
                    <p className="text-teal-100 text-base md:text-xl max-w-2xl mx-auto">
                        Trusted by leading organizations across the Kingdom.
                    </p>
                </div>
            </div>

            {/* Clients Grid */}
            <div className="container mx-auto px-4 -mt-10 relative z-20 pb-24">
                {/* Card Container for styling consistency if needed, but the grid handles it well */}
                <ClientList clients={formattedClients} />
            </div>


        </main>
    );
}
