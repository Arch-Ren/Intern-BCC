import { create } from "zustand"
import { persist } from "zustand/middleware"

export type User = {
    name: string
    email: string
    photo?: string
}

type AuthState = {
    user: User | null
    token: string | null
    setAuth: (payload: { user: User; token: string }) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setAuth: ({ user, token }) => set({ user, token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: "auth-storage",
        }
    )
)