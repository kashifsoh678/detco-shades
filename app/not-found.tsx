"use client";

import React from 'react'
import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-primary/20 leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500">
            It might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Home size={20} />
            Go to Homepage
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary font-bold px-8 py-4 rounded-xl hover:bg-primary hover:text-white transition-all shadow-md"
          >
            <Search size={20} />
            Browse Products
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
            Popular Pages
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/about" className="text-primary hover:text-teal-700 hover:underline transition-colors">
              About Us
            </Link>
            <Link href="/services" className="text-primary hover:text-teal-700 hover:underline transition-colors">
              Services
            </Link>
            <Link href="/projects" className="text-primary hover:text-teal-700 hover:underline transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="text-primary hover:text-teal-700 hover:underline transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </main>
  )
}
