import axios from "axios"
import { api } from "@/lib/axios"
import type { Children } from "@/types/child"

type FetchChildrenResponse = {
    data?: Children[]
    message?: string
}

export async function fetchChildrenService(): Promise<Children[]> {
    try {
        const res = await api.get<FetchChildrenResponse | Children[]>("/anak")

        const data = res.data

        if (Array.isArray(data)) {
            return data
        }

        return Array.isArray(data.data) ? data.data : []
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Gagal mengambil data anak"
            )
        }

        throw new Error("Terjadi kesalahan saat mengambil data anak")
    }
}