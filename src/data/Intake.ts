export type Intakes = {
    label: string
    current: number
    max: number
}

export const dummyIntakes: Intakes[] = [
    {label: "Protein", current: 17.5, max: 100}, 
    {label: "Kalori", current: 32.14, max: 100}, 
    {label: "Lemak", current: 31, max: 100}
]