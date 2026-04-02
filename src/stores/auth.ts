import { create } from "zustand"
import { persist } from "zustand/middleware"

export type User = {
    id?: number | string
    name: string
    email: string
    photo?: string
    gender?: string
}

type AuthState = {
    token: string | null
    user: User | null
    isLoadingProfile: boolean
    setAuth: (payload: { token: string; user: User | null }) => void
    setUser: (user: User) => void
    fetchProfile: () => Promise<void>
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            isLoadingProfile: false,

            setAuth: ({ token, user }) => set({ token, user }),

            setUser: (user) => set({ user }),

            fetchProfile: async () => {
                const token = get().token
                if (!token) return

                try {
                    set({ isLoadingProfile: true })

                    const res = await fetch("/api/user/profile", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })

                    const data = await res.json()

                    if (!res.ok) {
                        throw new Error(data.message || data.error || "Gagal ambil profile")
                    }

                    set({
                        user: {
                            id: data.id,
                            name: data.name || data.nama || "User",
                            email: data.email || "-",
                            photo: data.photo,
                            gender: data.gender,
                        },
                    })
                } catch (error) {
                    console.error("FETCH PROFILE ERROR:", error)
                } finally {
                    set({ isLoadingProfile: false })
                }
            },

            logout: () =>
                set({
                    token: null,
                    user: null,
                    isLoadingProfile: false,
                }),
        }),
        {
            name: "auth-storage",
        }
    )
)