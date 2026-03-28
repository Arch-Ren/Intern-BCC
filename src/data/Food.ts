export type FoodItem = {
    id: number
    name: string
    protein: number
    calories: number
    fat: number
    serving: number
    image: string
};

export const foods: FoodItem[] = [
    {
        id: 1,
        name: "Ayam Paha Bawah",
        protein: 20,
        calories: 200,
        fat: 15,
        serving: 5,
        image: "/images/paha-bawah.png"
    },
    {
        id: 2,
        name: "Ayam Paha Atas",
        protein: 20,
        calories: 200,
        fat: 15,
        serving: 5,
        image: "/images/paha-atas.png"
    },
    {
        id: 3,
        name: "Ayam Sayap",
        protein: 20,
        calories: 200,
        fat: 15,
        serving: 5,
        image: "/images/sayap.png"
    },
    {
        id: 4,
        name: "Ayam Dada",
        protein: 20,
        calories: 200,
        fat: 15,
        serving: 5,
        image: "/images/dada.png"
    },
    {
        id: 5,
        name: "Daging Sapi",
        protein: 20,
        calories: 200,
        fat: 15,
        serving: 5,
        image: "/images/sapi.png"
    },
    {
        id: 6,
        name: "Daging Kambing",
        protein: 20,
        calories: 200,
        fat: 15,
        serving: 5,
        image: "/images/kambing.png"
    },
    {
        id: 7,
        name: "Daging Bebek",
        protein: 20,
        calories: 200,
        fat: 15,
        serving: 5,
        image: "/images/bebek.png"
    },
]