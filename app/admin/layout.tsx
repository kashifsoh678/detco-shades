"use client"

import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { AdminDashboardRoutes } from '@/components/Navbar'
import { useAuth } from '@/context/AuthContext'

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuth();

    // AdminDashboardRoutes[0] is '/admin' (the login page)
    const isAdminLoginPage = AdminDashboardRoutes?.[0] === pathname;

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated && isAdminLoginPage) {
                // If logged in and on login page, redirect to dashboard
                router.push('/admin/dashboard');
            } else if (!isAuthenticated && !isAdminLoginPage) {
                // If not logged in and on protected page, redirect to login
                router.push('/admin');
            }
        }
    }, [isAuthenticated, isLoading, isAdminLoginPage, router]);

    // Show loading state while checking auth
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // If on login page, render children without dashboard layout
    // We conditionally render null if authenticated to prevent flash before redirect
    if (isAdminLoginPage) {
        if (isAuthenticated) return null;
        return <>{children}</>;
    }

    // If protected page and authenticated, render dashboard layout
    // We conditionally render null if not authenticated to prevent flash before redirect
    if (!isAuthenticated) return null;

    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}

export default AdminDashboardLayout