export type DoctorSchedule = {
    dateLabel: string
    timeLabel: string
}

export type Doctor = {
    id: number
    name: string
    specialist: string
    image: string
    schedule: DoctorSchedule
}

export const dummyDoctors: Doctor[] = [
    {
        id: 1,
        name: "dr. Setiadi Kusuma, Sp.A(K)",
        specialist: "Spesialis Anak K. Tumbuh Kembang",
        image: "/images/doctor-1.jpg",
        schedule: {
            dateLabel: "20 Juni 2026",
            timeLabel: "08.00 - 09.00",
        },
    },
    {
        id: 2,
        name: "Farah Quinnia, S.Gz, RD",
        specialist: "Konsultan / Ahli Gizi",
        image: "/images/doctor-2.jpg",
        schedule: {
            dateLabel: "13 Juni 2026",
            timeLabel: "10.00 - 11.00",
        },
    },
    {
        id: 3,
        name: "Rian Mahendra, S.Gz",
        specialist: "Konsultan / Ahli Gizi",
        image: "/images/doctor-3.jpg",
        schedule: {
            dateLabel: "29 Mei 2026",
            timeLabel: "13.00 - 14.00",
        },
    },
    {
        id: 4,
        name: "dr. Baskoro Adi, Sp.A",
        specialist: "Spesialis Anak",
        image: "/images/doctor-4.jpg",
        schedule: {
            dateLabel: "03 Mei 2026",
            timeLabel: "09.00 - 10.00",
        },
    },
    {
        id: 5,
        name: "Anindya Citra, S.Gz",
        specialist: "Konsultan / Ahli Gizi",
        image: "/images/doctor-5.jpg",
        schedule: {
            dateLabel: "27 April 2026",
            timeLabel: "15.00 - 16.00",
        },
    },
    {
        id: 6,
        name: "dr. Hendra Baskara, Sp.GK",
        specialist: "Spesialis Gizi Klinik",
        image: "/images/doctor-6.jpg",
        schedule: {
            dateLabel: "12 April 2026",
            timeLabel: "11.00 - 12.00",
        },
    },
    {
        id: 7,
        name: "dr. Elena Wijaya, Sp.A",
        specialist: "Spesialis Anak",
        image: "/images/doctor-7.jpg",
        schedule: {
            dateLabel: "05 April 2026",
            timeLabel: "14.00 - 15.00",
        },
    },
]