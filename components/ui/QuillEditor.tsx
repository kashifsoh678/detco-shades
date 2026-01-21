"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { cn } from "@/lib/utils";

interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxLength?: number;
    className?: string;
    error?: string;
}

const QuillEditor = ({
    value,
    onChange,
    placeholder,
    maxLength,
    className,
    error,
}: QuillEditorProps) => {
    // Dynamically import ReactQuill to avoid SSR issues
    const ReactQuill = useMemo(
        () => dynamic(() => import("react-quill-new"), { ssr: false }),
        []
    );

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "link",
    ];

    // Better character count by stripping HTML properly
    const characterCount = useMemo(() => {
        if (typeof window === "undefined") return 0;
        const div = document.createElement("div");
        div.innerHTML = value;
        return (div.textContent || div.innerText || "").length;
    }, [value]);

    return (
        <div className={`space-y-1  ${className}`}>
            <div className={cn(
                "bg-white rounded-md border overflow-hidden h-full",
                error ? "border-red-500" : "border-gray-200"
            )}>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                    placeholder={placeholder}
                    className="h-full min-h-[380px]"
                />
            </div>
            <div className="flex justify-between items-center px-1">
                <div className="flex-1">
                    {error && (
                        <p className="text-[12px] text-red-500 font-medium pl-1 animate-in fade-in slide-in-from-top-1">
                            {error}
                        </p>
                    )}
                </div>
                {maxLength && (
                    <div className="text-[10px] text-gray-400 shrink-0 ml-4">
                        <span
                            className={characterCount > maxLength ? "text-red-500 font-bold" : ""}
                        >
                            {characterCount}
                        </span>
                        /{maxLength} characters
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuillEditor;
