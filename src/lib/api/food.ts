import { FoodItem } from "@/data/Food";

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

export async function getFoods(): Promise<FoodItem[]> {
    const token = localStorage.getItem("token");

    const res = await fetch("YOUR_BASE_URL/makanan", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Gagal mengambil data makanan");
    }

    const result: ApiResponse = await res.json();

    return result.data.map((item) => ({
        id: item.id,
        name: item.nama,
        image: "/images/default-food.png",
        energi: item.energi,
        protein: item.protein,
        lemak: item.lemak,
        karbo: item.karbo,
    }));
}