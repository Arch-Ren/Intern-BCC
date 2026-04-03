import axios from "axios";
import { api } from "@/lib/axios";

export type NutrisiHarian = {
    total_kalori: number;
    target_protein: number;
    target_lemak: number;
    target_kalori: number;
    persen_kalori: number;
    persen_lemak: number;
    persen_protein: number;
};

export async function fetchNutrisiHarian(
    childId: string
): Promise<NutrisiHarian> {
    try {
        const res = await api.get<NutrisiHarian>(`/anak/nutrisi/${childId}`);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("FETCH NUTRISI STATUS:", error.response?.status);
            console.error("FETCH NUTRISI RESPONSE:", error.response?.data);
            throw new Error(
                error.response?.data?.message ||
                    "Gagal mengambil data nutrisi harian"
            );
        }
        throw new Error("Terjadi kesalahan saat mengambil data nutrisi");
    }
}
