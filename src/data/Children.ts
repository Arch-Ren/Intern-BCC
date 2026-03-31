import type { Children } from "@/types/child"

export const dummyChildren: Children[] = [
  {
    id: "1",
    parentId: "parent-1",
    name: "Jaidee Nantachen",
    birthDate: "2020-05-10",
    gender: "Perempuan",
    bloodType: "O",
    allergies: ["Kacang"],
    photo: "/images/photo-anak.jpg",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    parentId: "parent-1",
    name: "Furina",
    birthDate: "2023-10-13",
    gender: "Perempuan",
    bloodType: "B",
    allergies: ["Karbit"],
    photo: "/images/myMBG.jpg",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
]