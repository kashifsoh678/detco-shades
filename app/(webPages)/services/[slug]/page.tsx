import HeroRFQForm from '@/components/HeroRFQForm';
import DetailPageHeroBanner from '@/components/web/DetailPageHeroBanner';
import { db } from '@/db';
import { services } from '@/db/schema';
import { eq } from 'drizzle-orm';
import * as LucideIcons from 'lucide-react';
import { CheckCircle2, HelpCircle } from 'lucide-react';
import { notFound } from 'next/navigation';

function normalizeQuillHtml(html: string | null | undefined) {
    if (!html) return '';

    // Strip explicit word-break hints and invisible characters that can split words mid-letter
    const cleaned = html
        // Tag-based word break opportunities
        .replace(/<wbr\s*\/?>/gi, '')
        // Zero-width characters / word joiners / BOM
        .replace(/[\u200B\u200C\u200D\u2060\uFEFF]/g, '')
        .replace(/\u00AD/g, '') // soft hyphen
        // HTML entities for the same characters
        .replace(/&(?:shy|ZeroWidthSpace);/gi, '')
        .replace(/&#(?:173|8203);/g, '')
        .replace(/&#x(?:00ad|200b);/gi, '');

    // Prevent breaking at literal hyphens inside words or numeric ranges (e.g. "precision-engineered", "95-99")
    // Only modify text nodes (leave tags/attributes intact).
    return cleaned
        .split(/(<[^>]+>)/g)
        .map((part) => {
            if (part.startsWith('<')) return part;
            return part.replace(/([A-Za-z0-9])\-([A-Za-z0-9])/g, '$1\u2011$2'); // non-breaking hyphen
        })
        .join('');
}

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
    const safeDetailsHtml = normalizeQuillHtml(service.details);

    return (
        <main className="min-h-screen bg-white">
            {/* --- HERO SECTION --- */}
            <DetailPageHeroBanner heroImage={service.coverImage?.url} parentRoute="services" data={service} />


            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* --- LEFT COLUMN: Content --- */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Overview / Details from Quill */}
                        <div className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 text-gray-600 max-w-none prose-primary">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
                            <div
                                className="quill-content leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: safeDetailsHtml }}
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
                        <div className="sticky top-42">
                            <div className="bg-gray-900 rounded-3xl p-1 shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm z-0" />
                                <div className="relative z-10">
                                    <HeroRFQForm serviceId={service.id} />
                                </div>
                            </div>

                            <div className="mt-8 bg-teal-50 rounded-3xl p-8 border border-white shadow-sm text-center">
                                <h3 className="font-bold text-gray-900 mb-2">Need direct assistance?</h3>
                                <p className="text-gray-600 text-sm mb-6">Our engineers are available 24/7 for consultation.</p>
                                <a href="tel:+966590391128" className="mb-4 inline-flex items-center justify-center w-full py-3 bg-white text-primary font-bold rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                                    Call +966590391128
                                </a>
                                <a href="tel:+966530275784" className="inline-flex items-center justify-center w-full py-3 bg-white text-primary font-bold rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                                    Call +966530275784
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
