export type Intakes = {
    label: string
    percentage: number
    className?: string
}

export const dummyIntakes: Intakes[] = [
    {label: "Protein", percentage: 17.5}, 
    {label: "Kalori", percentage: 32.14}, 
    {label: "Lemak", percentage: 31}
]