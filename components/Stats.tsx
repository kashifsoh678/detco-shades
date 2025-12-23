"use client";

import React, { useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';


const stats = [
    {
        label: 'YEARS EXPERIENCE',
        value: 15,
        suffix: '+'
    },
    {
        label: 'SATISFIED CLIENTS',
        value: 200,
        suffix: '+'
    },
    {
        label: 'COMPLETED PROJECTS',
        value: 500,
        suffix: '+'
    },
    {
        label: 'QUALITY GUARANTEE',
        value: 100,
        suffix: '%'
    },
];

function Counter({ value, suffix }: { value: number, suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toFixed(0) + suffix;
            }
        });
    }, [springValue, suffix]);

    return <span ref={ref} className="text-5xl md:text-6xl font-bold text-white mb-2 block" />;
}

export default function Stats() {
    return (
        <section className="relative py-24 bg-gray-900 overflow-hidden">
            {/* Parallax Background */}
            <div
                className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
                style={{ backgroundImage: "url('https://placehold.co/1920x600/111827/006666?text=Industrial+Excellence')" }}
            >
                <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="flex flex-col items-center group"
                        >
                            <div className="mb-4"></div>

                            <Counter value={stat.value} suffix={stat.suffix} />

                            <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mt-2">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
