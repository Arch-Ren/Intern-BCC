import { create } from "zustand";
import type { Children } from "@/types/child";
import { fetchChildrenService } from "@/services/children";
import {
    createChildService,
    updateChildService,
    type CreateChildPayload,
} from "@/app/addChild/services/auth";
import { useAuthStore } from "@/stores/auth";

type ChildrenState = {
    children: Children[];
    isLoading: boolean;
    isSubmitting: boolean;
    error: string | null;
    fetchChildren: () => Promise<void>;
    addChild: (payload: CreateChildPayload) => Promise<void>;
    updateChild: (id: string | number, payload: CreateChildPayload) => Promise<void>;
    clearChildren: () => void;
};

export const useChildrenStore = create<ChildrenState>()((set, get) => ({
    children: [],
    isLoading: false,
    isSubmitting: false,
    error: null,

    fetchChildren: async () => {
        if (get().isLoading) return;

        try {
            set({ isLoading: true, error: null });

            const token = useAuthStore.getState().token;
            if (!token) {
                set({
                    children: [],
                    error: "Token tidak ditemukan",
                    isLoading: false,
                });
                return;
            }

            const childrenData = await fetchChildrenService();

            set({
                children: Array.isArray(childrenData) ? childrenData : [],
                error: null,
            });
        } catch (error) {
            console.error("FETCH CHILDREN ERROR:", error);
            set({
                children: [],
                error:
                    error instanceof Error
                        ? error.message
                        : "Gagal mengambil data anak",
            });
        } finally {
            set({ isLoading: false });
        }
    },

    addChild: async (payload) => {
        try {
            set({ isSubmitting: true, error: null });

            const token = useAuthStore.getState().token;
            if (!token) {
                throw new Error("Token tidak ditemukan");
            }

            await createChildService(payload);
            await get().fetchChildren();
        } catch (error) {
            console.error("ADD CHILD ERROR:", error);
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : "Gagal menambahkan data anak",
            });
            throw error;
        } finally {
            set({ isSubmitting: false });
        }
    },

    updateChild: async (id, payload) => {
        try {
            set({ isSubmitting: true, error: null });

            const token = useAuthStore.getState().token;
            if (!token) {
                throw new Error("Token tidak ditemukan");
            }

            await updateChildService(id, payload);
            await get().fetchChildren();
        } catch (error) {
            console.error("UPDATE CHILD ERROR:", error);
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : "Gagal mengedit data anak",
            });
            throw error;
        } finally {
            set({ isSubmitting: false });
        }
    },

    clearChildren: () => {
        set({
            children: [],
            isLoading: false,
            isSubmitting: false,
            error: null,
        });
    },
}));