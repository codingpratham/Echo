import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    isOnBoarded?: boolean;
}

export const authState = create<AuthState>(() => ({
    isAuthenticated: false,
    isOnBoarded: false,
}));
