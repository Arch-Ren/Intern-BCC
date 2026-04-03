import axios from "axios"
import { api } from "@/lib/axios"

export type RegisterPayload = {
    nama: string
    username: string
    email: string
    password: string
    confirm_password: string
}

export type RegisterResponse = {
    message: string
}

export async function registerService(
    payload: RegisterPayload
): Promise<RegisterResponse> {
    const { nama, username, email, password, confirm_password } = payload

    if (!nama || !username || !email || !password || !confirm_password) {
        throw new Error("Semua field wajib diisi")
    }

    try {
        const res = await api.post<RegisterResponse>("/auth/register", payload)
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Register gagal")
        }

        throw new Error("Terjadi kesalahan saat register")
    }
}