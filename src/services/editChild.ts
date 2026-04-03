import axios from "axios"
import { api } from "@/lib/axios"

export type UpdateChildPayload = {
    nama: string
    tanggal_lahir: string
    tinggi: number
    berat_badan: number
    gender: string
    anak_ke: number
    lingkar_kepala: number
    lingkar_lengan: number
    golongan_darah: string
    alergi: string
    riwayat_penyakit: string
}

export async function updateChildService(
    id: string | number,
    payload: UpdateChildPayload
) {
    try {
        console.log("UPDATE CHILD ID:", id)
        console.log("UPDATE CHILD PAYLOAD:", payload)

        const res = await api.patch(`/anak/${id}`, payload)
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("UPDATE CHILD STATUS:", error.response?.status)
            console.error("UPDATE CHILD RESPONSE:", error.response?.data)
            console.error("UPDATE CHILD PAYLOAD:", payload)

            throw new Error(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Gagal mengedit data anak"
            )
        }

        throw new Error("Terjadi kesalahan saat mengedit data anak")
    }
}