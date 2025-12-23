import React from 'react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="bg-primary py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-white">About Us</h1>
                    <p className="text-teal-100 mt-2">Pioneers in Tensile Structures & Sun Control</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed text-lg">
                    <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
                    <p>
                        Detco Systems Co. is a premier engineering firm based in Saudi Arabia, specializing in the design, fabrication, and installation of high-quality sun shade systems.
                        From tensile fabric structures to heavy-duty HDPE car parking shades, we provide solutions that combine aesthetic appeal with rugged durability.
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                    <p>
                        To protect outdoor spaces from the harsh climate of the region while enhancing their visual beauty. We believe in engineering that serves both purpose and design.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                        <div className="bg-gray-50 p-6 rounded border-l-4 border-primary">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Materials</h3>
                            <p className="text-base text-gray-600">We use only premium PVC, PTFE, and HDPE fabrics sourced from global leaders to ensure longevity.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded border-l-4 border-primary">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Installation</h3>
                            <p className="text-base text-gray-600">Our team of engineers and technicians ensures every structure is safe, stable, and perfectly finished.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
