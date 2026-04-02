import type { Children } from "@/types/child"

export async function fetchChildrenService(token: string): Promise<Children[]> {
    const res = await fetch("/api/user/children", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    })

    const text = await res.text()

    let json
    try {
        json = JSON.parse(text)
    } catch {
        throw new Error("Response get anak bukan JSON")
    }

    if (!res.ok) {
        throw new Error(json.message || "Gagal mengambil data anak")
    }

    return Array.isArray(json.data) ? json.data : []
}