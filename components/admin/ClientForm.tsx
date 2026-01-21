"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ImageUpload from './ImageUpload'
import ActiveToggle from './ActiveToggle'
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
    const isActive = watch("isActive")

    const handleFormSubmit = (data: ClientFormValues) => {
        onSubmit(data)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit as any)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Client Name</label>
                    <Input
                        {...register("name")}
                        placeholder="e.g. Acme Corp"
                        disabled={isLoading}
                        error={errors.name?.message}
                    />
                </div>

                <div className="space-y-2">
                    <ImageUpload
                        label="Brand Logo"
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
                        <p className="text-[12px] text-red-500 font-medium pl-1 animate-in fade-in slide-in-from-top-1">{errors.imageId.message}</p>
                    )}
                </div>

                <div className="pt-2">
                    <ActiveToggle
                        value={isActive}
                        onChange={(val) => setValue("isActive", val)}
                        label="Client Status"
                        description="Toggle visibility in the client showcase"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 border-t pt-8 mt-4 border-gray-100">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className=""
                >
                    {isLoading ? "Saving Changes..." : (initialData ? 'Update Client' : 'Add Client')}
                </Button>
            </div>
        </form>
    )
}

export default ClientForm
