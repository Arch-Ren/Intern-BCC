export type Children = {
    id: string
    name: string
    birthDate: string
    gender: "Laki-Laki" | "Perempuan"
    bloodType: "A" | "B" | "AB" | "O"
    allergies: string[]
    age: number
    height: number
    weight: number
    upperArmCircumference: number
    photo: string
    bmi: string
}

export const dummyChildren: Children[] = [
  {
    id: "1",
    name: "Jaidee Nantachen",
    birthDate: "2020-05-10",
    gender: "Perempuan",
    bloodType: "O",
    allergies: ["Kacang"],
    age: 7,
    height: 105,
    weight: 18,
    upperArmCircumference: 16,
    photo: "/images/photo-anak.jpg",
    bmi: "Normal",
  }
]