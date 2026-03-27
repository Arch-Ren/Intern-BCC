export type Notification = {
    id: number,
    type: string,
    message: string,
    time: string,
    icon: string,
}

export const dummyNotification: Notification[] = [
    {
    id: 1,
    type: "reminder",
    message: "Waktunya makan siang! Jangan lupa catat menu Jaidee hari ini untuk memantau asupan proteinnya.",
    time: "15 menit yang lalu",
    icon: "/images/notif-reminder.png",
  },
  {
    id: 2,
    type: "other",
    message: "Asupan Karbohidrat Jaidee hari ini baru 40%. Tambahkan sedikit nasi atau kentang di menu makan malam nanti, yuk!",
    time: "1 jam yang lalu",
    icon: "/images/notif-food.png",
  },
  {
    id: 3,
    type: "other",
    message: "Baru rilis!! Paham Gizi Anak dalam 60 Detik. Baca sekarang untuk bumping ilmu tumbuh kembang si Kecil.",
    time: "6 jam yang lalu",
    icon: "/images/notif-eduhub.png",
  },
  {
    id: 4,
    type: "succes",
    message: "Hebat! Jaidee sudah memenuhi 100% target protein hari ini. Pertahankan ya!",
    time: "1 hari yang lalu",
    icon: "/images/notif-success.png",
  },
  {
    id: 5,
    type: "reminder",
    message: "Bunda, sudah sebulan nih! Yuk, update tinggi dan berat badan Jaidee agar grafiknya tetap akurat.",
    time: "1 hari yang lalu",
    icon: "/images/notif-warning.png",
  },
]