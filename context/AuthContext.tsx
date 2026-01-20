"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType extends AuthState {
    login: (user: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    useEffect(() => {
        // Check for persisted auth state (e.g., localStorage)
        const checkAuth = async () => {
            // Mock check
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

            if (token && userStr) {
                try {
                    const user = JSON.parse(userStr);
                    setState({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (e) {
                    setState(prev => ({ ...prev, isLoading: false }));
                }
            } else {
                setState(prev => ({ ...prev, isLoading: false }));
            }
        };

        checkAuth();
    }, []);

    const login = (user: User, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setState({
            user,
            isAuthenticated: true,
            isLoading: false,
        });
        router.push('/admin/dashboard');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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
