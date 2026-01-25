"use client"

import React, { useState, useRef } from 'react'
import { Video, X, UploadCloud, Loader2, Play } from 'lucide-react'
import axiosInstance from '@/lib/axios'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface VideoUploadProps {
    value?: string; // URL of already uploaded video
    mediaId?: string; // ID of the video for deletion
    onChange: (mediaId: string, url: string) => void;
    onRemove: () => void;
    folder: string;
    className?: string;
    label?: string;
    onLoadingChange?: (loading: boolean) => void;
    showsuggestion?: boolean;
}

const VideoUpload: React.FC<VideoUploadProps> = ({
    value,
    mediaId,
    onChange,
    onRemove,
    folder,
    className,
    label = "Upload Video",
    onLoadingChange,
    showsuggestion = true
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

        if (!file.type.startsWith('video/')) {
            toast.error("Please upload a video file")
            return
        }

        // Max 50MB for videos
        if (file.size > 50 * 1024 * 1024) {
            toast.error("Video size must be less than 50MB")
            return
        }

        setUploading(true)

        try {
            // 1. Get Signature
            const signResponse = await axiosInstance.post('/upload/sign', {
                folder: folder,
                resource_type: 'video'
            });

            const { signature, timestamp, apiKey, cloudName } = signResponse.data;

            // 2. Upload to Cloudinary Directly
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append('file', file);
            cloudinaryFormData.append('api_key', apiKey);
            cloudinaryFormData.append('timestamp', timestamp);
            cloudinaryFormData.append('signature', signature);
            cloudinaryFormData.append('folder', folder.startsWith("Home") ? folder : `Detco/${folder}`);
            cloudinaryFormData.append('resource_type', 'video');

            const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
                method: 'POST',
                body: cloudinaryFormData
            });

            if (!cloudinaryResponse.ok) {
                const errorData = await cloudinaryResponse.json();
                throw new Error(errorData.error?.message || "Cloudinary upload failed");
            }

            const uploadResult = await cloudinaryResponse.json();

            // 3. Keep record in our DB
            const dbFormData = new FormData();
            dbFormData.append('alreadyUploaded', 'true');
            dbFormData.append('url', uploadResult.secure_url);
            dbFormData.append('publicId', uploadResult.public_id);
            dbFormData.append('folder', folder);
            dbFormData.append('resourceType', 'video');
            dbFormData.append('fileName', file.name);

            const dbResponse = await axiosInstance.post('/upload', dbFormData);

            const { id, url } = dbResponse.data
            onChange(id, url)
            toast.success("Video uploaded and secured successfully")
        } catch (error: any) {
            console.error("Upload Error:", error)
            const message = error.message || "Failed to upload video"
            toast.error(message)
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
            toast.success("Video removed from server")
        } catch (error: any) {
            console.error("Delete Error:", error)
            toast.error("Failed to delete video from server")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className={cn("space-y-4 w-full", className)}>
            {label && <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">{label}</label>}

            <div className="flex items-center gap-4">
                {value ? (
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden group border border-gray-200 bg-black">
                        <video
                            src={value}
                            className="w-full h-full object-contain"
                            controls={false}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <div className="p-2 bg-white/20 backdrop-blur rounded-full text-white">
                                <Play size={20} fill="currentColor" />
                            </div>
                            <button
                                type="button"
                                onClick={handleRemove}
                                disabled={isUploading}
                                className="p-2 cursor-pointer bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isUploading ? <Loader2 className="animate-spin" size={16} /> : <X size={16} />}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => !isUploading && fileInputRef.current?.click()}
                        className={cn(
                            "w-full h-48 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-gray-500",
                            isUploading && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {isUploading ? (
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="animate-spin text-primary" size={32} />
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Processing Video...</span>
                            </div>
                        ) : (
                            <>
                                <UploadCloud size={32} />
                                <div className="text-center px-4">
                                    <span className="text-xs font-bold block mb-1">Click to upload product video</span>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-tight">MP4, WebM up to 50MB</span>
                                </div>
                            </>
                        )}
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    accept="video/*"
                    className="hidden"
                />
            </div>
            {showsuggestion && !value && (
                <p className="text-[10px] text-gray-400">High quality MP4/WebM is recommended for better presentation.</p>
            )}
        </div>
    )
}

export default VideoUpload
