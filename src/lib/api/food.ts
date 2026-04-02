import { FoodItem } from "@/data/Food";
import { useAuthStore } from "@/stores/auth";

type ApiFood = {
    id: string;
    nama: string;
    energi: number;
    protein: number;
    lemak: number;
    karbo: number;
};

type ApiResponse = {
    data: ApiFood[];
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function getFoods(): Promise<FoodItem[]> {
    const token = useAuthStore.getState().token;

    const res = await fetch("/api/makanan", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });

    if (!res.ok) {
        throw new Error("Gagal mengambil data makanan");
    }

    const result: ApiResponse = await res.json();

    return result.data.map((item) => ({
        id: item.id,
        nama: item.nama,
        image: "/images/default-food.png",
        energi: item.energi,
        protein: item.protein,
        lemak: item.lemak,
        karbo: item.karbo,
    }));
}