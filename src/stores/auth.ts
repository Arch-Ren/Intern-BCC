import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useChildrenStore } from "@/stores/children"
import { getProfileService, type ProfileItem, type ProfileResponse } from "@/app/dashboard/profile/services/profiles"

export type User = {
    id?: number | string
    name: string
    username?: string
    email: string
    photo?: string
    gender?: string
    phone?: string
}

type AuthState = {
    token: string | null
    user: User | null
    isLoadingProfile: boolean
    setAuth: (payload: { token: string; user: User | null }) => void
    setUser: (user: User | null) => void
    fetchProfile: () => Promise<void>
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            isLoadingProfile: false,

            setAuth: ({ token, user }) => {
                useChildrenStore.getState().clearChildren()
                set({ token, user })
            },

            setUser: (user) => set({ user }),

            fetchProfile: async () => {
                const token = get().token

                if (!token) {
                    set({
                        user: null,
                        isLoadingProfile: false,
                    })
                    return
                }

                try {
                    set({ isLoadingProfile: true })

                    const resData = await getProfileService()
                    const profile = (resData as ProfileResponse).user || (resData as ProfileResponse).data || (resData as ProfileItem)

                    if (!profile) {
                        throw new Error("Data profile tidak ditemukan")
                    }

                    set({
                        user: {
                            id: profile.id,
                            name: profile.name || profile.nama || "User",
                            username: profile.username || "",
                            email: profile.email || "-",
                            photo: profile.photo || profile.profil || "",
                            gender: profile.gender,
                            phone: profile.phone || profile.nomor || profile.no_telp || "",
                        },
                    })
                } catch (error) {
                    console.error("FETCH PROFILE ERROR:", error)
                    set({ user: null })
                } finally {
                    set({ isLoadingProfile: false })
                }
            },

            logout: () => {
                useChildrenStore.getState().clearChildren()

                set({
                    token: null,
                    user: null,
                    isLoadingProfile: false,
                })
            },
        }),
        {
            name: "auth-storage",
        }
    )
)