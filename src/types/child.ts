export type Children = {
    id: string
    parentId: string
    name: string
    birthDate: string
    gender: "Laki-Laki" | "Perempuan"
    bloodType: "A" | "B" | "AB" | "O"
    allergies: string[]
    photo: string
    createdAt: string
    updatedAt: string
}