import { create } from "zustand"
import type { Children } from "@/types/child"
import { fetchChildrenService } from "@/services/children"

type ChildrenState = {
    children: Children[]
    isLoading: boolean
    error: string | null
    fetchChildren: () => Promise<void>
}

export const useChildrenStore = create<ChildrenState>()((set, get) => ({
    children: [],
    isLoading: false,
    error: null,

    fetchChildren: async () => {
        // Prevent duplicate fetches
        if (get().isLoading) return

        try {
            set({ isLoading: true, error: null })

            // Get token from auth store (localStorage)
            const authRaw = localStorage.getItem("auth-storage")
            const authData = authRaw ? JSON.parse(authRaw) : null
            const token = authData?.state?.token

            if (!token) {
                set({ error: "Token tidak ditemukan", isLoading: false })
                return
            }

            const childrenData = await fetchChildrenService(token)

            set({ children: childrenData })
        } catch (error) {
            console.error("FETCH CHILDREN ERROR:", error)
            set({ error: error instanceof Error ? error.message : "Gagal mengambil data anak" })
        } finally {
            set({ isLoading: false })
        }
    },
}))
