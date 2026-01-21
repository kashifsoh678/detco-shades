"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Plus, Trash2, Info, ChevronRight,
    ChevronLeft, Check, Layers, BookOpen,
    ListChecks, Image as ImageIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import QuillEditor from "@/components/ui/QuillEditor";
import IconPicker from "./IconPicker";
import ImageUpload from "./ImageUpload";
import ActiveToggle from "./ActiveToggle";
import { Service, ServiceCreate } from "@/hooks/use-services";
import { cn } from "@/lib/utils";

const serviceSchema = z.object({
    title: z.string().trim().min(1, "Title is required").max(200),
    slug: z.string().trim().min(1, "Slug is required").max(200),
    shortDescription: z.string().trim().min(1, "Short description is required").max(300),
    details: z.string().min(1, "Details are required"),
    iconName: z.string().min(1, "Icon is required"),
    coverImageId: z.string().nullable(),
    coverImageUrl: z.string().optional(),
    features: z
        .array(z.string().trim().min(1, "Feature name cannot be empty"))
        .min(1, "At least one feature is required")
        .max(10, "Maximum 10 features are allowed"),
    processSteps: z
        .array(
            z.object({
                title: z.string().trim().min(1, "Step title is required").max(100),
                description: z.string().trim().min(1, "Step description is required").max(300),
            })
        )
        .min(1, "At least one process step is required")
        .max(10, "Maximum 10 process steps are allowed"),
    isActive: z.boolean(),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
    initialData?: Service | null;
    onSubmit: (data: ServiceCreate) => void;
    isLoading?: boolean;
    onLoadingChange?: (loading: boolean) => void;
}

const STEPS = [
    { id: "basic", title: "Basic Information", icon: Info },
    { id: "media", title: "Media & Features", icon: Layers },
    { id: "process", title: "Process Workflow", icon: ListChecks },
    { id: "details", title: "Comprehensive Details", icon: BookOpen },
];

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
    const [currentStep, setCurrentStep] = useState(0);

    const form = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceSchema),
        mode: "onSubmit",
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
        trigger,
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

    const validateStep = async (step: number) => {
        if (step === 0) {
            return await trigger(["title", "shortDescription", "iconName"]);
        }
        if (step === 1) {
            return await trigger(["features"]);
        }
        if (step === 2) {
            return await trigger(["processSteps"]);
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
                {/* 4-Part Progress Bar */}
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
                    // Prevent form submission on Enter key
                    if (e.key === "Enter") {
                        if (e.target instanceof HTMLInputElement) {
                            e.preventDefault();
                            nextStep();
                        } else if (e.target instanceof HTMLButtonElement) {
                            // Prevent buttons from triggering form submit on Enter if they are inside the form
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
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Service Title</label>
                                    <Input
                                        {...register("title")}
                                        placeholder="e.g. Design & Engineering"
                                        error={errors.title?.message}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Short Summary</label>
                                    <Textarea
                                        {...register("shortDescription")}
                                        placeholder="Enter a brief overview (Max 300 chars)..."
                                        rows={3}
                                        error={errors.shortDescription?.message}
                                        disabled={isLoading}
                                        className="resize-none min-h-[120px]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Feature Icon</label>
                                    <IconPicker
                                        value={watch("iconName")}
                                        onChange={(val) => setValue("iconName", val)}
                                        className="bg-white"
                                    />
                                </div>
                                <div className="flex flex-col justify-end">
                                    <ActiveToggle
                                        value={watch("isActive")}
                                        onChange={(val) => setValue("isActive", val)}
                                    />
                                </div>


                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="grid grid-cols-1 gap-6">

                                {/* Cover Image */}
                                <div>

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
                                    <p className="text-[10px] text-gray-400 mt-2 italic text-start">
                                        Recommended: 1200x800px or 4:3 ratio
                                    </p>
                                </div>

                                {/* Features List */}
                                <div className="">

                                    <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar o max-h-[250px]">
                                        {featureFields.map((field, index) => (
                                            <div
                                                key={field.id}
                                                className="flex gap-2 group"
                                            >
                                                <Input
                                                    {...register(`features.${index}` as any)}
                                                    placeholder={`Add Feature`}
                                                    disabled={isLoading}
                                                    error={errors.features?.[index]?.message}
                                                    className="h-10"
                                                    maxLength={200}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() => removeFeature(index)}
                                                    className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 h-10 w-10 shrink-0"
                                                    disabled={featureFields.length === 1}
                                                >
                                                    <Trash2 size={18} />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => appendFeature("")}
                                        disabled={featureFields.length >= 10}
                                        className="w-full border-dashed border-2 py-4 text-gray-500 hover:text-primary transition-all  mt-4"
                                    >
                                        <Plus size={18} className="mr-2" /> Add New Feature
                                    </Button>
                                    {errors.features && (
                                        <p className="text-[12px] text-red-500 font-medium pl-1 animate-in fade-in slide-in-from-top-1 mt-2">
                                            {(errors.features as any).message}
                                        </p>
                                    )}
                                </div>

                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="grid grid-cols-1 gap-6">
                                <div className="grid grid-cols-1 gap-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                                    {stepFields.map((field, index) => (
                                        <div
                                            key={field.id}
                                            className="p-2 pb-6  space-y-3 relative group border-b border-gray-200"
                                        >
                                            <div className="flex gap-3 items-center">
                                                <Input
                                                    {...register(`processSteps.${index}.title` as any)}
                                                    placeholder="Phase Name"
                                                    className=""
                                                    disabled={isLoading}
                                                    error={(errors.processSteps as any)?.[index]?.title?.message}
                                                    maxLength={100}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    onClick={() => removeStep(index)}
                                                    className="text-red-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0 shrink-0"
                                                    disabled={stepFields.length === 1}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                            <Textarea
                                                {...register(`processSteps.${index}.description` as any)}
                                                placeholder="Describe this phase..."
                                                rows={3}
                                                className="bg-white min-h-[80px] resize-none"
                                                disabled={isLoading}
                                                error={(errors.processSteps as any)?.[index]?.description?.message}
                                                maxLength={300}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => appendStep({ title: "", description: "" })}
                                    className="w-full border-dashed border-2 py-4 text-gray-500 hover:text-primary transition-all  mt-4"
                                >
                                    <Plus size={16} className="mr-2" /> New Phase
                                </Button>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <>

                                <div className="h-full">
                                    <QuillEditor
                                        value={watch("details")}
                                        onChange={(val) => setValue("details", val)}
                                        placeholder="Elaborate on technical aspects, standards, and results..."
                                        maxLength={5000}
                                        className="min-h-[400px]"
                                        error={errors.details?.message}
                                    />
                                </div>

                            </>
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
                                {isLoading ? "Processing..." : initialData ? "Confirm Update" : "Publish Service"}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ServiceForm;
