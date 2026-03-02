"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cloudinaryLoader from '@/lib/image-loader'

const DetailPageHeroBanner = ({ heroImage, parentRoute = "products", data }: { heroImage?: string; parentRoute: string; data: any }) => {
    return (
        <div className="relative min-h-[400px] flex items-center bg-primary overflow-hidden py-20">
            {/* Hero Background with Cover Image if available */}
            {heroImage && (
                <div className="absolute inset-0 opacity-20">
                    <Image
                        loader={heroImage.includes('res.cloudinary.com') ? cloudinaryLoader : undefined}
                        src={heroImage}
                        alt={data.title}
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="100vw"
                    />
                </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-max">
                    <div className="flex items-center flex-wrap gap-2 text-sm text-teal-200 mb-6 font-medium tracking-wide uppercase">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link href={`/${parentRoute.toLowerCase()}`} className="hover:text-white transition-colors capitalize">{parentRoute}</Link>
                        <span>/</span>
                        <span className="text-white border-b border-teal-400">{data.title}</span>
                    </div>
                    {/* H1: Primary Keyword Target */}
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 shadow-sm leading-tight">
                        {data.title}
                    </h1>
                    <p className="text-md text-white  font-light capitalize">
                        {data.shortDescription}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DetailPageHeroBanner