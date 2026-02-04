import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ArrowLeft, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import HeroRFQForm from '@/components/HeroRFQForm';
import { db } from '@/db';
import { services } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';

// 1. Generate Static Params for SSG (Optional, but good for performance)
export async function generateStaticParams() {
    const allServices = await db.query.services.findMany({
        where: eq(services.isActive, true),
        columns: { slug: true }
    });
    return allServices.map((service) => ({
        slug: service.slug,
    }));
}

// 2. Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const service = await db.query.services.findFirst({
        where: eq(services.slug, slug),
    });

    if (!service) {
        return { title: 'Service Not Found' };
    }

    return {
        title: `${service.title} | Detco Services`,
        description: service.shortDescription,
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await db.query.services.findFirst({
        where: eq(services.slug, slug),
        with: {
            coverImage: true,
        }
    });

    if (!service) {
        notFound();
    }

    const Icon = (LucideIcons as any)[service.iconName] || HelpCircle;

    return (
        <main className="min-h-screen bg-white">
            {/* --- HERO SECTION --- */}
            <div className="relative min-h-[400px] flex items-center bg-primary overflow-hidden py-20">
                {service.coverImage?.url ? (
                    <Image
                        src={service.coverImage.url}
                        alt={service.title}
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-primary opacity-10" />
                )}

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <Link href="/services" className="inline-flex items-center text-teal-200 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-wide gap-2">
                            <ArrowLeft size={16} />
                            Back to Services
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm border border-white/20">
                                <Icon size={32} strokeWidth={1.5} />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white shadow-sm">
                                {service.title}
                            </h1>
                        </div>

                        <p className="text-xl text-teal-50 max-w-2xl font-light leading-relaxed">
                            {service.shortDescription}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* --- LEFT COLUMN: Content --- */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Overview / Details from Quill */}
                        <div className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 text-gray-600 max-w-none prose-primary">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
                            <div
                                className="quill-content leading-relaxed   "
                                dangerouslySetInnerHTML={{ __html: service.details }}
                            />
                        </div>

                        {/* Key Features Grid */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="flex  gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <CheckCircle2 className="text-primary shrink-0 mt-[2px]" size={20} />
                                        <span className="capitalize font-medium text-gray-800">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Process Steps */}
                        {service.processSteps && service.processSteps.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Process</h3>
                                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                                    {service.processSteps.map((step, idx) => (
                                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-teal-50 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                                <span className="font-bold text-sm">{idx + 1}</span>
                                            </div>

                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                                <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                                                <p className="text-gray-500 text-sm">{step.description}</p>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* --- RIGHT COLUMN: Sidebar --- */}
                    <div className="lg:col-span-4 space-y-8 relative">
                        <div className="sticky top-24">
                            <div className="bg-gray-900 rounded-3xl p-1 shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm z-0" />
                                <div className="relative z-10">
                                    <HeroRFQForm serviceId={service.id} />
                                </div>
                            </div>

                            <div className="mt-8 bg-teal-50 rounded-3xl p-8 border border-white shadow-sm text-center">
                                <h3 className="font-bold text-gray-900 mb-2">Need direct assistance?</h3>
                                <p className="text-gray-600 text-sm mb-6">Our engineers are available 24/7 for consultation.</p>
                                <a href="tel:+966500000000" className="inline-flex items-center justify-center w-full py-3 bg-white text-primary font-bold rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                                    Call +966 50 000 0000
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
