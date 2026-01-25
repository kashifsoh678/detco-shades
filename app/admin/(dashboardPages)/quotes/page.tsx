"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import {
    Loader2,
    Mail,
    Phone,
    Building2,
    AlertCircle,
    Search,
    MessageSquareQuote,
    Trash2,
    Clock,
    CheckCircle2,
    User,
    Calendar,
    Briefcase
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Quote {
    id: string;
    name: string;
    email: string;
    phone: string;
    serviceId: string;
    service: { id: string; title: string };
    type: "quick-cta" | "contact-cta";
    companyName?: string;
    projectDetails?: string;
    status: "new" | "contacted" | "closed";
    createdAt: string;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
};

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Deletion State
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [quoteToDelete, setQuoteToDelete] = useState<Quote | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchQuotes = async () => {
        try {
            const res = await axiosInstance.get("/quotes");
            setQuotes(res.data);
            setError(null);
        } catch (err) {
            console.error("Fetch Quotes Error:", err);
            setError("Failed to load quotes.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotes();
        const interval = setInterval(fetchQuotes, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleDeleteClick = (quote: Quote) => {
        setQuoteToDelete(quote);
        setIsConfirmModalOpen(true);
    };

    const onConfirmDelete = async () => {
        if (!quoteToDelete) return;
        setIsDeleting(true);
        try {
            await axiosInstance.delete(`/quotes/${quoteToDelete.id}`);
            setQuotes(quotes.filter(q => q.id !== quoteToDelete.id));
            toast.success("Quote request deleted");
            setIsConfirmModalOpen(false);
        } catch (err) {
            toast.error("Failed to delete quote");
        } finally {
            setIsDeleting(false);
            setQuoteToDelete(null);
        }
    };

    const updateStatus = async (quote: Quote, newStatus: "new" | "contacted" | "closed") => {
        if (quote.status === newStatus) return;

        try {
            await axiosInstance.patch(`/quotes/${quote.id}`, { status: newStatus });
            setQuotes(quotes.map(q => q.id === quote.id ? { ...q, status: newStatus } : q));
            toast.success(`Status updated to ${newStatus}`);
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    const filteredQuotes = quotes.filter(q =>
        q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.companyName && q.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-100">
                <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                <p>{error} Please try refreshing.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Quote Requests</h1>
                    <p className="text-gray-500 text-sm">Manage incoming leads and project inquiries.</p>
                </div>
            </div>

            {/* Filters Section */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search by name, email or company..."
                        className="pl-12 bg-gray-50 border-none h-11 rounded-xl focus:bg-white transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Quotes Content */}
            {filteredQuotes.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                        <MessageSquareQuote size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Inbox is empty</h3>
                    <p className="text-gray-500 max-w-xs mt-2 text-sm">
                        {searchTerm ? "No quotes match your search criteria." : "You haven't received any quote requests yet."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredQuotes.map((quote) => (
                        <div
                            key={quote.id}
                            className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="p-6 space-y-4">
                                {/* Header with Badge */}
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                                            <User size={20} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-gray-900 truncate" title={quote.name}>
                                                {quote.name}
                                            </h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                                {quote.type.replace("-cta", "")} Inquiry
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteClick(quote)}
                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                {/* Contact Details */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <Mail size={14} className="text-gray-400" />
                                        <span className="truncate">{quote.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <Phone size={14} className="text-gray-400" />
                                        <span>{quote.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-semibold text-primary/80">
                                        <Briefcase size={14} className="text-primary/40" />
                                        <span className="truncate capitalize">{quote.service?.title || "Unknown Service"}</span>
                                    </div>
                                </div>

                                {/* Project Snippet */}
                                {quote.type === "contact-cta" && (
                                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                                        {quote.companyName && (
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                                <Building2 size={12} className="text-gray-400" />
                                                <span className="truncate">{quote.companyName}</span>
                                            </div>
                                        )}
                                        <p className="text-xs text-gray-500 italic line-clamp-2 leading-relaxed">
                                            "{quote.projectDetails}"
                                        </p>
                                    </div>
                                )}

                                {/* Status Switcher UX */}
                                <div className="pt-4 border-t border-gray-50 space-y-3">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Update Status</span>
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                <Calendar size={12} />
                                                {formatDate(quote.createdAt)}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-1">
                                            {(["new", "contacted", "closed"] as const).map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => updateStatus(quote, status)}
                                                    className={cn(
                                                        "text-[9px] font-bold uppercase py-1.5 rounded-lg border transition-all active:scale-95 cursor-pointer",
                                                        quote.status === status
                                                            ? status === "new" ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200" :
                                                                status === "contacted" ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-200" :
                                                                    "bg-green-600 text-white border-green-600 shadow-md shadow-green-200"
                                                            : "bg-white text-gray-400 border-gray-100 hover:border-gray-300 hover:text-gray-600"
                                                    )}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={onConfirmDelete}
                loading={isDeleting}
                title="Delete Quote Request"
                description={`Are you sure you want to delete the inquiry from "${quoteToDelete?.name}"? This action cannot be undone.`}
            />
        </div>
    );
}
