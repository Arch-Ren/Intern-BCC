"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DoctorScheduleSection from "@/components/Profile/doctorScheduleSection"
import type { Doctor } from "@/lib/doctor"
import { useAuthStore } from "@/stores/auth"

type BookingPanelProps = {
    doctors: Doctor[]
    selectedDoctor: Doctor | null
    selectedTime: string | null
    onSelectTime: (time: string) => void
}

function Loading() {
    return <div>Loading...</div>
}

export default function BookingPanel({
    doctors,
    selectedDoctor,
    selectedTime,
    onSelectTime,
}: BookingPanelProps) {
    const router = useRouter()
    const token = useAuthStore((state) => state.token)
    const [doctorDetail, setDoctorDetail] = useState<{ nama: string; spesialis: string } | null>(null)

    useEffect(() => {
        if (!selectedDoctor?.id || !token) {
            setDoctorDetail(null)
            return
        }

        let isMounted = true
        fetch(`/api/dokter/${selectedDoctor.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(r => r.json())
            .then(data => {
                if (isMounted && data) {
                    setDoctorDetail(data)
                }
            })
            .catch(console.error)

        return () => { isMounted = false }
    }, [selectedDoctor?.id, token])

    const handleBooking = () => {
        if (!selectedDoctor) return

        const params = new URLSearchParams({
            doctorId: String(selectedDoctor.id),
            doctorName: doctorDetail?.nama || selectedDoctor.name,
            specialist: doctorDetail?.spesialis || selectedDoctor.specialist,
            image: selectedDoctor.image,
            dateLabel: selectedDoctor.schedule?.dateLabel ?? "",
            timeLabel: selectedTime ?? "",
        })

        router.push(`/dashboard/connect/payment?${params.toString()}`)
    }

    return (
        <Suspense fallback={<Loading />}>
            <aside className="flex h-full w-full min-h-0 flex-col rounded-[28px] bg-primary p-5 text-white shadow-lg">
                <h2 className="mb-4 shrink-0 text-center text-xl font-semibold">
                    Jadwal
                </h2>

                <div className="grid min-h-0 flex-1 grid-rows-[1.2fr_auto_2.2fr] gap-4">
                    <div className="min-h-0 overflow-y-auto rounded-2xl p-1">
                        <DoctorScheduleSection doctors={doctors.slice(0, 2)} />
                    </div>

                    <div className="shrink-0 px-1">
                        <div className="h-px w-full bg-white/50" />
                        <div className="mt-2 text-center text-xs text-white/90">
                            Lihat Semua
                        </div>
                    </div>

                    <div className="min-h-0 text-black">
                        {!selectedDoctor ? (
                            <div className="flex min-h-0 flex-col rounded-2xl bg-white p-4">
                                <p className="mb-3 shrink-0 font-bold">
                                    Pilih Dokter atau Konsultan
                                </p>

                                <div className="flex-1" />
                                <button
                                    type="button"
                                    disabled
                                    className="w-full shrink-0 rounded-xl bg-slate-300 px-4 py-3 text-sm font-semibold text-white"
                                >
                                    PESAN SEKARANG
                                </button>
                            </div>
                        ) : (
                            <div className="flex h-full min-h-0 flex-col gap-4 rounded-2xl bg-white p-4">
                                <p className="mb-3 shrink-0 font-bold">Detail Dokter</p>

                                <div className="mb-3 flex shrink-0 items-center gap-3">
                                    <img
                                        src={selectedDoctor.image || "/images/default-avatar.png"}
                                        alt={doctorDetail?.nama || selectedDoctor.name}
                                        className="h-14 w-14 rounded-xl object-cover object-[center_35%]"
                                        onError={(e) => {
                                            e.currentTarget.src = "/images/default-avatar.png"
                                        }}
                                    />

                                    <div className="min-w-0">
                                        <h3 className="line-clamp-1 text-base font-semibold">
                                            {doctorDetail?.nama || selectedDoctor.name}
                                        </h3>
                                        <p className="line-clamp-1 text-sm text-slate-500">
                                            {doctorDetail?.spesialis || selectedDoctor.specialist}
                                        </p>
                                    </div>
                                </div>

                                <div className="min-h-0 flex-1" />

                                <button
                                    type="button"
                                    onClick={handleBooking}
                                    className="mt-3 w-full shrink-0 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-3 text-sm font-semibold text-white transition"
                                >
                                    PESAN SEKARANG
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </Suspense>
    )
}