import axios from "axios";
import { api } from "@/lib/axios";

export type Makanan = {
    id: string;
    nama: string;
    energi: number;
    protein: number;
    lemak: number;
    karbo: number;
};

export type GetMakananResponse = {
    data: Makanan[];
};

export async function fetchMakananService(): Promise<Makanan[]> {
    try {
        const res = await api.get<GetMakananResponse>("/makanan");
        // The API returns { data: [ ... ] } but api wrapper might not automatically unwrap it based on axios. Let's assume it returns res.data which is GetMakananResponse. Then we want res.data.data. Wait, what does the image say? The image shows "data": [ ... ]. So it's res.data.data
        return Array.isArray(res.data?.data) ? res.data.data : [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("FETCH MAKANAN STATUS:", error.response?.status);
            throw new Error(
                error.response?.data?.message || "Gagal mengambil daftar makanan"
            );
        }
        throw new Error("Terjadi kesalahan saat mengambil daftar makanan");
    }
}
