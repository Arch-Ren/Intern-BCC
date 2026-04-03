import axios from "axios";
import { api } from "@/lib/axios";

export type AddFoodLogPayload = {
    makanan: {
        makanan_id: string;
        gram: number;
    }[];
};

export async function addFoodLogService(
    childId: string,
    payload: AddFoodLogPayload
) {
    try {
        const res = await api.post(`/anak/${childId}/log`, payload);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("ADD FOOD LOG STATUS:", error.response?.status);
            throw new Error(
                error.response?.data?.message || "Gagal menyimpan log makanan"
            );
        }
        throw new Error("Terjadi kesalahan saat menyimpan log makanan");
    }
}
