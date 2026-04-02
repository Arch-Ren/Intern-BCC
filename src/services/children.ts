import type { Children } from "@/types/child"

export async function fetchChildrenService(token: string): Promise<Children[]> {
    const res = await fetch("/api/user/children", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const json = await res.json()

    if (!res.ok) {
        throw new Error(json.message || "Gagal mengambil data anak")
    }

    return json.data ?? []
}
