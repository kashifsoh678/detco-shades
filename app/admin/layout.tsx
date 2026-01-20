"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { AdminDashboardRoutes } from '@/components/Navbar'
const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isAdminLoginPage: boolean = AdminDashboardRoutes?.[0] === pathname;

    if (isAdminLoginPage) {
        return children
    }

    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}

export default AdminDashboardLayout