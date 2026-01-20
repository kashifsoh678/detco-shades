"use client";

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, LayoutGrid, ListChecks, Info, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QuillEditor from "@/components/ui/QuillEditor";
import IconPicker from "./IconPicker";
import ImageUpload from "./ImageUpload";
import { Service, ServiceCreate } from "@/hooks/use-services";

const serviceSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    shortDescription: z.string().min(1, "Short description is required").max(200),
    details: z.string().min(1, "Details are required"),
    iconName: z.string().min(1, "Icon is required"),
    coverImageId: z.string().nullable(),
    coverImageUrl: z.string().optional(),
    features: z.array(z.string()).min(1, "At least one feature is required"),
    processSteps: z
        .array(
            z.object({
                title: z.string().min(1, "Step title is required"),
                description: z.string().min(1, "Step description is required"),
            })
        )
        .min(1, "At least one process step is required"),
    isActive: z.boolean(),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
    initialData?: Service | null;
    onSubmit: (data: ServiceCreate) => void;
    isLoading?: boolean;
    onLoadingChange?: (loading: boolean) => void;
}

const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
};

const ServiceForm = ({
    initialData,
    onSubmit,
    isLoading,
    onLoadingChange,
}: ServiceFormProps) => {
    const form = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceSchema),
        defaultValues: initialData
            ? {
                ...initialData,
                coverImageUrl: initialData.coverImage?.url,
            }
            : {
                title: "",
                slug: "",
                shortDescription: "",
                details: "",
                iconName: "PenTool",
                coverImageId: null,
                features: [""],
                processSteps: [{ title: "", description: "" }],
                isActive: true,
            },
    });

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = form;

    const {
        fields: featureFields,
        append: appendFeature,
        remove: removeFeature,
    } = useFieldArray({
        control,
        name: "features" as any,
    });

    const {
        fields: stepFields,
        append: appendStep,
        remove: removeStep,
    } = useFieldArray({
        control,
        name: "processSteps" as any,
    });

    const title = watch("title");
    useEffect(() => {
        if (!initialData && title) {
            setValue("slug", slugify(title));
        }
    }, [title, setValue, initialData]);

    const coverImageUrl = watch("coverImageUrl");
    const coverImageId = watch("coverImageId");

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data as any))} className="space-y-8 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Basic Info */}
                <div className="space-y-6">
                    <div className="space-y-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider">
                            <Info size={16} /> Basic Information
                        </h3>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                            <Input
                                {...register("title")}
                                placeholder="e.g. Design & Engineering"
                                error={errors.title?.message}
                                disabled={isLoading}
                                className="font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Slug (Unique URL)</label>
                            <Input
                                {...register("slug")}
                                placeholder="design-engineering"
                                error={errors.slug?.message}
                                disabled={isLoading}
                                className="bg-gray-50 font-mono text-xs"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase">Short Description</label>
                            <Input
                                {...register("shortDescription")}
                                placeholder="Brief summary for cards"
                                error={errors.shortDescription?.message}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Service Icon</label>
                                <IconPicker
                                    value={watch("iconName")}
                                    onChange={(val) => setValue("iconName", val)}
                                />
                            </div>
                            <div className="flex items-center gap-3 pt-6">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    {...register("isActive")}
                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                />
                                <label htmlFor="isActive" className="text-sm font-bold text-gray-700 cursor-pointer">
                                    Active & Visible
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider">
                            <LayoutGrid size={16} /> Cover Image
                        </h3>
                        <ImageUpload
                            value={coverImageUrl}
                            mediaId={coverImageId || undefined}
                            folder="services"
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
                    </div>
                </div>

                {/* Right Column: Details & Lists */}
                <div className="space-y-6">
                    <div className="space-y-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider">
                            <ListChecks size={16} /> Features
                        </h3>
                        <div className="space-y-3">
                            {featureFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <Input
                                        {...register(`features.${index}` as any)}
                                        placeholder={`Feature #${index + 1}`}
                                        disabled={isLoading}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => removeFeature(index)}
                                        className="text-red-500 hover:bg-red-50 px-2"
                                        disabled={featureFields.length === 1}
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => appendFeature("")}
                                className="w-full border-dashed border-2 text-gray-500 hover:text-primary"
                            >
                                <Plus size={16} className="mr-1" /> Add Feature
                            </Button>
                            {errors.features && (
                                <p className="text-xs text-red-500 font-medium">{errors.features.message as string}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider">
                            <ChevronRight size={16} /> Process Steps
                        </h3>
                        <div className="space-y-4">
                            {stepFields.map((field, index) => (
                                <div key={field.id} className="p-3 bg-gray-50 rounded-lg space-y-2 relative group">
                                    <div className="flex gap-2 items-center">
                                        <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-[10px] font-bold text-gray-600">
                                            {index + 1}
                                        </span>
                                        <Input
                                            {...register(`processSteps.${index}.title` as any)}
                                            placeholder="Step Title"
                                            className="bg-white"
                                            disabled={isLoading}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => removeStep(index)}
                                            className="text-red-500 hover:bg-red-50 h-8 w-8 p-0"
                                            disabled={stepFields.length === 1}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                    <textarea
                                        {...register(`processSteps.${index}.description` as any)}
                                        placeholder="Brief description of this step"
                                        rows={2}
                                        className="w-full p-2 text-sm border rounded-md focus:ring-primary focus:border-primary border-gray-200 resize-none bg-white"
                                        disabled={isLoading}
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => appendStep({ title: "", description: "" })}
                                className="w-full border-dashed border-2 text-gray-500 hover:text-primary"
                            >
                                <Plus size={16} className="mr-1" /> Add Step
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details: Rich Text */}
            <div className="space-y-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
                <h3 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wider">
                    Full Details (Rich Text)
                </h3>
                <QuillEditor
                    value={watch("details")}
                    onChange={(val) => setValue("details", val)}
                    placeholder="Describe your service in detail..."
                    maxLength={5000}
                />
                {errors.details && (
                    <p className="text-xs text-red-500 font-medium">{errors.details.message}</p>
                )}
            </div>

            <div className="flex justify-end pt-5">
                <Button
                    type="submit"
                    className="bg-primary text-white hover:bg-primary/90 px-10 h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20"
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : initialData ? "Update Service" : "Create Service"}
                </Button>
            </div>
        </form>
    );
};

export default ServiceForm;
