import React from 'react';

// Placeholder client data based on analysis
const clients = [
    'Saudi Aramco', 'IKEA', 'SABIC', 'Ma\'aden', 'Saudia',
    'Ministry of Health', 'Saudi Binladin Group', 'Mercedes-Benz',
    'Emaar', 'InterContinental Hotels', 'Ministry of Education', 'Al Maraim'
];

export default function ClientsPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="relative py-16 md:py-24 bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://placehold.co/1920x600/0f766e/ffffff?text=Our+Clients')] opacity-10 bg-cover bg-center" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        Our Clients
                    </h1>
                    <p
                        className="text-teal-100 text-base md:text-xl max-w-2xl mx-auto"
                    >
                        Trusted by leading organizations across the Kingdom
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="group flex items-center justify-center p-8 border border-gray-100 rounded-lg hover:shadow-lg transition-all bg-white"
                        >
                            {/* Logo Placeholder - Grayscale to Color hover effect simulated with opacity */}
                            <div className="text-center">
                                <div className="w-32 h-20 bg-gray-100 mx-auto mb-4 flex items-center justify-center text-gray-400 font-bold group-hover:bg-teal-50 group-hover:text-primary transition-colors">
                                    LOGO
                                </div>
                                <span className="font-semibold text-gray-700 group-hover:text-primary transition-colors">{client}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-gray-50 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Our Prestigious Client List</h2>
                    <p className="text-gray-600 mb-6">Contact us today to discuss how we can add value to your next project.</p>
                    <a href="/contact" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded hover:bg-teal-700 transition-colors">
                        WORK WITH US
                    </a>
                </div>
            </div>
        </main>
    );
}
