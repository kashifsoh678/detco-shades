"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from '@/lib/utils'

interface ModalProps {
    title: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    className?: string;
    preventClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    children,
    className,
    preventClose = false
}) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent
                className={cn("max-w-md sm:max-w-lg", className)}
                onInteractOutside={(e) => {
                    if (preventClose) {
                        e.preventDefault();
                    }
                }}
                onEscapeKeyDown={(e) => {
                    if (preventClose) {
                        e.preventDefault();
                    }
                }}
            >
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
                    {description && (
                        <DialogDescription className="text-gray-500">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
                <div className="py-2">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Modal
