import axios from "axios"
import { api } from "@/lib/axios"

export type SigninResponse = {
    user?: {
        id?: string
        name?: string
        nama?: string
        email?: string
        photo?: string
        gender?: string
    }
    token: string
    message?: string
}

export async function signinService(
    email: string,
    password: string
): Promise<SigninResponse> {
    if (!email || !password) {
        throw new Error("Email dan password wajib diisi")
    }

    try {
        const res = await api.post<SigninResponse>("/auth/login", {
            email,
            password,
        })

        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Login gagal")
        }

        throw new Error("Terjadi kesalahan saat login")
    }
}