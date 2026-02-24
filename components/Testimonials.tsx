"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        quote: "Detco provided exceptional service for our mall parking project. The quality of the tensile fabric is outstanding and the installation was completed on schedule.",
        author: "Ahmed Al-Sayed",
        role: "Project Manager, Red Sea Mall",
        rating: 5
    },
    {
        quote: "We chose Detco for our school courtyard shades because of their safety standards and engineering expertise. Highly recommended.",
        author: "Sarah Johnson",
        role: "Principal, International School",
        rating: 5
    },
    {
        quote: "Professional team, competitive pricing, and high-quality finish. The car parking shades have transformed our residential compound.",
        author: "Mohammad Al-Ghamdi",
        role: "Property Manager",
        rating: 5
    },
    {
        quote: "The team at Detco exceeded our expectations. Their architectural elegance and structural integrity are unmatched in the region.",
        author: "Khaled Al-Harbi",
        role: "Head of Infrastructure",
        rating: 5
    },
    {
        quote: "Reliable and professional. Their sun control solutions have significantly improved our outdoor leisure areas.",
        author: "Fatima Al-Zahrani",
        role: "Luxury Villa Owner",
        rating: 5
    }
];

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Testimonials() {
    return (
        <section className="relative py-24 bg-primary overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-white font-bold tracking-widest uppercase text-sm mb-3 block">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        What Our Clients Say
                    </h2>
                    <div className="w-20 h-1 bg-white/30 mx-auto rounded-full"></div>
                </div>

                <div className="testimonials-slider">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="pb-12"
                    >
                        {testimonials.map((item, index) => (
                            <SwiperSlide key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 relative h-full flex flex-col "
                                >
                                    <Quote className="absolute top-6 right-6 text-white/10 w-12 h-12" />

                                    <div className="flex gap-1 mb-6 text-yellow-400">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <Star key={i} size={18} fill="currentColor" />
                                        ))}
                                    </div>

                                    <p className="text-gray-200 italic mb-8 leading-relaxed grow">
                                        "{item.quote}"
                                    </p>

                                    <div className="flex items-center gap-4 mt-auto ">
                                        {/* <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center text-white font-bold text-xl border border-white/10 uppercase">
                                            {item.author.charAt(0)}
                                        </div> */}
                                        <div>
                                            <h4 className="font-bold text-white text-lg leading-tight">{item.author}</h4>
                                            <p className="text-white/60 text-sm mt-0.5">{item.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style jsx global>{`
                .testimonials-slider .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.3) !important;
                    opacity: 1;
                    width: 10px;
                    height: 10px;
                    transition: all 0.3s ease;
                }
                .testimonials-slider .swiper-pagination-bullet-active {
                    background: white !important;
                    width: 24px;
                    border-radius: 5px;
                }
                .testimonials-slider .swiper-slide {
                    height: auto !important;
                }
                .testimonials-slider .swiper {
                    overflow: visible !important;
                }
            `}</style>
        </section>
    );
}
