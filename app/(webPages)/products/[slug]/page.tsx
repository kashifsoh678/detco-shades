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
import DetailPageHeroBanner from '@/components/web/DetailPageHeroBanner';

function normalizeQuillHtml(html: string | null | undefined) {
    if (!html) return '';

    // Text pasted from PDFs/Word often includes zero-width spaces or soft hyphens
    // that cause strange mid-word wrapping in the browser.
    const cleaned = html
        // Tag-based word break opportunities
        .replace(/<wbr\s*\/?>/gi, '')
        // Unicode characters that introduce break opportunities / artifacts
        .replace(/[\u200B\u200C\u200D\u2060\uFEFF]/g, '') // zwsp/zwnj/zwj/word-joiner/bom
        .replace(/\u00AD/g, '') // soft hyphen
        // Common HTML entities for the same characters
        .replace(/&(?:shy|ZeroWidthSpace);/gi, '')
        .replace(/&#(?:173|8203);/g, '')
        .replace(/&#x(?:00ad|200b);/gi, '');

    // Prevent breaking at literal hyphens inside words (e.g. "precision-engineered").
    // We only apply this to text outside HTML tags to avoid corrupting attributes/classes.
    return cleaned
        .split(/(<[^>]+>)/g)
        .map((part) => {
            if (part.startsWith('<')) return part;
            // Non-breaking hyphen between letters or digits, e.g. "precision-engineered", "95-99"
            return part.replace(/([A-Za-z0-9])\-([A-Za-z0-9])/g, '$1\u2011$2');
        })
        .join('');
}

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

    const heroImage = product.coverImage?.url || product.thumbnail?.url || 'https://placehold.co/1920x600/0f766e/ffffff?text=Detco+Shades';
    const safeDescriptionHtml = normalizeQuillHtml(product.description);

    return (
        <main className="min-h-screen bg-white">

            {/* --- HERO SECTION --- */}
            <DetailPageHeroBanner heroImage={heroImage} parentRoute="products" data={product} />

            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* --- LEFT COLUMN (Gallery & Key Info) --- */}
                    <div className="lg:col-span-8 space-y-16">

                        {/* Image Gallery */}
                        <ProductGallery items={galleryItems} />

                        {/* PROSE DESCRIPTION */}
                        <section className="max-w-none">
                            {/* Section heading (outside prose) */}
                            <h2 className="mb-6 text-4xl md:text-5xl font-bold text-gray-900">
                                Product Overview
                            </h2>

                            {/* Quill rendered content */}
                            <div
                                className="
                                    quill-content
                                    prose
                                    prose-lg
                                    prose-gray
                                    max-w-none
                                    prose-headings:font-semibold
                                    prose-headings:text-gray-900
                                    prose-p:text-gray-800
                                    prose-li:text-gray-800
                                    prose-strong:text-primary
                                    prose-a:text-primary
                                    prose-a:underline
                                    dark:prose-invert
                                    dark:prose-headings:text-gray-100
                                    "
                                dangerouslySetInnerHTML={{ __html: safeDescriptionHtml }}
                            />
                        </section>


                        {/* KEY ADVANTAGES (Specs) - Moved from Sidebar */}
                        {product.specs && product.specs.length > 0 && (
                            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Advantages</h3>
                                <ul className="space-y-2 ">
                                    {product.specs.map((spec, idx) => (
                                        <li key={idx} className="flex flex-col gap-2   last:border-0 last:pb-0">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary   shrink-0" />
                                                <span className="font-bold text-primary mr-1 capitalize whitespace-nowrap text-lg ">{spec.title} :</span>
                                            </div>
                                            <p className="text-gray-600 leading-relaxed text-md font-medium pl-4">
                                                {spec.description}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* KEY BENEFITS (Benefits) - Redesigned Grid */}
                        {product.benefits && product.benefits.length > 0 && (
                            <div className=''>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h3>
                                <div className="grid grid-cols-1 gap-x-8 gap-y-4">
                                    {product.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
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
                        <div className="sticky top-42 space-y-8">

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
                                            <span className="font-medium">+966590391128</span>
                                            <span className="font-medium">+966530275784</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm group/item">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/item:bg-primary transition-colors"><Mail size={18} /></div>
                                            <span className="font-medium">detcoshade@gmail.com</span>
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
                                            <span key={idx} className="inline-flex capitalize items-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 text-xs font-bold rounded-lg border border-gray-200 shadow-sm">
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
