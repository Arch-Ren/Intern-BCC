export async function getProfileService(token: string) {
    if (!token) {
        throw new Error("Token tidak ada")
    }

    const res = await fetch("/api/user/profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Gagal ambil profile")
    }

    return data
}