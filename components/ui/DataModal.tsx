"use client"

import React from 'react'
import Modal from './Modal'

interface DataModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    type: 'create' | 'edit';
    children: React.ReactNode;
    preventClose?: boolean;
}

const DataModal: React.FC<DataModalProps> = ({
    isOpen,
    onClose,
    title,
    type,
    children,
    preventClose = true
}) => {
    const displayTitle = type === 'create' ? `Add New ${title}` : `Edit ${title}`;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={displayTitle}
            preventClose={preventClose}
        >
            <div className="max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
                {children}
            </div>
        </Modal>
    )
}

export default DataModal
