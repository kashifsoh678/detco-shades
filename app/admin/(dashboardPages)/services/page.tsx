"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    Layers,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataModal from "@/components/ui/DataModal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ServiceForm from "@/components/admin/ServiceForm";
import { useServices, Service } from "@/hooks/use-services";
import Image from "next/image";

const ServicesPage = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const {
        servicesQuery,
        createMutation,
        updateMutation,
        deleteMutation
    } = useServices(true);

    const { data: servicesData, isLoading } = servicesQuery;
    const services = servicesData?.data || [];
    const meta = servicesData?.meta;

    const [isDataModalOpen, setIsDataModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isModalLocked, setIsModalLocked] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [modalType, setModalType] = useState<"create" | "edit">("create");

    const filteredServices = (services as Service[]).filter((service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setSelectedService(null);
        setModalType("create");
        setIsModalLocked(false);
        setIsDataModalOpen(true);
    };

    const handleEdit = (service: Service) => {
        setSelectedService(service);
        setModalType("edit");
        setIsModalLocked(false);
        setIsDataModalOpen(true);
    };

    const handleDeleteClick = (service: Service) => {
        setSelectedService(service);
        setIsConfirmModalOpen(true);
    };

    const onFormSubmit = async (values: any) => {
        try {
            if (modalType === "create") {
                await createMutation.mutateAsync(values);
            } else if (selectedService) {
                await updateMutation.mutateAsync({ id: selectedService.id, ...values });
            }
            setIsDataModalOpen(false);
        } catch (error) {
            // Handled by hook
        }
    };

    const onConfirmDelete = async () => {
        if (selectedService) {
            try {
                await deleteMutation.mutateAsync(selectedService.id);
                setIsConfirmModalOpen(false);
                setSelectedService(null);
            } catch (error) {
                // Handled by hook
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Our Services</h1>
                    <p className="text-gray-500 text-sm">
                        Manage the core service offerings displayed on your website.
                    </p>
                </div>
                <Button onClick={handleAdd} className="w-full md:w-auto gap-2">
                    <Plus size={18} />
                    Add Service
                </Button>
            </div>

            {/* Filters Section */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <Input
                        placeholder="Search services by title..."
                        className="pl-10 bg-gray-50 border-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Services Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="h-80 bg-gray-50 animate-pulse rounded-2xl border border-gray-100"
                        />
                    ))}
                </div>
            ) : filteredServices.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                        <Layers size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">No services found</h3>
                    <p className="text-gray-500 max-w-xs">
                        Try adjusting your search or add a new service to get started.
                    </p>
                    <Button variant="outline" onClick={handleAdd} className="mt-6">
                        Create your first service
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service) => {
                        const Icon = (LucideIcons as any)[service.iconName] || LucideIcons.HelpCircle;
                        return (
                            <div
                                key={service.id}
                                className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Cover Image Preview */}
                                <div className="relative h-48 bg-gray-100">
                                    {service.coverImage?.url ? (
                                        <Image
                                            src={service.coverImage.url}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <Layers size={48} />
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3 flex items-center gap-2">
                                        <div className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-sm text-primary">
                                            <Icon size={20} />
                                        </div>
                                        {service.isActive ? (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/90 backdrop-blur text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                                <CheckCircle2 size={10} /> Active
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/90 backdrop-blur text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                                <XCircle size={10} /> Inactive
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="flex gap-1.5">
                                            <button
                                                onClick={() => handleEdit(service)}
                                                className="p-2 bg-white shadow-lg border border-gray-100 rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(service)}
                                                className="p-2 bg-white shadow-lg border border-gray-100 rounded-lg text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 space-y-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg text-gray-900 capitalize" title={service.title}>
                                            {service.title}
                                        </h3>
                                        <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                                            #{service.order}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 line-clamp-2">
                                        {service.shortDescription}
                                    </p>
                                    <div className="pt-2 flex flex-wrap gap-1.5">
                                        {service.features.slice(0, 3).map((f, i) => (
                                            <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                                {f}
                                            </span>
                                        ))}
                                        {service.features.length > 3 && (
                                            <span className="text-[10px] text-gray-400">+{service.features.length - 3} more</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination Controls */}
            {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-gray-500">
                        Page {meta.page} of {meta.totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === meta.totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}

            {/* Form Modal */}
            <DataModal
                isOpen={isDataModalOpen}
                onClose={() => setIsDataModalOpen(false)}
                title="Service"
                type={modalType}
                className="max-w-4xl"

            >
                <ServiceForm
                    initialData={selectedService}
                    onSubmit={onFormSubmit}
                    isLoading={createMutation.isPending || updateMutation.isPending || isModalLocked}
                    onLoadingChange={setIsModalLocked}
                />
            </DataModal>

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={onConfirmDelete}
                loading={deleteMutation.isPending}
                title="Delete Service"
                description={`Are you sure you want to delete "${selectedService?.title}"? All features and process steps will also be removed. This action cannot be undone.`}
            />
        </div>
    );
};

export default ServicesPage;