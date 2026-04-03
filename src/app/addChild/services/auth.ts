import axios from "axios";
import { api } from "@/lib/axios";

export type CreateChildPayload = {
    nama: string;
    tanggal_lahir: string;
    tinggi: number;
    berat_badan: number;
    gender: string;
    anak_ke: number;
    lingkar_kepala: number;
    lingkar_lengan: number;
    golongan_darah: string;
    alergi: string;
    riwayat_penyakit: string;
};

export async function createChildService(payload: CreateChildPayload) {
    try {
        console.log("CREATE CHILD PAYLOAD:", payload);
        const res = await api.post("/anak", payload);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("CREATE CHILD STATUS:", error.response?.status);
            console.error("CREATE CHILD RESPONSE:", error.response?.data);
            console.error("CREATE CHILD HEADERS:", error.response?.headers);
            throw new Error(
                error.response?.data?.message || "Gagal menambahkan data anak"
            );
        }

        throw new Error("Terjadi kesalahan saat menambahkan data anak");
    }
}

/**
 * Normalize tanggal_lahir to yyyy-MM-dd format.
 * The backend returns ISO timestamps like '2019-02-07T00:00:00Z'
 * but expects plain date 'yyyy-MM-dd' on input.
 */
function normalizeDateForBackend(dateStr: string): string {
    if (!dateStr) return dateStr;
    // If it contains 'T' (ISO format), extract just the date part
    if (dateStr.includes("T")) {
        return dateStr.split("T")[0];
    }
    return dateStr;
}

export async function updateChildService(
    id: string | number,
    payload: CreateChildPayload
) {
    try {
        const normalizedPayload = {
            ...payload,
            tanggal_lahir: normalizeDateForBackend(payload.tanggal_lahir),
            anak_ke: Math.max(payload.anak_ke, 1),
        };

        console.log("UPDATE CHILD ID:", id);
        console.log("UPDATE CHILD PAYLOAD:", normalizedPayload);

        const res = await api.patch(`/anak/${id}`, normalizedPayload);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("UPDATE CHILD STATUS:", error.response?.status);
            console.error("UPDATE CHILD RESPONSE:", error.response?.data);
            console.error("UPDATE CHILD URL:", `/anak/${id}`);
            console.error("UPDATE CHILD METHOD:", error.config?.method);
            throw new Error(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Gagal mengedit data anak"
            );
        }

        throw new Error("Terjadi kesalahan saat mengedit data anak");
    }
}