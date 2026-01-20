"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/auth';
import { useRouter, usePathname } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { hasAdminPath } from '@/components/Navbar';

interface AuthContextType extends AuthState {
    login: (user: User, token?: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });
    const isDashboardRoute = hasAdminPath(pathname);


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axiosInstance.get('/auth/me');
                setState({
                    user: data.user,
                    isAuthenticated: true,
                    isLoading: false,
                });
            } catch (error) {
                setState({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            }
        };

        checkAuth();
    }, [!isDashboardRoute,]); // Re-check on route change if needed, though middleware handles protection

    const login = async (user: User, token?: string) => {
        // In this secure flow, the login API sets the cookie. 
        // We just update the client state to reflect success.
        // NOTE: The actual API call is typically done in the Login Form, 
        // managing the POST request there, then calling this context method OR
        // we can move the API call here. 
        // For consistency with typical patterns, let's assume the form calls this:

        // Wait, to ensure state is sync with server, we should probably fetch 'me' or just set state 
        // if the form passed the user object from the login response.

        setState({
            user,
            isAuthenticated: true,
            isLoading: false,
        });

        // Navigation handles by the component or here
        router.push('/admin/dashboard');
    };

    const logout = async () => {
        try {
            await axiosInstance.post('/auth/logout');
        } catch (error) {
            console.error('Logout failed', error);
        }

        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
        router.push('/admin');
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
