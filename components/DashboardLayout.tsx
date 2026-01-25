"use client"

import React, { useState } from 'react'
import Sidebar from './admin/Sidebar'
import DashboardHeader from './admin/DashboardHeader'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-0">
                <DashboardHeader
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <main className="flex-1 p-2 md:p-4 lg:p-6  overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout