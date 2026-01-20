"use client"

import React, { useState, useRef } from 'react'
import { Image as ImageIcon, X, UploadCloud, Loader2 } from 'lucide-react'
import axiosInstance from '@/lib/axios'
import { toast } from 'sonner'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
    value?: string; // URL of already uploaded image
    mediaId?: string; // ID of the image for deletion
    onChange: (mediaId: string, url: string) => void;
    onRemove: () => void;
    folder: string;
    className?: string;
    label?: string;
    onLoadingChange?: (loading: boolean) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    mediaId,
    onChange,
    onRemove,
    folder,
    className,
    label = "Upload Image",
    onLoadingChange
}) => {
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const setUploading = (loading: boolean) => {
        setIsUploading(loading);
        onLoadingChange?.(loading);
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast.error("Please upload an image file")
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size must be less than 5MB")
            return
        }

        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', folder)

        try {
            const response = await axiosInstance.post('/upload', formData)

            const { id, url } = response.data
            onChange(id, url)
            toast.success("Image uploaded successfully")
        } catch (error: any) {
            console.error("Upload Error:", error)
            toast.error(error.response?.data?.error || "Failed to upload image")
        } finally {
            setUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const handleRemove = async () => {
        if (!mediaId) {
            onRemove()
            return
        }

        try {
            setUploading(true)
            await axiosInstance.delete(`/upload/${mediaId}`)
            onRemove()
            toast.success("Image removed from server")
        } catch (error: any) {
            console.error("Delete Error:", error)
            toast.error("Failed to delete image from server")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className={cn("space-y-4 w-full", className)}>
            {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}

            <div className="flex items-center gap-4">
                {value ? (
                    <div className="relative w-full h-60 rounded-xl overflow-hidden group border border-gray-200">
                        <Image
                            src={value}
                            alt="Uploaded image"
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                type="button"
                                onClick={handleRemove}
                                disabled={isUploading}
                                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isUploading ? <Loader2 className="animate-spin" size={20} /> : <X size={20} />}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => !isUploading && fileInputRef.current?.click()}
                        className={cn(
                            "w-full h-60 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-gray-500",
                            isUploading && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {isUploading ? (
                            <Loader2 className="animate-spin text-primary" size={32} />
                        ) : (
                            <>
                                <UploadCloud size={32} />
                                <span className="text-xs font-medium px-2 text-center">Click to upload</span>
                            </>
                        )}
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    accept="image/*"
                    className="hidden"
                />
            </div>
            <p className="text-[10px] text-gray-400">Supported formats: JPG, PNG, WEBP. Max size: 5MB.</p>
        </div>
    )
}

export default ImageUpload
