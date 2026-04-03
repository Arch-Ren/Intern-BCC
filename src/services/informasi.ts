import axios from "axios";
import { api } from "@/lib/axios";

export type InformasiAPI = {
    id: string;
    judul: string;
    ringkasan: string;
    dibuat_pada: string;
};

export type InformasiResponse = {
    data: InformasiAPI[];
};

export async function fetchInformasi(): Promise<InformasiAPI[]> {
    try {
        const res = await api.get<InformasiResponse>("/informasi");
        return res.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("FETCH INFORMASI STATUS:", error.response?.status);
            console.error("FETCH INFORMASI RESPONSE:", error.response?.data);
            throw new Error(
                error.response?.data?.message ||
                    "Gagal mengambil data informasi"
            );
        }
        throw new Error("Terjadi kesalahan saat mengambil data informasi");
    }
}
