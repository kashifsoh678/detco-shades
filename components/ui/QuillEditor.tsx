"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

interface QuillEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxLength?: number;
    className?: string;
}

const QuillEditor = ({
    value,
    onChange,
    placeholder,
    maxLength,
    className,
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

    const characterCount = value.replace(/<[^>]*>/g, "").length;

    return (
        <div className={`space-y-1 ${className}`}>
            <div className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm">
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={(content) => {
                        if (maxLength) {
                            const text = content.replace(/<[^>]*>/g, "");
                            if (text.length <= maxLength || content.length < value.length) {
                                onChange(content);
                            }
                        } else {
                            onChange(content);
                        }
                    }}
                    modules={modules}
                    formats={formats}
                    placeholder={placeholder}
                    className="min-h-[200px]"
                />
            </div>
            {maxLength && (
                <div className="flex justify-end text-[10px] text-gray-400">
                    <span
                        className={characterCount > maxLength ? "text-red-500 font-bold" : ""}
                    >
                        {characterCount}
                    </span>
                    /{maxLength} characters
                </div>
            )}
        </div>
    );
};

export default QuillEditor;
