"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    CheckCircle2,
    XCircle,
    Layout,
    MapPin,
    Eye,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataModal from "@/components/ui/DataModal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import ProjectForm from "@/components/admin/ProjectForm";
import { useProjects, Project } from "@/hooks/use-projects";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ProjectsPage = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const {
        projectsQuery,
        createMutation,
        updateMutation,
        deleteMutation
    } = useProjects({ all: true });

    const { data: projectsData, isLoading } = projectsQuery;
    const projects = projectsData?.data || [];
    const meta = projectsData?.meta;

    const [isDataModalOpen, setIsDataModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isModalLocked, setIsModalLocked] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [modalType, setModalType] = useState<"create" | "edit">("create");

    const filteredProjects = (projects as Project[]).filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setSelectedProject(null);
        setModalType("create");
        setIsModalLocked(false);
        setIsDataModalOpen(true);
    };

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setModalType("edit");
        setIsModalLocked(false);
        setIsDataModalOpen(true);
    };

    const handleDeleteClick = (project: Project) => {
        setSelectedProject(project);
        setIsConfirmModalOpen(true);
    };

    const onFormSubmit = async (values: any) => {
        try {
            if (modalType === "create") {
                await createMutation.mutateAsync(values);
            } else if (selectedProject) {
                await updateMutation.mutateAsync({ id: selectedProject.id, ...values });
            }
            setIsDataModalOpen(false);
        } catch (error) {
            // Handled by hook
        }
    };

    const onConfirmDelete = async () => {
        if (selectedProject) {
            try {
                await deleteMutation.mutateAsync(selectedProject.id);
                setIsConfirmModalOpen(false);
                setSelectedProject(null);
            } catch (error) {
                // Handled by hook
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Projects Gallery</h1>
                    <p className="text-gray-500 text-sm">
                        Showcase your completed works and engineering excellence.
                    </p>
                </div>
                <Button onClick={handleAdd} className="w-full md:w-auto gap-2 rounded-xl h-11 shadow-lg shadow-primary/20">
                    <Plus size={18} />
                    Add New Project
                </Button>
            </div>

            {/* Filters Section */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <Input
                        placeholder="Search projects by title or location..."
                        className="pl-12 bg-gray-50 border-none h-11 rounded-xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Projects Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="h-80 bg-gray-50 animate-pulse rounded-3xl border border-gray-100"
                        />
                    ))}
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-100 rounded-4xl p-20 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
                        <Layout size={48} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">No projects found</h3>
                    <p className="text-gray-500 max-w-xs mt-2">
                        Start showcasing your expertise by adding your first project to the gallery.
                    </p>
                    <Button variant="outline" onClick={handleAdd} className="mt-8 rounded-xl px-8">
                        Launch your first project
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            {/* Project Image Preview */}
                            <div className="relative h-56 bg-gray-100">
                                {project.thumbnail?.url ? (
                                    <Image
                                        src={project.thumbnail.url}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <Layout size={48} />
                                    </div>
                                )}

                                {/* Status Badge */}
                                <div className="absolute top-4 left-4">
                                    {project.isActive ? (
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/90 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg shadow-green-500/20">
                                            <CheckCircle2 size={10} /> Live
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/90 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg shadow-red-500/20">
                                            <XCircle size={10} /> Draft
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="p-2.5 bg-white shadow-xl border border-gray-100 rounded-xl text-primary hover:bg-primary hover:text-white transition-all duration-300 active:scale-95"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(project)}
                                            className="p-2.5 bg-white shadow-xl border border-gray-100 rounded-xl text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 active:scale-95"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Service Label Overlay */}
                                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                    <div className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">
                                            {project.service?.title || "Untagged"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-3">
                                <div className="flex justify-between items-start gap-3">
                                    <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-primary transition-colors" title={project.title}>
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg border">
                                        <ImageIcon size={10} />
                                        {project.images?.length || 0}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <div className="p-1.5 bg-primary/5 rounded-lg text-primary">
                                        <MapPin size={14} />
                                    </div>
                                    <span className="font-medium">{project.location}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {meta && meta.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12 pb-8">
                    <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="rounded-xl px-6 h-11"
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {[...Array(meta.totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={cn(
                                    "w-11 h-11 rounded-xl text-sm font-bold transition-all duration-300",
                                    page === i + 1
                                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110"
                                        : "bg-white text-gray-400 border border-gray-100 hover:border-primary hover:text-primary"
                                )}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        disabled={page === meta.totalPages}
                        onClick={() => setPage(page + 1)}
                        className="rounded-xl px-6 h-11"
                    >
                        Next
                    </Button>
                </div>
            )}

            {/* Form Modal */}
            <DataModal
                isOpen={isDataModalOpen}
                onClose={() => setIsDataModalOpen(false)}
                title="Project"
                type={modalType}
                className="max-w-4xl"
            >
                <ProjectForm
                    initialData={selectedProject}
                    onSubmit={onFormSubmit}
                    isLoading={createMutation.isPending || updateMutation.isPending || isModalLocked}
                    onLoadingChange={setIsModalLocked}
                />
            </DataModal>

            {/* Delete Confirmation */}
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={onConfirmDelete}
                loading={deleteMutation.isPending}
                title="Delete Project"
                description={`Are you sure you want to delete "${selectedProject?.title}"? This will also remove its gallery images. This action cannot be undone.`}
            />
        </div>
    );
};

export default ProjectsPage;