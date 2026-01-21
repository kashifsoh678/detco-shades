"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useServices, Service } from "@/hooks/use-services";

interface ProjectSelectProps {
    value?: string | null;
    onChange: (value: string) => void;
    error?: string;
    disabled?: boolean;
}

const ProjectSelect = ({ value, onChange, error, disabled }: ProjectSelectProps) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const { servicesQuery } = useServices(true); // Fetch all services including inactive ones for admin

    const services: Service[] = servicesQuery.data?.data || [];
    const selectedService = services.find((s) => s.id === value);

    const filteredServices = services.filter((s) =>
        s.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-full justify-between h-12 px-4 rounded-xl font-medium",
                            !value && "text-muted-foreground",
                            error && "border-red-500 bg-red-50/10"
                        )}
                        disabled={disabled || servicesQuery.isLoading}
                    >
                        {selectedService ? selectedService.title : "Select a service..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-(--radix-popover-trigger-width) p-0 shadow-xl border border-gray-100 rounded-xl overflow-hidden" align="start">
                    <div className="flex items-center border-b px-3 h-11  bg-white">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-gray-400" />
                        <input
                            className="flex h-full w-full bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Search service..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1 bg-white custom-scrollbar">
                        {servicesQuery.isLoading ? (
                            <div className="py-6 text-center text-sm text-gray-500">Loading services...</div>
                        ) : filteredServices.length === 0 ? (
                            <div className="py-6 text-center text-sm text-gray-500">No services found.</div>
                        ) : (
                            filteredServices.map((service) => (
                                <div
                                    key={service.id}
                                    className={cn(
                                        "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm outline-hidden transition-colors hover:bg-primary/5 hover:text-primary",
                                        value === service.id ? "bg-primary/10 text-primary font-bold" : "text-gray-700"
                                    )}
                                    onClick={() => {
                                        onChange(service.id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === service.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {service.title}
                                </div>
                            ))
                        )}
                    </div>
                </PopoverContent>
            </Popover>
            {error && (
                <p className="text-[12px] text-red-500 font-medium pl-1 animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
};

export default ProjectSelect;
