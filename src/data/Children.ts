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
    upperArmCircumference?: number
    headCircumference?: number
    photo: string
    bmi: string
    bmiNumber: number
}

export const dummyChildren: Children[] = [
  {
    id: "1",
    name: "Jaidee Nantachen",
    birthDate: "2020-05-10",
    gender: "Perempuan",
    bloodType: "O",
    allergies: ["Kacang"],
    age: 4,
    height: 105,
    weight: 18,
    photo: "/images/photo-anak.jpg",
    upperArmCircumference: 16,
    headCircumference: 34,
    bmi: "Normal",
    bmiNumber: 18.5
  },
  {
    id: "2",
    name: "Furina",
    birthDate: "2023-10-13",
    gender: "Perempuan",
    bloodType: "B",
    allergies: ["Karbit"],
    age: 9,
    height: 145,
    weight: 34,
    photo: "/images/myMBG.jpg",
    bmi: "Normal",
    bmiNumber: 18.5
  }
]