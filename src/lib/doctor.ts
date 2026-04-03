export type DoctorSchedule = {
    dateLabel: string
    timeLabel?: string
}

export type Doctor = {
    id: string
    name: string
    specialist: string
    image: string
    rating: number
    schedule?: DoctorSchedule
    availableTimes?: string[]
}

type DoctorApiItem = {
    id: string
    nama: string
    spesialis: string
}

type DoctorApiResponse = {
    data: DoctorApiItem[]
}


export function mapDoctorFromApi(item: DoctorApiItem): Doctor {
    return {
        id: item.id,
        name: item.nama,
        specialist: item.spesialis,
        image: "/images/default-avatar.png",
        rating: 4.8,
    }
}

export function mapDoctorsResponse(payload: DoctorApiResponse): Doctor[] {
    if (!payload?.data || !Array.isArray(payload.data)) return []
    return payload.data.map(mapDoctorFromApi)
}