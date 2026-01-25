"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    CheckCircle2,
    XCircle,
    Layout,
    Package,
    Star,
    ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataModal from "@/components/ui/DataModal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ProductForm from "@/components/admin/ProductForm";
import { useProducts, Product } from "@/hooks/use-products";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ProductsPage = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const {
        productsQuery,
        createMutation,
        updateMutation,
        deleteMutation
    } = useProducts({ all: true });

    const { data: productsData, isLoading } = productsQuery;
    const products = productsData?.data || [];
    const meta = productsData?.meta;

    const [isDataModalOpen, setIsDataModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isModalLocked, setIsModalLocked] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [modalType, setModalType] = useState<"create" | "edit">("create");

    const filteredProducts = (products as Product[]).filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setSelectedProduct(null);
        setModalType("create");
        setIsModalLocked(false);
        setIsDataModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setModalType("edit");
        setIsModalLocked(false);
        setIsDataModalOpen(true);
    };

    const handleDeleteClick = (product: Product) => {
        setSelectedProduct(product);
        setIsConfirmModalOpen(true);
    };

    const onFormSubmit = async (values: any) => {
        try {
            if (modalType === "create") {
                await createMutation.mutateAsync(values);
            } else if (selectedProduct) {
                await updateMutation.mutateAsync({ id: selectedProduct.id, ...values });
            }
            setIsDataModalOpen(false);
        } catch (error) {
            // Handled by hook
        }
    };

    const onConfirmDelete = async () => {
        if (selectedProduct) {
            try {
                await deleteMutation.mutateAsync(selectedProduct.id);
                setIsConfirmModalOpen(false);
                setSelectedProduct(null);
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
                    <h1 className="text-2xl font-bold text-gray-800">Products Catalog</h1>
                    <p className="text-gray-500 text-sm">Manage your architectural sunshade products and solutions.</p>
                </div>
                <Button onClick={handleAdd} className="w-full md:w-auto gap-2">
                    <Plus size={18} />
                    Add New Product
                </Button>
            </div>

            {/* Filters Section */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <Input
                        placeholder="Search products by title..."
                        className="pl-12 bg-gray-50 border-none h-11 rounded-xl focus:bg-white transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-80 bg-gray-50 animate-pulse rounded-3xl border border-gray-100" />
                    ))}
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-100 rounded-4xl p-24 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-8">
                        <Package size={48} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Product inventory empty</h3>
                    <p className="text-gray-500 max-w-sm mt-4 text-sm leading-relaxed">
                        Start building your catalogue today by adding your first premium architectural product.
                    </p>
                    <Button variant="outline" onClick={handleAdd} className="mt-10 rounded-xl px-8 h-12">
                        Launch your first product
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            {/* Product Image Preview */}
                            <div className="relative h-56 bg-gray-50">
                                {product.thumbnail?.url ? (
                                    <Image
                                        src={product.thumbnail.url}
                                        alt={product.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <Package size={48} />
                                    </div>
                                )}

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.isActive ? (
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/90 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg shadow-green-500/20">
                                            <CheckCircle2 size={10} /> Published
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/90 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg shadow-red-500/20">
                                            <XCircle size={10} /> Draft
                                        </div>
                                    )}
                                    {product.isFeatured && (
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/90 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg shadow-amber-500/20">
                                            <Star size={10} /> Featured
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="p-2.5 bg-white shadow-xl border border-gray-100 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 active:scale-95"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(product)}
                                            className="p-2.5 bg-white shadow-xl border border-gray-100 rounded-xl text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 active:scale-95"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-3">
                                <div className="flex justify-between items-start gap-3">
                                    <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-primary transition-colors" title={product.title}>
                                        {product.title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg border">
                                        <ImageIcon size={12} className="text-primary/40" />
                                        {product.images?.length || 0}
                                    </div>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg border">
                                        <Layout size={12} className="text-primary/40" />
                                        {product.specs?.length || 0} Specs
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12 pb-8">
                    <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="rounded-xl px-6 h-11"
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {[...Array(meta.totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={cn(
                                    "w-11 h-11 rounded-xl text-sm font-bold transition-all duration-300",
                                    page === i + 1
                                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110"
                                        : "bg-white text-gray-400 border border-gray-100 hover:border-primary hover:text-primary"
                                )}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        disabled={page === meta.totalPages}
                        onClick={() => setPage(page + 1)}
                        className="rounded-xl px-6 h-11"
                    >
                        Next
                    </Button>
                </div>
            )}

            {/* Form Modal */}
            <DataModal
                isOpen={isDataModalOpen}
                onClose={() => setIsDataModalOpen(false)}
                title="Product"
                type={modalType}
                className="max-w-4xl"
            >
                <ProductForm
                    initialData={selectedProduct}
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
                title="Delete Product"
                description={`Are you sure you want to delete "${selectedProduct?.title}"? This will also remove its associated gallery images, specs, and FAQs. This action cannot be undone.`}
            />
        </div>
    );
};

export default ProductsPage;