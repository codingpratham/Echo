import { create } from "zustand";
import { api } from "../lib/apis";

interface AuthState {
    isAuthenticated: boolean;
    checkAuth: () => Promise<void>;
}

export const authState = create<AuthState>((set) => ({
    isAuthenticated: false,
    checkAuth: async () => {
  try {
    const data = await api
      .get('/api/v1/auth/profile')
      .then((res) => res.data);

    set({
      isAuthenticated: Boolean(data?.user),
    });
  } catch {
    set({
      isAuthenticated: false,
    });
  }
},
}));