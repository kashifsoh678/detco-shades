"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface ActiveToggleProps {
    value: boolean;
    onChange: (value: boolean) => void;
    label?: string;
    description?: string;
}

const ActiveToggle = ({ value, onChange, label = "Active Status", description = "Visible on live website" }: ActiveToggleProps) => {
    return (
        <div
            onClick={() => onChange(!value)}
            className={cn(
                "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group select-none bg-primary/5 border-primary/20 shadow-sm"
            )}
        >
            <div className="flex flex-col gap-0.5">
                <span className={cn(
                    "text-sm font-bold transition-colors",
                    value ? "text-primary" : "text-gray-700"
                )}>
                    {label}
                </span>
                {description && <p className="text-[10px] text-gray-500">{description}</p>}
            </div>

            <div className={cn(
                "w-12 h-6 rounded-full relative transition-all duration-300",
                value ? "bg-primary shadow-inner" : "bg-gray-200"
            )}>
                <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center",
                    value ? "left-7" : "left-1"
                )}>
                    {value ? (
                        <Check size={10} className="text-primary" strokeWidth={4} />
                    ) : (
                        <X size={10} className="text-gray-400" strokeWidth={4} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActiveToggle;
