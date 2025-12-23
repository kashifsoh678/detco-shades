"use client";

import React, { useState } from 'react';
import { Send, MapPin } from 'lucide-react';

export default function HeroRFQForm() {
    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] max-w-md w-full mx-auto md:ml-auto md:mr-0 z-20 relative group hover:border-white/30 transition-all duration-500">
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-white/10 to-transparent opacity-50 pointer-events-none" />

            <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Get a Fast Quote</h3>
                <p className="text-teal-50/80 text-sm mb-6 font-medium">Expert shade engineering team ready to assist.</p>

                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="relative group/input">
                            <input
                                type="text"
                                id="hero-name"
                                placeholder="Name"
                                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-teal-100/60 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:bg-white/20 transition-all text-sm backdrop-blur-sm"
                                required
                            />
                        </div>
                        <div className="relative group/input">
                            <input
                                type="tel"
                                id="hero-phone"
                                placeholder="Phone"
                                className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-teal-100/60 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:bg-white/20 transition-all text-sm backdrop-blur-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="relative group/input">
                        <input
                            type="email"
                            id="hero-email"
                            placeholder="Email Address"
                            className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-teal-100/60 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:bg-white/20 transition-all text-sm backdrop-blur-sm"
                            required
                        />
                    </div>

                    <div className="relative group/input">
                        <select
                            id="hero-service"
                            defaultValue=""
                            className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder:text-teal-100/60 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:bg-white/20 transition-all text-sm backdrop-blur-sm [&>option]:text-gray-900 appearance-none cursor-pointer"
                        >
                            <option value="" disabled className="text-gray-400">Select Project Type</option>
                            <option>Car Parking Shades</option>
                            <option>Tensile Structures</option>
                            <option>Swimming Pool Shades</option>
                            <option>Other Requirement</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-linear-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-teal-900/30 hover:shadow-teal-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group border border-white/10"
                    >
                        REQUEST ESTIMATE
                        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-teal-100/60 uppercase tracking-widest font-medium pt-2">
                        <span>🔒 Secure & Confidential</span>
                    </div>
                </form>
            </div>
        </div>
    );
}
