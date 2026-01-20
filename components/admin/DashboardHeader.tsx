"use client"

import React from 'react'
import { Menu, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DashboardHeaderProps {
    onMenuClick: () => void
}

import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const { logout } = useAuth()

    const handleLogout = async () => {
        await logout()
        toast.success("Logged out successfully")
    }

    return (
        <header className="h-20 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 lg:hidden text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-xl font-bold text-gray-800 lg:hidden">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4 ml-auto">
                <div className="hidden md:flex items-center gap-3 px-2 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User size={16} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 pr-2">Welcome, Admin</span>
                </div>

                <div className="h-8 w-px bg-gray-200 mx-1 hidden md:block"></div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-600 hover:bg-red-50 gap-2"
                >
                    <LogOut size={18} />
                    <span className="hidden sm:inline">Logout</span>
                </Button>
            </div>
        </header>
    )
}
