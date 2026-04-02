export type CreateChildPayload = {
    nama: string
    tanggal_lahir: string
    tinggi: number
    berat_badan: number
    gender: string
    anak_ke: number
    lingkar_kepala: number
    lingkar_lengan: number
    golongan_darah: string
    alergi: string
    riwayat_penyakit: string
}

export async function createChildService(
    token: string,
    payload: CreateChildPayload
) {
    const mappedPayload = {
        nama: payload.nama,
        tanggalLahir: payload.tanggal_lahir,
        tinggi: payload.tinggi,
        beratBadan: payload.berat_badan,
        gender: payload.gender,
        anakKe: payload.anak_ke,
        lingkarKepala: payload.lingkar_kepala,
        lingkarLengan: payload.lingkar_lengan,
        golonganDarah: payload.golongan_darah,
        alergi: payload.alergi,
        riwayatPenyakit: payload.riwayat_penyakit,
    }

    const res = await fetch("/api/user/children", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mappedPayload),
    })

    const json = await res.json()

    if (!res.ok) {
        console.error("CREATE CHILD ERROR RESPONSE:", json)
        throw new Error(json.message || "Gagal menambahkan data anak")
    }

    return json
}