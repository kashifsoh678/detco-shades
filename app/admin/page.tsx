"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import axiosInstance from '@/lib/axios'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

// Define validation schema using Zod
const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type FormData = z.infer<typeof formSchema>

export const DashboardNavbar = () => {
    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
            <div className="container mx-auto px-4 py-4 lg:py-4">
                <Link href="/" className={`flex flex-col relative z-50 group   `}>
                    <Image
                        src="/images/detco_logo.png"
                        alt="DETCO - Al-Dorman Est."
                        width={260}
                        height={100}
                        className="h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        priority
                        unoptimized
                    />
                </Link>
            </div>
        </header>
    )
}
const LoginPage = () => {
    const router = useRouter()
    const { login } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "admin@detco.sa",
            password: "admin123",
        },
    })

    // Secure login handler
    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        try {
            // Call the secure API route
            // The API sets the HttpOnly cookie
            const response = await axiosInstance.post('/auth/login', data)

            // Update the Auth Context (which updates client state and redirects)
            await login(response.data.user)
            toast.success("Welcome back, Admin!")

        } catch (error: any) {
            console.error("Login failed:", error)
            const msg = error.response?.data?.message || "Invalid email or password"
            toast.error(msg)
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <>
            {DashboardNavbar()}
            {/* login form */}
            <div className="flex  items-center justify-center bg-gray-50 px-4 py-24 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-xl">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Admin Login
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to access the dashboard
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Email address
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@example.com"
                                    autoComplete="email"
                                    {...register("email")}
                                    className={`transition-colors ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    {...register("password")}
                                    className={`transition-colors ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-11"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage