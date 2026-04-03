"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth"

export function useRequireAuth() {
    const router = useRouter()
    const token = useAuthStore((state) => state.token)
    const fetchProfile = useAuthStore((state) => state.fetchProfile)

    useEffect(() => {
        if (!token) {
            router.push("/signin")
            return
        }

        fetchProfile()
    }, [token, router, fetchProfile])

    return { token }
}