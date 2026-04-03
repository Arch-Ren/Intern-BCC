import axios from "axios";
import { api } from "@/lib/axios";

export type Makanan = {
    id: string;
    nama: string;
    energi: number;
    protein: number;
    lemak: number;
    karbo: number;
    image: string;
};

export type GetMakananResponse = {
    data: Omit<Makanan, "image">[];
};

// Map of available food images in /public/images (filename without extension)
const foodImageMap: Record<string, string> = {
    "bayam": "/images/bayam.jpg",
    "brokoli": "/images/brokoli.jpg",
    "ceker ayam": "/images/ceker-ayam.jpg",
    "dada ayam": "/images/dada-ayam.jpg",
    "daging sapi giling": "/images/daging-sapi-giling.jpg",
    "hati ayam": "/images/hati-ayam.jpg",
    "hati sapi": "/images/hati-sapi.jpg",
    "ikan kembung": "/images/ikan-kembung.jpg",
    "ikan lele": "/images/ikan-lele.jpg",
    "ikan salmon": "/images/ikan-salmon.jpg",
    "ikan tuna": "/images/ikan-tuna.jpg",
    "kacang hijau": "/images/kacang-hijau.jpg",
    "kacang merah": "/images/kacang-merah.jpg",
    "kentang": "/images/kentang.jpg",
    "nasi merah": "/images/nasi-merah.jpg",
    "nasi putih": "/images/nasi-putih.jpg",
    "paha atas ayam": "/images/paha-atas-ayam.jpg",
    "singkong": "/images/singkong.jpg",
    "tahu": "/images/tahu.jpg",
    "telur ayam kampung": "/images/telur-ayam-kampung.jpg",
    "telur ayam negeri": "/images/telur-ayam-negeri.jpg",
    "telur puyuh": "/images/telur-puyuh.jpg",
    "tempe": "/images/tempe.jpg",
    "ubi jalar": "/images/ubi-jalar.jpg",
    "udang": "/images/udang.jpg",
    "wortel": "/images/wortel.jpg",
};

function getFoodImage(nama: string): string {
    const key = nama.toLowerCase().trim();

    // Exact match
    if (foodImageMap[key]) return foodImageMap[key];

    // Partial match — find the first key that is contained in the name or vice versa
    for (const [mapKey, path] of Object.entries(foodImageMap)) {
        if (key.includes(mapKey) || mapKey.includes(key)) return path;
    }

    return "/images/default-food.png";
}

export async function fetchMakananService(): Promise<Makanan[]> {
    try {
        const res = await api.get<GetMakananResponse>("/makanan");
        const rawData = Array.isArray(res.data?.data) ? res.data.data : [];
        return rawData.map((item) => ({
            ...item,
            image: getFoodImage(item.nama),
        }));
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("FETCH MAKANAN STATUS:", error.response?.status);
            throw new Error(
                error.response?.data?.message || "Gagal mengambil daftar makanan"
            );
        }
        throw new Error("Terjadi kesalahan saat mengambil daftar makanan");
    }
}
