"use client";

import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Loader2 } from 'lucide-react';
import { useServices, Service } from '@/hooks/use-services';
import { useQuotes } from '@/hooks/use-quotes';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "Full name is required"),
    companyName: z.string().min(2, "Company name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(7, "Valid phone number is required"),
    serviceId: z.string().min(1, "Please select a service"),
    projectDetails: z.string().min(10, "Project details must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const { servicesQuery } = useServices();
    const { submitQuoteMutation } = useQuotes();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            companyName: '',
            email: '',
            phone: '',
            serviceId: '',
            projectDetails: ''
        }
    });

    const services = servicesQuery.data?.data || [];

    const onSubmit = async (data: ContactFormData) => {
        await submitQuoteMutation.mutateAsync({
            ...data,
            type: 'contact-cta'
        }, {
            onSuccess: () => {
                reset();
            }
        });
    };

    const isLoading = submitQuoteMutation.isPending;

    return (
        <main className="min-h-screen bg-gray-50">

            {/* --- HERO SECTION --- */}
            <div className="relative h-[300px] flex items-center justify-center bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://placehold.co/1920x600/0f766e/ffffff?text=Contact+Us+Background')] opacity-10 bg-cover bg-center" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 shadow-sm">Contact Us</h1>
                    <p className="text-xl text-teal-100 max-w-2xl mx-auto">
                        Get in touch with our engineering team for inquiries, quotes, and project consultations.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16  relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- LEFT COLUMN: Contact Info --- */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Main Contact Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                Get in Touch
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</p>
                                        <p className="font-medium text-gray-900">+966 55 961 1821</p>
                                        <p className="text-gray-500 text-sm">+966 50 830 4644</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors shrink-0">
                                        <MessageSquare size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">WhatsApp</p>
                                        <a href="https://wa.me/966559611821" target="_blank" rel="noopener noreferrer" className="font-medium text-gray-900 hover:text-green-600 transition-colors">
                                            Chat with Support
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
                                        <a href="mailto:info@detco.sa" className="font-medium text-gray-900 hover:text-primary transition-colors">info@detco.sa</a>
                                        <p className="text-gray-500 text-sm">rfq@detco.sa</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Working Hours & Locations */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-primary shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Working Hours</p>
                                        <p className="font-medium text-gray-900">Sat - Thu: 8:00 AM - 6:00 PM</p>
                                        <p className="text-gray-500 text-sm">Friday: Closed</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-primary shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Office Locations</p>
                                        <p className="font-medium text-gray-900">Jeddah (HQ)</p>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Serving: Riyadh, Dammam, Mecca, Medina, & All Saudi Regions
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* --- RIGHT COLUMN: RFQ Form --- */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 h-full">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Request a Quote</h2>
                            <p className="text-gray-500 mb-8">Fill out the form below and our engineering team will respond within 24 hours.</p>

                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            id="name"
                                            {...register("name")}
                                            className={`w-full px-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400`}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="companyName" className="text-sm font-bold text-gray-700">Company Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            {...register("companyName")}
                                            className={`w-full px-4 py-3 bg-gray-50 border ${errors.companyName ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400`}
                                            placeholder="Your Company Ltd."
                                        />
                                        {errors.companyName && <p className="text-xs text-red-500 font-medium">{errors.companyName.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                                        <input
                                            type="email"
                                            id="email"
                                            {...register("email")}
                                            className={`w-full px-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400`}
                                            placeholder="john@company.com"
                                        />
                                        {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            {...register("phone")}
                                            className={`w-full px-4 py-3 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400`}
                                            placeholder="+966 50 000 0000"
                                        />
                                        {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="serviceId" className="text-sm font-bold text-gray-700">Interested Service <span className="text-red-500">*</span></label>
                                    <select
                                        id="serviceId"
                                        {...register("serviceId")}
                                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.serviceId ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-600`}
                                    >
                                        <option value="">Select a Service</option>
                                        {services.map((service: Service) => (
                                            <option key={service.id} value={service.id}>{service.title}</option>
                                        ))}
                                    </select>
                                    {errors.serviceId && <p className="text-xs text-red-500 font-medium">{errors.serviceId.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="projectDetails" className="text-sm font-bold text-gray-700">Project Details <span className="text-red-500">*</span></label>
                                    <textarea
                                        id="projectDetails"
                                        rows={5}
                                        {...register("projectDetails")}
                                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.projectDetails ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-gray-400`}
                                        placeholder="Please describe your project requirements, location, and estimated size..."
                                    />
                                    {errors.projectDetails && <p className="text-xs text-red-500 font-medium">{errors.projectDetails.message}</p>}
                                </div>

                                <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            SUBMITTING...
                                        </>
                                    ) : (
                                        <>
                                            SUBMIT REQUEST
                                            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- GOOGLE MAP SECTION --- */}
            <div className="container mx-auto px-4 pb-20">
                <div className="w-full h-[450px] rounded-2xl overflow-hidden relative border border-gray-100">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118924.97746194749!2d39.10738092285157!3d21.543333399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b118db!2sJeddah%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1703350000000!5m2!1sen!2ssa"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'grayscale(0.1)' }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Detco Office Location"
                        className="w-full h-full"
                    ></iframe>
                </div>
            </div>

        </main>
    );
}
