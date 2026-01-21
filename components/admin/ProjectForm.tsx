"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Plus, Trash2, Info, ChevronRight,
    ChevronLeft, Check, Layers, BookOpen,
    ListChecks, Image as ImageIcon,
    Layout
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QuillEditor from "@/components/ui/QuillEditor";
import ImageUpload from "./ImageUpload";
import ProjectSelect from "./ProjectSelect";
import { Project, ProjectCreate } from "@/hooks/use-projects";
import { cn } from "@/lib/utils";

const projectSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(200),
    slug: z.string().trim().min(1, "Slug is required").max(200),
    location: z.string().trim().min(1, "Location is required").max(200),
    serviceId: z.string().min(1, "Please select a service"),
    thumbnailId: z.string().min(1, "Thumbnail is required"),
    thumbnailUrl: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    imageIds: z
        .array(z.string())
        .min(1, "At least one gallery image is required")
        .max(5, "Maximum 5 gallery images are allowed"),
    imageUrls: z.array(z.string()).optional(),
    isActive: z.boolean(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    initialData?: Project | null;
    onSubmit: (data: ProjectCreate) => void;
    isLoading?: boolean;
    onLoadingChange?: (loading: boolean) => void;
}

const STEPS = [
    { id: "basic", title: "Basic Information", icon: Info },
    { id: "description", title: "Project Description", icon: BookOpen },
    { id: "gallery", title: "Project Gallery", icon: Layers },
];

const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
};

const ProjectForm = ({
    initialData,
    onSubmit,
    isLoading,
    onLoadingChange,
}: ProjectFormProps) => {
    const [currentStep, setCurrentStep] = useState(0);

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        mode: "onChange",
        defaultValues: initialData
            ? {
                ...initialData,
                thumbnailUrl: initialData.thumbnail?.url,
                imageIds: initialData.images?.map(img => img.imageId) || [],
                imageUrls: initialData.images?.map(img => img.image.url) || [],
                serviceId: initialData.serviceId || "",
                thumbnailId: initialData.thumbnailId as any,
            }
            : {
                title: "",
                slug: "",
                location: "",
                serviceId: "",
                thumbnailId: "",
                description: "",
                imageIds: [""],
                isActive: true,
            },
    });

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        trigger,
        formState: { errors },
    } = form;

    const {
        fields: galleryFields,
        append: appendImage,
        remove: removeImage,
    } = useFieldArray({
        control,
        name: "imageIds" as never,
    });

    const title = watch("title");

    useEffect(() => {
        if (!initialData && title) {
            setValue("slug", slugify(title));
        }
    }, [title, setValue, initialData]);

    const thumbnailUrl = watch("thumbnailUrl");
    const thumbnailId = watch("thumbnailId");
    const imageUrls = watch("imageUrls") || [];

    const validateStep = async (step: number) => {
        if (step === 0) {
            return await trigger(["title", "location", "serviceId", "thumbnailId"]);
        }
        if (step === 1) {
            return await trigger(["description"]);
        }
        if (step === 2) {
            return await trigger(["imageIds"]);
        }
        return true;
    };

    const nextStep = async () => {
        const isValid = await validateStep(currentStep);
        if (isValid && currentStep < STEPS.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <div className="flex flex-col h-full min-h-[600px]">
            {/* Header Section */}
            <div className="">
                {/* Progress Bar */}
                <div className="flex gap-2 h-1.5 w-full">
                    {STEPS.map((_, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "flex-1 rounded-full transition-all duration-500",
                                idx <= currentStep ? "bg-primary shadow-sm shadow-primary/20" : "bg-gray-100"
                            )}
                        />
                    ))}
                </div>

                <p className="text-sm text-gray-500 my-4 font-medium flex items-center gap-2 ">
                    {React.createElement(STEPS[currentStep].icon, { size: 14, className: "text-primary" })}
                    {STEPS[currentStep].title}
                </p>
            </div>

            <form
                onSubmit={handleSubmit((data) => onSubmit(data as any))}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        if (e.target instanceof HTMLInputElement) {
                            e.preventDefault();
                            nextStep();
                        } else if (e.target instanceof HTMLButtonElement) {
                            e.preventDefault();
                            (e.target as any).click();
                        }
                    }
                }}
                className="flex-1 flex flex-col "
            >
                {/* Hidden slug field */}
                <input type="hidden" {...register("slug")} />

                <div className="flex-1 relative overflow-hidden">
                    <div className="w-full">
                        {currentStep === 0 && (
                            <div className="grid grid-cols-1 gap-6">
                                {/* Thumbnail Upload */}
                                <div>
                                    <ImageUpload
                                        value={thumbnailUrl}
                                        label="Project Thumbnail"
                                        mediaId={thumbnailId || undefined}
                                        folder="projects/thumbnails"
                                        onChange={(id, url) => {
                                            setValue("thumbnailId", id);
                                            setValue("thumbnailUrl", url);
                                        }}
                                        onRemove={() => {
                                            setValue("thumbnailId", "");
                                            setValue("thumbnailUrl", undefined);
                                        }}
                                        onLoadingChange={onLoadingChange}
                                    />
                                    {errors.thumbnailId && (
                                        <p className="text-[12px] text-red-500 font-medium mt-1">{errors.thumbnailId.message}</p>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Project Title</label>
                                        <Input
                                            {...register("title")}
                                            placeholder="e.g. Design & Engineering"
                                            error={errors.title?.message}
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</label>
                                        <Input
                                            {...register("location")}
                                            placeholder="e.g. Alqunfotha Governorate"
                                            error={errors.location?.message}
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Linked Service</label>
                                        <ProjectSelect
                                            value={watch("serviceId")}
                                            onChange={(val) => setValue("serviceId", val)}
                                            error={errors.serviceId?.message}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="h-full">
                                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block mb-2">Detailed Description</label>
                                <QuillEditor
                                    value={watch("description")}
                                    onChange={(val) => setValue("description", val)}
                                    placeholder="Write about the project scope, challenges, and results..."
                                    maxLength={3000}
                                    className="min-h-[400px]"
                                    error={errors.description?.message}
                                />
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between gap-1">
                                    <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-full border">
                                        Allowed: JPG, PNG, WEBP | Max size: 5MB.
                                    </span>
                                    <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-full border">
                                        Max: {galleryFields.length} / 5
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar p-1">
                                    {galleryFields.map((field, index) => (
                                        <div key={field.id} className="relative group animate-in zoom-in-95 duration-200 ">

                                            <div className="absolute top-2 right-2">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        const currentUrls = [...imageUrls];
                                                        currentUrls.splice(index, 1);
                                                        setValue("imageUrls", currentUrls);
                                                        removeImage(index);
                                                    }}
                                                    className={`right-0 mb-1 h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${imageUrls[index] && "hidden"}`}
                                                    disabled={galleryFields.length === 1}
                                                >
                                                    <Trash2 size={12} />
                                                </Button>
                                            </div>
                                            <ImageUpload
                                                value={imageUrls[index]}
                                                mediaId={watch(`imageIds.${index}` as any) || undefined}
                                                folder="projects/gallery"
                                                label=""
                                                showsuggestion={false}
                                                onChange={(id, url) => {
                                                    setValue(`imageIds.${index}` as any, id);
                                                    const currentUrls = [...imageUrls];
                                                    currentUrls[index] = url;
                                                    setValue("imageUrls", currentUrls);
                                                }}
                                                onRemove={() => {
                                                    setValue(`imageIds.${index}` as any, "");
                                                    const currentUrls = [...imageUrls];
                                                    currentUrls[index] = "";
                                                    setValue("imageUrls", currentUrls);
                                                }}
                                                onLoadingChange={onLoadingChange}
                                            />
                                            {(errors.imageIds as any)?.[index] && (
                                                <p className="text-[10px] text-red-500 mt-1">Image is required</p>
                                            )}
                                        </div>
                                    ))}


                                </div>
                                {errors.imageIds && (
                                    <p className="text-sm text-red-500 font-medium animate-shake">
                                        {(errors.imageIds as any).message}
                                    </p>
                                )}

                                <div >
                                    {galleryFields.length < 5 && (
                                        <button
                                            type="button"
                                            onClick={() => appendImage("")}
                                            className="w-full cursor-pointer flex items-center justify-center gap-3 h-[60px] border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 text-gray-400 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300 group"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-white border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                                <Plus size={20} />
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-widest">Add Image</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-8 border-t border-gray-100 mt-auto">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 0 || isLoading}
                        className=""
                    >
                        Back
                    </Button>

                    <div className="flex gap-3">
                        {currentStep < STEPS.length - 1 ? (
                            <Button
                                key="next-step-btn"
                                type="button"
                                onClick={nextStep}
                                variant={"default"}
                                disabled={isLoading}
                                className=""
                            >
                                Next Step
                            </Button>
                        ) : (
                            <Button
                                key="submit-step-btn"
                                type="submit"
                                variant={"default"}
                                className=""
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        {initialData ? "Apply Changes" : "Publish Project"}
                                    </span>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;
