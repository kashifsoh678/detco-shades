export type UserRole = "admin" | "user";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string | UserRole;
  isActive?: boolean;
}

export interface AuthResponse {
  user: User;
  message?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
