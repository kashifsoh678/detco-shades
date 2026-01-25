"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Plus, Trash2, Info, ChevronRight,
    ChevronLeft, Check, Layers, BookOpen,
    ListChecks, Image as ImageIcon,
    Video, HelpCircle, Tag, Sparkles,
    Settings2, MessageSquareQuote, X, Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import QuillEditor from "@/components/ui/QuillEditor";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";
import ActiveToggle from "./ActiveToggle";
import { Product, ProductCreate } from "@/hooks/use-products";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const productSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(100),
    slug: z.string().trim().min(1, "Slug is required").max(100),
    shortDescription: z.string().trim().min(1, "Short description is required").max(300),
    description: z.string().min(1, "Description is required"),
    applications: z.array(z.string().min(1, "Application tag cannot be empty")).min(1, "At least one application is required").max(8, "Maximum 8 applications allowed"),
    isFeatured: z.boolean().default(false),
    isActive: z.boolean().default(true),
    order: z.number().default(0),
    thumbnailId: z.string().min(1, "Thumbnail is required"),
    thumbnailUrl: z.string().optional(),
    coverImageId: z.string().nullable().optional(),
    coverImageUrl: z.string().optional(),
    videoId: z.string().min(1, "Product video is required"),
    videoUrl: z.string().optional(),
    gallery: z.array(z.object({
        imageId: z.string().min(1, "Image is required"),
        url: z.string().optional()
    })).min(1, "At least one gallery image is required").max(8, "Maximum 8 gallery images allowed"),
    specs: z.array(z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Value is required")
    })).min(1, "At least one technical specification is required").max(8, "Maximum 8 specifications allowed"),
    benefits: z.array(z.object({
        title: z.string().min(1, "Benefit title is required")
    })).min(1, "At least one product benefit is required").max(8, "Maximum 8 benefits allowed"),
    faqs: z.array(z.object({
        question: z.string().min(1, "Question is required"),
        answer: z.string().min(1, "Answer is required")
    })).min(1, "At least one FAQ is required").max(5, "Maximum 5 FAQs allowed"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
    initialData?: Product | null;
    onSubmit: (data: ProductCreate) => void;
    isLoading?: boolean;
    onLoadingChange?: (loading: boolean) => void;
}

const STEPS = [
    { id: "basic", title: "General Info", icon: Info },
    { id: "content", title: "Description", icon: BookOpen },
    { id: "applications", title: "Applications", icon: Tag },
    { id: "specs", title: "Specifications", icon: Settings2 },
    { id: "benefits", title: "Benefits", icon: Settings2 },
    { id: "faqs", title: "FAQ Support", icon: MessageSquareQuote },
    { id: "media", title: "Visual Assets", icon: ImageIcon },
];

const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
};

const ProductForm = ({
    initialData,
    onSubmit,
    isLoading,
    onLoadingChange,
}: ProductFormProps) => {
    const [currentStep, setCurrentStep] = useState(0);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema) as any,
        mode: "onChange",
        defaultValues: {
            title: "",
            slug: "",
            shortDescription: "",
            description: "",
            applications: [],
            isFeatured: false,
            isActive: true,
            order: 0,
            thumbnailId: "",
            videoId: "",
            gallery: [{ imageId: "", url: "" }],
            specs: [],
            benefits: [],
            faqs: [],
        },
    });

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        trigger,
        reset,
        formState: { errors },
    } = form;

    useEffect(() => {
        if (initialData) {
            reset({
                ...initialData,
                thumbnailUrl: initialData.thumbnail?.url,
                coverImageUrl: initialData.coverImage?.url,
                videoUrl: initialData.video?.url,
                gallery: initialData.images?.map(img => ({
                    imageId: img.imageId,
                    url: img.image?.url
                })) || [{ imageId: "", url: "" }],
                specs: initialData.specs || [],
                benefits: initialData.benefits || [],
                faqs: initialData.faqs || [],
                thumbnailId: initialData.thumbnailId || "",
                coverImageId: initialData.coverImageId || "",
                videoId: initialData.videoId || "",
                applications: initialData.applications || [],
                order: initialData.order || 0
            });
        }
    }, [initialData, reset]);

    const { fields: galleryFields, append: appendImage, remove: removeImage } = useFieldArray({
        control,
        name: "gallery",
    });

    const { fields: specFields, append: appendSpec, remove: removeSpec } = useFieldArray({
        control,
        name: "specs",
    });

    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
        control,
        name: "benefits",
    });

    const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({
        control,
        name: "faqs",
    });

    const title = watch("title");
    useEffect(() => {
        if (!initialData && title) {
            setValue("slug", slugify(title));
        }
    }, [title, setValue, initialData]);

    const thumbnailUrl = watch("thumbnailUrl");
    const thumbnailId = watch("thumbnailId");
    const coverImageUrl = watch("coverImageUrl");
    const coverImageId = watch("coverImageId");
    const videoUrl = watch("videoUrl");
    const videoId = watch("videoId");

    const [applicationInput, setApplicationInput] = useState("");
    const applications = watch("applications") || [];

    const addApplication = () => {
        if (applicationInput.trim() && !applications.includes(applicationInput.trim())) {
            if (applications.length < 8) {
                setValue("applications", [...applications, applicationInput.trim()], { shouldValidate: true });
                setApplicationInput("");
            } else {
                toast.error("Maximum 8 applications allowed");
            }
        }
    };

    const removeApplication = (index: number) => {
        setValue("applications", applications.filter((_, i) => i !== index), { shouldValidate: true });
    };

    const validateStep = async (step: number) => {
        if (step === 0) return await trigger(["title", "thumbnailId"]);
        if (step === 1) return await trigger(["shortDescription", "description"]);
        if (step === 2) return await trigger(["applications"]);
        if (step === 3) return await trigger(["specs"]);
        if (step === 4) return await trigger(["benefits"]);
        if (step === 5) return await trigger(["faqs"]);
        if (step === 6) return await trigger(["gallery", "videoId"]);
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

    const onFormSubmit = (data: ProductFormValues) => {
        const { gallery, ...rest } = data;
        onSubmit({
            ...rest,
            imageIds: gallery.map(item => item.imageId),
            specs: data.specs,
            benefits: data.benefits,
            faqs: data.faqs,
        } as any);
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
                onSubmit={handleSubmit((data) => onFormSubmit(data as any))}
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
                        {/* Step 1: Basic Information */}
                        {currentStep === 0 && (
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Title</label>
                                    <Input
                                        {...register("title")}
                                        placeholder="e.g. Ultra Resistant Shade Cloth"
                                        className="h-10 border-gray-200"
                                        error={errors.title?.message}
                                        disabled={isLoading}
                                    />
                                </div>
                                <ImageUpload
                                    value={thumbnailUrl}
                                    label="Listing Thumbnail"
                                    mediaId={thumbnailId || undefined}
                                    folder="products/thumbnails"
                                    onChange={(id, url) => {
                                        setValue("thumbnailId", id, { shouldValidate: true });
                                        setValue("thumbnailUrl", url);
                                    }}
                                    onRemove={() => {
                                        setValue("thumbnailId", "");
                                        setValue("thumbnailUrl", undefined);
                                    }}
                                    onLoadingChange={onLoadingChange}
                                    showsuggestion={true}
                                />
                                {errors.thumbnailId && <p className="text-xs text-red-500 font-medium mt-1">{errors.thumbnailId.message}</p>}


                                <ImageUpload
                                    label="Cover Image (Optional Banner)"
                                    value={coverImageUrl}
                                    mediaId={coverImageId || undefined}
                                    folder="products/covers"
                                    onChange={(id, url) => {
                                        setValue("coverImageId", id);
                                        setValue("coverImageUrl", url);
                                    }}
                                    onRemove={() => {
                                        setValue("coverImageId", null);
                                        setValue("coverImageUrl", undefined);
                                    }}
                                    onLoadingChange={onLoadingChange}
                                />
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <ActiveToggle
                                        label="Featured Product"
                                        value={watch("isFeatured")}
                                        onChange={(val) => setValue("isFeatured", val)}
                                    />
                                    <ActiveToggle
                                        label="Visible on Store"
                                        value={watch("isActive")}
                                        onChange={(val) => setValue("isActive", val)}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Content */}
                        {currentStep === 1 && (
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Short Description</label>
                                    <Textarea
                                        {...register("shortDescription")}
                                        placeholder="Brief value proposition..."
                                        className="min-h-[100px] resize-none border-gray-200"
                                        error={errors.shortDescription?.message}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Details</label>
                                    <QuillEditor
                                        value={watch("description")}
                                        onChange={(val) => setValue("description", val)}
                                        placeholder="Detailed narrative about materials, results, and features..."
                                        maxLength={5000}
                                        className="min-h-[350px]"
                                        error={errors.description?.message}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 3: Applications */}
                        {currentStep === 2 && (
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-4">
                                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Applications (1-8 Tags)</label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={applicationInput}
                                            onChange={(e) => setApplicationInput(e.target.value.toLowerCase())}
                                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addApplication())}
                                            placeholder="e.g. Shopping Malls, Car Parks..."
                                            className="h-10 border-gray-200"
                                            disabled={applications.length >= 8 || isLoading}
                                        />
                                        <Button
                                            type="button"
                                            onClick={addApplication}
                                            variant="outline"
                                            className="h-10 px-4 border-gray-200 shadow-none border-dashed border-2 hover:text-primary transition-all text-gray-500"
                                            disabled={!applicationInput.trim() || applications.length >= 8}
                                        >
                                            <Plus size={18} />
                                        </Button>
                                    </div>

                                    {errors.applications && <p className="text-xs text-red-500 font-medium">{errors.applications.message}</p>}

                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {applications.length === 0 && (
                                            <div className="w-full py-5 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-xl text-xs">
                                                No tags added yet
                                            </div>
                                        )}
                                        {applications.map((app, i) => (
                                            <div key={i} className="w-full flex items-center justify-between gap-2 bg-gray-50 text-gray-700 border border-gray-200 px-3 py-2 rounded-lg text-xs font-medium group transition-all hover:border-primary/20">
                                                <span className="flex items-center gap-2">
                                                    <Tag size={14} className="text-primary" />
                                                    <p className="capitalize text-md">
                                                        {app}
                                                    </p>
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeApplication(i)}
                                                    className="hover:text-red-500 cursor-pointer text-gray-400 opacity-60 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Specs & Benefits */}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Technical Specifications</label>
                                    <span className="text-[10px] text-gray-400 font-medium">{specFields.length}/8</span>
                                </div>

                                <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
                                    {specFields.map((field, index) => (
                                        <div key={field.id} className="p-3 bg-gray-50/50 rounded-xl flex gap-3 pr-10 relative group border-b border-gray-100">
                                            <button type="button" onClick={() => removeSpec(index)} className="cursor-pointer absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                                            <div className="grid grid-cols-1 gap-3 w-full">
                                                <Input {...register(`specs.${index}.title`)} placeholder="Parameter" className="h-9 text-xs bg-white border-gray-200" />
                                                <Textarea rows={2} maxLength={300}  {...register(`specs.${index}.description`)} placeholder="Value" className="h-9 text-xs bg-white border-gray-200" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {specFields.length < 8 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => appendSpec({ title: "", description: "" })}
                                        className="w-full border-dashed border-2 py-4 text-gray-800 hover:text-primary transition-all mt-4 shadow-none"
                                    >
                                        <Plus size={18} className="mr-2" /> Add New Specification
                                    </Button>
                                )}
                                {errors.specs && <p className="text-xs text-red-500 font-medium">{errors.specs.message || (errors.specs as any).root?.message}</p>}
                            </div>

                        )}

                        {currentStep === 4 && (
                            <div className="space-y-4 border-t pt-8">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Benefits</label>
                                    <span className="text-[10px] text-gray-400 font-medium">{benefitFields.length}/8</span>
                                </div>

                                <div className="grid grid-cols-1 gap-3 ">
                                    {benefitFields.map((field, index) => (
                                        <div key={field.id} className="relative group">
                                            <Input
                                                {...register(`benefits.${index}.title`)}
                                                placeholder="Benefit description..."
                                                className="h-10 pl-3 pr-10 text-xs rounded-lg border-gray-200 bg-gray-50/50 focus:bg-white transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeBenefit(index)}
                                                className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}

                                    {benefitFields.length < 8 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"

                                            onClick={() => appendBenefit({ title: "" })}
                                            className="w-full border-dashed border-2 py-4 text-gray-500 hover:text-primary transition-all mt-1 shadow-none"
                                        >
                                            <Plus size={18} className="mr-2" /> Add New Benefit
                                        </Button>
                                    )}
                                </div>
                                {errors.benefits && <p className="text-xs text-red-500 font-medium">{errors.benefits.message || (errors.benefits as any).root?.message}</p>}
                            </div>
                        )}


                        {/* Step 6: FAQs */}
                        {currentStep === 5 && (
                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Support FAQ (Max 5)</label>
                                    <span className="text-[10px] text-gray-400 font-medium">{faqFields.length}/5</span>
                                </div>

                                <div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[420px]">
                                    {faqFields.map((field, index) => (
                                        <div key={field.id} className="p-4 space-y-3 relative group border-b border-gray-200">
                                            <div className="flex gap-3 items-center">
                                                <Input {...register(`faqs.${index}.question`)} placeholder="Question" className="h-10 rounded-lg bg-gray-50/50 focus:bg-white text-xs font-medium" />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() => removeFaq(index)}
                                                    className="text-red-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0 shrink-0"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                            <Textarea {...register(`faqs.${index}.answer`)} placeholder="Provide a helpful response..." className="resize-none min-h-[80px] rounded-lg bg-gray-50/50 focus:bg-white text-xs px-4 py-2" />
                                        </div>
                                    ))}
                                </div>

                                {faqFields.length < 5 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => appendFaq({ question: "", answer: "" })}
                                        className="w-full border-dashed border-2 py-4 text-gray-500 hover:text-primary transition-all mt-4 shadow-none"
                                    >
                                        <Plus size={18} className="mr-2" /> Add New FAQ
                                    </Button>
                                )}
                                {errors.faqs && <p className="text-xs text-red-500 font-medium pt-2">{errors.faqs.message || (errors.faqs as any).root?.message}</p>}
                            </div>
                        )}

                        {/* Step 7: Visual Assets (Gallery & Video) */}
                        {currentStep === 6 && (
                            <div className="grid grid-cols-1 gap-10">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Gallery</label>
                                        <span className="text-[10px] text-gray-400 font-medium">{galleryFields.length}/8</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {galleryFields.map((field, index) => (
                                            <div key={field.id} className="relative group animate-in zoom-in-95 duration-200">
                                                <div className="absolute top-2 right-2 z-10">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeImage(index)}
                                                        className={`h-6 w-6 bg-white shadow-xl border border-gray-100 rounded-lg text-red-500 hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all`}
                                                        disabled={galleryFields.length === 1}
                                                    >
                                                        <Trash2 size={12} />
                                                    </Button>
                                                </div>
                                                <ImageUpload
                                                    value={watch(`gallery.${index}.url`)}
                                                    mediaId={watch(`gallery.${index}.imageId`)}
                                                    folder="products/gallery"
                                                    label=""
                                                    showsuggestion={false}
                                                    onChange={(id, url) => {
                                                        setValue(`gallery.${index}.imageId`, id, { shouldValidate: true });
                                                        setValue(`gallery.${index}.url`, url);
                                                    }}
                                                    onRemove={() => {
                                                        setValue(`gallery.${index}.imageId`, "");
                                                        setValue(`gallery.${index}.url`, "");
                                                    }}
                                                    onLoadingChange={onLoadingChange}
                                                />
                                            </div>
                                        ))}

                                        {galleryFields.length < 8 && (
                                            <button
                                                type="button"
                                                onClick={() => appendImage({ imageId: "", url: "" })}
                                                className="aspect-square w-full cursor-pointer flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50 text-gray-400 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all group"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-white border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                                    <Plus size={24} />
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Add Media</span>
                                            </button>
                                        )}
                                    </div>
                                    {errors.gallery && !Array.isArray(errors.gallery) && (
                                        <p className="text-xs text-red-500 font-medium pt-2">{(errors.gallery as any).message || (errors.gallery as any).root?.message}</p>
                                    )}
                                </div>

                                <div className="space-y-4 border-t pt-8">
                                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block">Product Video (Required)</label>
                                    <VideoUpload
                                        label=""
                                        value={videoUrl}
                                        mediaId={videoId || undefined}
                                        folder="products/videos"
                                        onChange={(id, url) => {
                                            setValue("videoId", id, { shouldValidate: true });
                                            setValue("videoUrl", url);
                                        }}
                                        onRemove={() => {
                                            setValue("videoId", "", { shouldValidate: true });
                                            setValue("videoUrl", undefined);
                                        }}
                                        onLoadingChange={onLoadingChange}
                                        showsuggestion={true}
                                    />
                                    {errors.videoId && (
                                        <p className="text-xs text-red-500 font-medium mt-1">{errors.videoId.message}</p>
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
                                Next Step <ChevronRight size={18} className="ml-2" />
                            </Button>
                        ) : (
                            <Button
                                key="submit-step-btn"
                                type="submit"
                                variant={"default"}
                                className=""
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : initialData ? "Confirm Update" : "Publish Product"}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
