"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

interface ProductFAQProps {
    items: FAQItem[];
}

export default function ProductFAQ({ items }: ProductFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!items || items.length === 0) return null;

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                Frequently Asked Questions
            </h2>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={false}
                        className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-primary ring-1 ring-primary/20 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                        <button
                            onClick={() => toggleIndex(index)}
                            className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                        >
                            <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-primary' : 'text-gray-900'}`}>
                                {item.question}
                            </span>
                            <motion.span
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className={`ml-4 shrink-0 ${openIndex === index ? 'text-primary' : 'text-gray-400'}`}
                            >
                                <ChevronDown size={20} />
                            </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                            {openIndex === index && (
                                <motion.div
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    variants={{
                                        open: { opacity: 1, height: "auto" },
                                        collapsed: { opacity: 0, height: 0 }
                                    }}
                                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                >
                                    <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50/50">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
