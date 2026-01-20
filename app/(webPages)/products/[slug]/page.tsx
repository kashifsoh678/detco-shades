import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { productsMap } from '@/data/products';
import { ArrowRight, CheckCircle2, Phone, Mail } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ProductFAQ from '@/components/ProductFAQ';

// 1. Dynamic Metadata Generation for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = productsMap[slug];

    if (!product) {
        return {
            title: 'Product Not Found | Detco',
        };
    }

    return {
        title: product.metaTitle,
        description: product.metaDescription,
        openGraph: {
            title: product.metaTitle,
            description: product.metaDescription,
            // images: [product.images[0]?.src], // Uncomment when real images are ready
        },
    };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = productsMap[slug];

    if (!product) {
        return notFound();
    }

    // Fallback for minimal data products
    const images = product.images?.length > 0 ? product.images : [{ src: 'https://placehold.co/800x600/e0e0e0/006666?text=Coming+Soon', alt: product.name }];
    const applications = product.applications || [];
    const specs = product.specifications || [];
    const benefits = product.benefits || [];
    const faq = product.faq || [];

    return (
        <main className="min-h-screen bg-white">

            {/* --- HERO SECTION --- */}
            <div className="relative min-h-[400px] flex items-center bg-primary overflow-hidden py-20">
                <div className="absolute inset-0 bg-[url('https://placehold.co/1920x600/0f766e/ffffff?text=Fabric+Pattern')] opacity-10 bg-cover bg-center" />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-2 text-sm text-teal-200 mb-6 font-medium tracking-wide uppercase">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                            <span>/</span>
                            <span className="text-white border-b border-teal-400">{product.name}</span>
                        </div>
                        {/* H1: Primary Keyword Target */}
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 shadow-sm leading-tight">
                            {product.name}
                        </h1>
                        <p className="text-xl text-teal-50 max-w-2xl font-light">
                            {product.shortDescription || "Engineered for durability and aesthetic excellence in the Saudi climate."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* --- LEFT COLUMN (Gallery & Key Info) --- */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* Image Gallery */}
                        <div className="space-y-6">
                            <div className="relative h-[300px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl group border border-gray-100">
                                <Image
                                    src={images[0].src}
                                    alt={images[0].alt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                            </div>
                            {images.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {images.slice(1, 5).map((img, idx) => (
                                        <div key={idx} className="relative aspect-4/3 rounded-xl overflow-hidden cursor-pointer hover:ring-2 ring-primary ring-offset-2 transition-all opacity-90 hover:opacity-100">
                                            <Image src={img.src} alt={img.alt} fill className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-primary max-w-none">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                                Product Overview
                            </h2>
                            <ReactMarkdown>{product.mainDescription}</ReactMarkdown>
                        </div>

                        {/* Benefits Grid */}
                        {benefits.length > 0 && (
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                    Key Benefits
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                            <span className="text-lg font-medium text-gray-900">{benefit.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}


                        {/* FAQ Section */}
                        <ProductFAQ items={faq} />
                    </div>

                    {/* --- RIGHT COLUMN (Sticky Sidebar) --- */}
                    <div className="lg:col-span-4 space-y-8 relative">
                        <div className="sticky top-24 space-y-8">

                            {/* CTA Box (Primary Focus) */}
                            <div className="bg-linear-to-br from-teal-900 to-teal-800 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl group-hover:bg-teal-400/30 transition-all duration-700" />

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-3">Request Quote</h3>
                                    <p className="text-teal-100 mb-8 text-sm leading-relaxed">
                                        Get a detailed technical proposal and price estimate for your project in 24 hours.
                                    </p>

                                    <Link
                                        href="/contact?product=hdpe"
                                        className="flex items-center justify-center w-full bg-white text-teal-900 font-bold py-4 rounded-xl hover:bg-teal-50 hover:scale-[1.02] shadow-lg transition-all duration-300"
                                    >
                                        GET FREE ESTIMATE
                                        <ArrowRight size={18} className="ml-2" />
                                    </Link>

                                    <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                                        <div className="flex items-center gap-4 text-sm group/item">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/item:bg-primary transition-colors"><Phone size={18} /></div>
                                            <span className="font-medium">+966 50 000 0000</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm group/item">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/item:bg-primary transition-colors"><Mail size={18} /></div>
                                            <span className="font-medium">sales@detco.sa</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Specifications */}
                            {specs.length > 0 && (
                                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Technical Specs</h3>
                                    <ul className="space-y-4">
                                        {specs.map((spec, idx) => (
                                            <li key={idx} className="flex flex-col pb-4 border-b border-gray-50 last:border-0 last:pb-0 gap-1">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{spec.label}</span>
                                                <span className="text-gray-800 font-medium">{spec.value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Applications Badges */}
                            {applications.length > 0 && (
                                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Recommended For</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {applications.map((app, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 text-xs font-bold rounded-lg border border-gray-200 shadow-sm">
                                                <CheckCircle2 size={12} className="text-primary" />
                                                {app.title}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
