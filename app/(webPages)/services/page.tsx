"use client";
import { Service } from '@/db/schema';
import { useServices } from '@/hooks/use-services';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
    const { servicesQuery } = useServices();
    const { data: servicesData, isLoading } = servicesQuery;
    const services: Service[] = servicesData?.data || [];

    // const servicesData = await db.query.services.findMany({
    //     where: eq(services.isActive, true),
    //     with: {
    //         coverImage: true,
    //     },
    //     orderBy: [desc(services.order)],
    // });

    return (
        <main className="min-h-screen bg-white ">
            {/* Hero Section */}
            <div className="relative py-16 md:py-24 lg:py-28 bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://placehold.co/1920x600/0f766e/ffffff?text=Our+Products')] opacity-10 bg-cover bg-center" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Our Services
                    </h1>
                    <p className="text-teal-100 text-base md:text-xl max-w-2xl mx-auto">
                        End-to-end tensile structure solutions from concept to completion.
                    </p>
                </div>
            </div>
            {/* Services Grid */}
            <div className="container mx-auto px-4 -mt-10 relative z-20 pb-24">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="h-[250px] bg-gray-50 animate-pulse rounded-[2.5rem] border border-gray-100"
                            />
                        ))}
                    </div>
                ) : services.length === 0 ? (
                    <div className="bg-white border border-gray-100 rounded-[3rem] p-24 shadow-xl flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-8 border shadow-inner">
                            <LucideIcons.Layers size={48} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Services under construction</h3>
                        <p className="text-gray-500 max-w-sm text-lg leading-relaxed">
                            Our services will be updated soon. Stay tuned!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services?.map((service) => {
                            const Icon = (LucideIcons as any)[service.iconName] || HelpCircle;
                            return (
                                <Link
                                    key={service.id}
                                    href={`/services/${service.slug}`}
                                    className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                            <Icon size={28} strokeWidth={1.5} />
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors capitalize">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed mb-8 line-clamp-3 capitalize">
                                            {service.shortDescription}
                                        </p>

                                        <div className="flex items-center text-primary font-bold text-sm tracking-wide group-hover:gap-2 transition-all">
                                            LEARN MORE
                                            <ArrowRight size={16} className="ml-2 group-hover:ml-0" />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

            </div>

            {/* CTA Section */}
            <div className="bg-teal-50 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Need a Custom Solution?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Our engineering team can tackle unique challenges. Contact us to discuss your specific requirements.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center bg-primary text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-teal-700 transition-all transform hover:-translate-y-1"
                    >
                        Request Consultation
                    </Link>
                </div>
            </div>
        </main>
    );
}
