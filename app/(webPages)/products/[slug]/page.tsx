import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Phone, Mail } from 'lucide-react';
import { db } from '@/db';
import { products, productImages, productSpecs, productBenefits, productFaqs } from '@/db/schema/products';
import { eq, desc } from 'drizzle-orm';
import ProductGallery from '@/components/web/ProductGallery';
import ProductFAQ from '@/components/ProductFAQ';

// 1. Dynamic Metadata Generation for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = await db.query.products.findFirst({
        where: eq(products.slug, slug),
        with: {
            thumbnail: true,
            coverImage: true,
        },
    });

    if (!product) {
        return {
            title: 'Product Not Found | Detco',
        };
    }

    return {
        title: `${product.title} | Detco Shades`,
        description: product.shortDescription,
        openGraph: {
            title: product.title,
            description: product.shortDescription,
            images: product.thumbnail?.url ? [product.thumbnail.url] : undefined,
        },
    };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch Product with all relations
    const product = await db.query.products.findFirst({
        where: eq(products.slug, slug),
        with: {
            thumbnail: true,
            coverImage: true,
            video: true,
            images: {
                with: { image: true },
                orderBy: (productImages, { asc }) => [asc(productImages.order)],
            },
            specs: {
                orderBy: (productSpecs, { asc }) => [asc(productSpecs.order)],
            },
            benefits: {
                orderBy: (productBenefits, { asc }) => [asc(productBenefits.order)],
            },
            faqs: {
                orderBy: (productFaqs, { asc }) => [asc(productFaqs.order)],
            },
        },
    });

    if (!product) {
        return notFound();
    }

    // Construct Media Items for Gallery
    const galleryItems: any[] = [];

    // 1. Images from Gallery
    if (product.images && product.images.length > 0) {
        product.images.forEach((imgRelation) => {
            if (imgRelation.image?.url) {
                galleryItems.push({
                    type: 'image',
                    url: imgRelation.image.url,
                    alt: product.title,
                });
            }
        });
    } else if (product.thumbnail?.url) {
        // Fallback to thumbnail if no gallery
        galleryItems.push({
            type: 'image',
            url: product.thumbnail.url,
            alt: product.title,
        });
    }

    // 2. Video (Append at the end or beginning based on preference, user said "add a video url in the list of images")
    // Let's add it at the end
    // Support both uploaded videos (product.video?.url) and manual URLs (product.videoUrl)
    const videoUrl = product.videoUrl || product.video?.url;
    if (videoUrl) {
        galleryItems.push({
            type: 'video',
            url: videoUrl,
            // Removed fallback to product images as poster to avoid confusion
            // ProductGallery now auto-detects thumbnails for YouTube/Cloudinary
        });
    }

    const heroImage = product.coverImage?.url || 'https://placehold.co/1920x600/0f766e/ffffff?text=Detco+Shades';

    return (
        <main className="min-h-screen bg-white">

            {/* --- HERO SECTION --- */}
            <div className="relative min-h-[400px] flex items-center bg-primary overflow-hidden py-20">
                {/* Hero Background with Cover Image if available */}
                <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: `url('${heroImage}')` }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center flex-wrap gap-2 text-sm text-teal-200 mb-6 font-medium tracking-wide uppercase">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                            <span>/</span>
                            <span className="text-white border-b border-teal-400">{product.title}</span>
                        </div>
                        {/* H1: Primary Keyword Target */}
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 shadow-sm leading-tight">
                            {product.title}
                        </h1>
                        <p className="text-xl text-teal-50 max-w-2xl font-light">
                            {product.shortDescription}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* --- LEFT COLUMN (Gallery & Key Info) --- */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* Image Gallery */}
                        <ProductGallery items={galleryItems} />

                        {/* PROSE DESCRIPTION */}
                        <div className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-primary max-w-none">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                                Product Overview
                            </h2>
                            <div dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>

                        {/* KEY ADVANTAGES (Specs) - Moved from Sidebar */}
                        {product.specs && product.specs.length > 0 && (
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Advantages</h3>
                                <ul className="space-y-4">
                                    {product.specs.map((spec, idx) => (
                                        <li key={idx} className="flex gap-3 items-start last:border-0 last:pb-0">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300  shrink-0" />
                                                <span className="font-bold text-primary mr-1 capitalize ">{spec.title}</span>
                                            </div>
                                            <p className="text-gray-600 leading-relaxed">
                                                {spec.description}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* KEY BENEFITS (Benefits) - Redesigned Grid */}
                        {product.benefits && product.benefits.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    {product.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                            <span className="font-medium text-gray-800 text-lg">{benefit.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* FAQ Section */}
                        {product.faqs && product.faqs.length > 0 && (
                            <ProductFAQ items={product.faqs} />
                        )}
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
                                        href={`/contact?product=${product.slug}`}
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


                            {/* Applications Badges */}
                            {product.applications && product.applications.length > 0 && (
                                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Recommended For</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.applications.map((app, idx) => (
                                            <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 text-xs font-bold rounded-lg border border-gray-200 shadow-sm">
                                                <CheckCircle2 size={12} className="text-primary" />
                                                {app}
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
