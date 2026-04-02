import { create } from "zustand"
import type { Children } from "@/types/child"
import { fetchChildrenService } from "@/services/children"
import { createChildService, type CreateChildPayload } from "@/services/createChild"
import { useAuthStore } from "@/stores/auth"

type ChildrenState = {
    children: Children[]
    isLoading: boolean
    isSubmitting: boolean
    error: string | null
    fetchChildren: () => Promise<void>
    addChild: (payload: CreateChildPayload) => Promise<void>
    clearChildren: () => void
}

export const useChildrenStore = create<ChildrenState>()((set, get) => ({
    children: [],
    isLoading: false,
    isSubmitting: false,
    error: null,

    fetchChildren: async () => {
        if (get().isLoading) return

        try {
            set({ isLoading: true, error: null })

            const token = useAuthStore.getState().token

            if (!token) {
                set({
                    children: [],
                    error: "Token tidak ditemukan",
                    isLoading: false,
                })
                return
            }

            const childrenData = await fetchChildrenService(token)

            set({
                children: Array.isArray(childrenData) ? childrenData : [],
                error: null,
            })
        } catch (error) {
            console.error("FETCH CHILDREN ERROR:", error)
            set({
                children: [],
                error: error instanceof Error ? error.message : "Gagal mengambil data anak",
            })
        } finally {
            set({ isLoading: false })
        }
    },

    addChild: async (payload) => {
        try {
            set({ isSubmitting: true, error: null })

            const token = useAuthStore.getState().token

            if (!token) {
                throw new Error("Token tidak ditemukan")
            }

            await createChildService(token, payload)
            await get().fetchChildren()
        } catch (error) {
            console.error("ADD CHILD ERROR:", error)
            set({
                error: error instanceof Error ? error.message : "Gagal menambahkan data anak",
            })
            throw error
        } finally {
            set({ isSubmitting: false })
        }
    },

    clearChildren: () => {
        set({
            children: [],
            isLoading: false,
            isSubmitting: false,
            error: null,
        })
    },
}))