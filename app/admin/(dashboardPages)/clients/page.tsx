"use client"

import React, { useState } from 'react'
import { Plus, Search, MoreVertical, Edit2, Trash2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DataModal from '@/components/ui/DataModal'
import ConfirmModal from '@/components/ui/ConfirmModal'
import ClientForm from '@/components/admin/ClientForm'
import { useClients } from '@/hooks/use-clients'
import { Client } from '@/types/clients'
import Image from 'next/image'

const ClientsPage = () => {
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const {
        clients,
        meta,
        isLoading,
        createClient,
        updateClient,
        deleteClient,
        isCreating,
        isUpdating,
        isDeleting
    } = useClients(page, 12, true)

    const [isDataModalOpen, setIsDataModalOpen] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isModalLocked, setIsModalLocked] = useState(false)
    const [selectedClient, setSelectedClient] = useState<Client | null>(null)
    const [modalType, setModalType] = useState<'create' | 'edit'>('create')

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleAdd = () => {
        setSelectedClient(null)
        setModalType('create')
        setIsModalLocked(false)
        setIsDataModalOpen(true)
    }

    const handleEdit = (client: Client) => {
        setSelectedClient(client)
        setModalType('edit')
        setIsModalLocked(false)
        setIsDataModalOpen(true)
    }

    const handleDeleteClick = (client: Client) => {
        setSelectedClient(client)
        setIsConfirmModalOpen(true)
    }

    const onFormSubmit = async (values: any) => {
        try {
            if (modalType === 'create') {
                await createClient(values)
            } else if (selectedClient) {
                await updateClient({ id: selectedClient.id, ...values })
            }
            setIsDataModalOpen(false)
        } catch (error) {
            // Error is handled by the hook/toast
        }
    }

    const onConfirmDelete = async () => {
        if (selectedClient) {
            try {
                await deleteClient(selectedClient.id)
                setIsConfirmModalOpen(false)
                setSelectedClient(null)
            } catch (error) {
                // Error handled by hook
            }
        }
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Clients & Partners</h1>
                    <p className="text-gray-500 text-sm">Manage the brands and clients displayed on your website.</p>
                </div>
                <Button onClick={handleAdd} className="w-full md:w-auto gap-2">
                    <Plus size={18} />
                    Add Client
                </Button>
            </div>

            {/* Filters Section */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        placeholder="Search clients..."
                        className="pl-10 bg-gray-50 border-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Clients Grid */}
            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-gray-50 animate-pulse rounded-2xl aspect-square border border-gray-100" />
                    ))}
                </div>
            ) : filteredClients.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-100 rounded-3xl p-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                        <Search size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">No clients found</h3>
                    <p className="text-gray-500 max-w-xs">Try adjusting your search or add a new client to get started.</p>
                    <Button variant="outline" onClick={handleAdd} className="mt-6">
                        Add your first client
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {filteredClients.map((client) => (
                        <div
                            key={client.id}
                            className="group relative bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="relative aspect-square rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden mb-4">
                                {client.image?.url ? (
                                    <Image
                                        src={client.image.url}
                                        alt={client.name}
                                        fill
                                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <ExternalLink size={24} className="text-gray-300" />
                                )}

                                {!client.isActive && (
                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-gray-800/80 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                        Inactive
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-bold text-gray-900 truncate capitalize">{client.name}</h3>
                            </div>

                            {/* Action Menu */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleEdit(client)}
                                        className="p-1.5 bg-white shadow-lg border border-gray-100 rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(client)}
                                        className="p-1.5 bg-white shadow-lg border border-gray-100 rounded-lg text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-gray-500">
                        Page {meta.page} of {meta.totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === meta.totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}

            {/* Form Modal */}
            <DataModal
                isOpen={isDataModalOpen}
                onClose={() => setIsDataModalOpen(false)}
                title="Client"
                type={modalType}
            >
                <ClientForm
                    initialData={selectedClient}
                    onSubmit={onFormSubmit}
                    isLoading={isCreating || isUpdating || isModalLocked}
                    onLoadingChange={setIsModalLocked}
                />
            </DataModal>

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={onConfirmDelete}
                loading={isDeleting}
                title="Delete Client"
                description={`Are you sure you want to delete ${selectedClient?.name}? This action cannot be undone.`}
            />
        </div>
    )
}

export default ClientsPage