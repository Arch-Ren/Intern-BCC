export function calculateBMI(weight: number, heightCm: number) {
    const heightM = heightCm / 100
    const bmi = weight / (heightM * heightM)

    return Number(bmi.toFixed(1))
}

export function getBMICategory(bmi: number) {
    if (bmi < 18.5) return "Kurus"
    if (bmi < 25) return "Normal"
    if (bmi < 30) return "Overweight"
    return "Obesitas"
}