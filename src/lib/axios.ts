import axios from "axios"
import { useAuthStore } from "@/stores/auth"

export const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false, // ubah jadi true cuma kalau pakai cookie
})

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token

    if (token) {
        // pastikan headers ada
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized. Token invalid / expired.")

            // opsional: auto logout
            useAuthStore.getState().logout()
        }

        return Promise.reject(error)
    }
)