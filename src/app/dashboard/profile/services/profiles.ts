import axios from "axios"
import { api } from "@/lib/axios"

export type ProfileItem = {
    id?: string | number
    name?: string
    nama?: string
    username?: string
    email?: string
    photo?: string
    profil?: string
    gender?: string
    phone?: string
    nomor?: string
    no_telp?: string
}

export type ProfileResponse = {
    user?: ProfileItem
    data?: ProfileItem
    message?: string
}

export type UploadProfilePhotoResponse = {
    message: string
    url: string
}

export async function getProfileService(): Promise<ProfileResponse | ProfileItem> {
    try {
        const res = await api.get<ProfileResponse | ProfileItem>("/user/profile")
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Gagal ambil profile")
        }

        throw new Error("Terjadi kesalahan saat mengambil profile")
    }
}

export async function uploadProfilePhotoService(
    file: File
): Promise<UploadProfilePhotoResponse> {
    try {
        const formData = new FormData()
        formData.append("file", file)

        const res = await api.post<UploadProfilePhotoResponse>("/user/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })

        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Gagal upload foto profile")
        }

        throw new Error("Terjadi kesalahan saat upload foto profile")
    }
}