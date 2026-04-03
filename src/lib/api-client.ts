import axios from "axios"
import { useAuthStore } from "@/stores/auth"

export const apiClient = axios.create()

apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})