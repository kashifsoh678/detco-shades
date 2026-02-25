import React from 'react'

const PageBanner = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return (
        <div className="relative py-16 md:py-24 lg:py-28 bg-primary overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    {title}
                </h1>
                <p className="text-white text-base md:text-xl max-w-2xl mx-auto">
                    {subtitle}
                </p>
            </div>
        </div>
    )
}

export default PageBanner