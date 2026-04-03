import { api } from "@/lib/axios"

export async function postForgotPassword(email: string) {
    const response = await api.post("/auth/forgot-password", { email })
    return response.data
}

export async function postResetPassword(token: string, password: string) {
    const response = await api.post(`/auth/reset-password?token=${encodeURIComponent(token)}`, {
        token,
        password,
    })
    return response.data
}
