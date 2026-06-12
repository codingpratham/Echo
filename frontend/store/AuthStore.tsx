import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;

}

export const authState = create<AuthState>(() => ({
    isAuthenticated: false,
}));