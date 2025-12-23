import React from 'react';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-primary py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-white">Contact Us</h1>
                    <p className="text-teal-100 mt-2">Get in touch with our expert engineering team</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Information & Map */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b-2 border-primary inline-block pb-2">
                            Headquarters
                        </h2>

                        <div className="space-y-6 mb-12">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-primary text-xl">📍</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Address</h3>
                                    <p className="text-gray-600">Jeddah, Saudi Arabia</p>
                                    <p className="text-gray-500 text-sm mt-1">Service across: Riyadh, Dammam, Khobar, Jubail, Yanbu, Tabuk</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-primary text-xl">📞</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Phone</h3>
                                    <p className="text-gray-600">+966 55 961 1821</p>
                                    <p className="text-gray-600">+966 50 830 4644</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-primary text-xl">✉️</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Email</h3>
                                    <p className="text-gray-600">info@detco.sa</p>
                                    <p className="text-gray-600">rfq@detco.sa</p>
                                </div>
                            </div>
                        </div>

                        {/* Google Map */}
                        <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118924.97746194749!2d39.10738092285157!3d21.543333399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b118db!2sJeddah%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1703350000000!5m2!1sen!2ssa"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Detco Location"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                                    <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="Your Name" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                                    <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="your@email.com" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input type="tel" id="phone" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="+966..." />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
                                    <input type="text" id="city" className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="Jeddah" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-red-500">*</span></label>
                                <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none" placeholder="How can we help you?"></textarea>
                            </div>

                            <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded hover:bg-teal-700 transition-colors">
                                SEND MESSAGE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
