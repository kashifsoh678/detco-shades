"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ImageUpload from './ImageUpload'
import { Client } from '@/types/clients'

const clientSchema = z.object({
    name: z.string().min(1, "Name is required"),
    imageId: z.string().min(1, "Image is required"),
    imageUrl: z.string().min(1, "Image is required"),
    order: z.number().int(),
    isActive: z.boolean(),
})

type ClientFormValues = z.infer<typeof clientSchema>

interface ClientFormProps {
    initialData?: Client | null;
    onSubmit: (data: ClientFormValues) => Promise<void>;
    isLoading: boolean;
    onLoadingChange?: (loading: boolean) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({
    initialData,
    onSubmit,
    isLoading,
    onLoadingChange
}) => {
    const [isImageUploading, setIsImageUploading] = React.useState(false)

    React.useEffect(() => {
        onLoadingChange?.(isLoading || isImageUploading)
    }, [isLoading, isImageUploading, onLoadingChange])
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<ClientFormValues>({
        resolver: zodResolver(clientSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            imageId: initialData.imageId,
            imageUrl: initialData.image?.url || "",
            order: initialData.order,
            isActive: initialData.isActive,
        } : {
            name: "",
            imageId: "",
            imageUrl: "",
            order: 0,
            isActive: true,
        }
    })

    const imageUrl = watch("imageUrl")

    const handleFormSubmit = (data: ClientFormValues) => {
        onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit as any)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Client Name</label>
                    <Input
                        {...register("name")}
                        placeholder="Enter client/brand name"
                        disabled={isLoading}
                        className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500">{errors.name.message}</p>
                    )}
                </div>

                <ImageUpload
                    label="Client Logo"
                    value={imageUrl}
                    mediaId={watch("imageId")}
                    folder="clients"
                    onLoadingChange={setIsImageUploading}
                    onChange={(id, url) => {
                        setValue("imageId", id)
                        setValue("imageUrl", url)
                    }}
                    onRemove={() => {
                        setValue("imageId", "")
                        setValue("imageUrl", "")
                    }}
                />
                {errors.imageId && (
                    <p className="text-xs text-red-500">{errors.imageId.message}</p>
                )}

                <div className="grid grid-cols-2 gap-4">
                    {/* <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Display Order</label>
                        <Input
                            type="number"
                            {...register("order", { valueAsNumber: true })}
                            disabled={true}
                            className="bg-gray-50 cursor-not-allowed"
                        />
                    </div> */}

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            {...register("isActive")}
                            disabled={isLoading}
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                        />
                        <label htmlFor="isActive" className="text-sm font-semibold text-gray-700 cursor-pointer">
                            Active
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 border-t pt-4  border-gray-100 ">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Saving...
                        </div>
                    ) : (
                        initialData ? 'Update Client' : 'Add Client'
                    )}
                </Button>
            </div>
        </form>
    )
}

export default ClientForm
