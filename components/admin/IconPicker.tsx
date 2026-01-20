"use client";

import React, { useState, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";
import { Button } from "@/components/ui/button";

interface IconPickerProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

// Filter out types and non-icon exports
const ICON_NAMES = Object.keys(LucideIcons).filter(
    (key) =>
        typeof (LucideIcons as any)[key] === "function" ||
        (typeof (LucideIcons as any)[key] === "object" &&
            (LucideIcons as any)[key].displayName)
);

const IconPicker = ({ value, onChange, className }: IconPickerProps) => {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const filteredIcons = useMemo(() => {
        return ICON_NAMES.filter((name) =>
            name.toLowerCase().includes(search.toLowerCase())
        ).slice(0, 100); // Limit to 100 for performance
    }, [search]);

    const SelectedIcon = (LucideIcons as any)[value] || LucideIcons.HelpCircle;

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={`w-full justify-start gap-2 h-10 ${className}`}
                >
                    <SelectedIcon className="w-4 h-4" />
                    <span className="truncate">{value || "Select an icon"}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2 shadow-xl" align="start">
                <div className="space-y-2">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search icons..."
                            className="pl-8 h-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-5 gap-1 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                        {filteredIcons.map((name) => {
                            const Icon = (LucideIcons as any)[name];
                            return (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => {
                                        onChange(name);
                                        setIsOpen(false);
                                    }}
                                    className={`p-2 rounded-md hover:bg-gray-100 flex items-center justify-center transition-colors ${value === name ? "bg-accent text-accent-foreground" : ""
                                        }`}
                                    title={name}
                                >
                                    <Icon className="w-5 h-5" />
                                </button>
                            );
                        })}
                    </div>
                    {filteredIcons.length === 0 && (
                        <p className="text-xs text-center text-muted-foreground py-4">
                            No icons found.
                        </p>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default IconPicker;
