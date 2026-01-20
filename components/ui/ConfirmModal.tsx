"use client"

import React from 'react'
import Modal from './Modal'
import { Button } from './button'

interface ConfirmModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
    variant?: 'default' | 'destructive';
    preventClose?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    onConfirm,
    loading = false,
    variant = 'destructive',
    preventClose
}) => {
    return (
        <Modal
            title={title}
            description={description}
            isOpen={isOpen}
            onClose={onClose}
            preventClose={preventClose || loading}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                    disabled={loading}
                    variant="outline"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    disabled={loading}
                    variant={variant}
                    onClick={onConfirm}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing...
                        </div>
                    ) : 'Continue'}
                </Button>
            </div>
        </Modal>
    )
}

export default ConfirmModal
