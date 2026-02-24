import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { clients } from '@/db/schema/clients';
import { eq, desc, asc } from 'drizzle-orm';
import ClientList from '@/components/web/ClientList';
import PageBanner from '@/components/web/PageBanner';

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
            <PageBanner title="Our Clients" subtitle="Trusted by leading organizations across the Kingdom." />
            {/* Clients Grid */}
            <div className="container mx-auto px-4 -mt-10 relative z-20 pb-24">
                {/* Card Container for styling consistency if needed, but the grid handles it well */}
                <ClientList clients={formattedClients} />
            </div>


        </main>
    );
}
