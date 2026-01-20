"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
    LayoutDashboard,
    FolderKanban,
    Package,
    Briefcase,
    Users,
    X
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

const sidebarLinks = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Services', href: '/admin/services', icon: Briefcase },
    { name: 'Clients', href: '/admin/clients', icon: Users },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity duration-300",
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:shadow-none",
                    isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
                    <Link href="/" className=" w-full flex items-center gap-2 justify-center">
                        <div className="relative w-32 h-24">
                            <Image
                                src="/images/detco_logo.png"
                                alt="Detco Logo"
                                fill
                                className="object-cover w-full h-full "
                                unoptimized
                            />
                        </div>
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-5rem)]">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon
                        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                                onClick={() => {
                                    if (window.innerWidth < 1024) {
                                        onClose()
                                    }
                                }}
                            >
                                <Icon size={20} className={cn(isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600")} />
                                <span>{link.name}</span>
                            </Link>
                        )
                    })}
                </nav>
            </aside>
        </>
    )
}
