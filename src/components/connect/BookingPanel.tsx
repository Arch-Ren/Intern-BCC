"use client"

import { Doctor } from "@/data/Doctor"
import DoctorScheduleSection from "@/components/Profile/doctorScheduleSection"
import { useRouter } from "next/navigation"
import { Suspense } from "react"

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

    const handleBooking = () => {
        if (!selectedDoctor || !selectedTime) return

        const params = new URLSearchParams({
            doctorId: String(selectedDoctor.id),
            doctorName: selectedDoctor.name,
            specialist: selectedDoctor.specialist,
            image: selectedDoctor.image,
            dateLabel: selectedDoctor.schedule?.dateLabel ?? "",
            timeLabel: selectedTime,
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
                    {/* TOP SECTION */}
                    <div className="min-h-0 overflow-y-auto rounded-2xl p-1">
                        <DoctorScheduleSection doctors={doctors.slice(0, 2)} />
                    </div>

                    {/* DIVIDER */}
                    <div className="shrink-0 px-1">
                        <div className="h-px w-full bg-white/50" />
                        <div className="mt-2 text-center text-xs text-white/90">
                            Lihat Semua
                        </div>
                    </div>

                    {/* BOTTOM SECTION */}
                    <div className="min-h-0 text-black">
                        {!selectedDoctor ? (
                            <div className="flex min-h-0 flex-col bg-white p-4 rounded-2xl">
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
                            <div className="flex gap-4 min-h-0 h-full flex-col bg-white p-4 rounded-2xl">
                                <p className="mb-3 shrink-0 font-bold">
                                    Pilih jam
                                </p>

                                <div className="mb-3 flex shrink-0 items-center gap-3">
                                    <img
                                        src={selectedDoctor.image}
                                        alt={selectedDoctor.name}
                                        className="h-12 w-12 rounded-xl object-cover object-top"
                                    />

                                    <div className="min-w-0">
                                        <h3 className="line-clamp-1 text-sm font-semibold">
                                            {selectedDoctor.name}
                                        </h3>
                                        <p className="line-clamp-1 text-xs text-slate-500">
                                            {selectedDoctor.specialist}
                                        </p>
                                        <p className="mt-1 text-xs text-emerald-600">
                                            {selectedDoctor.schedule?.dateLabel}
                                        </p>
                                    </div>
                                </div>

                                <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                                    <div className="grid grid-cols-4 gap-2">
                                        {selectedDoctor.availableTimes?.map((time) => {
                                            const isActive = selectedTime === time

                                            return (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => onSelectTime(time)}
                                                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${isActive
                                                        ? "bg-sky-600 text-white"
                                                        : "bg-primary text-white hover:bg-emerald-200"
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleBooking}
                                    disabled={!selectedTime}
                                    className={`mt-3 w-full shrink-0 rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${selectedTime
                                        ? "bg-slate-800 hover:bg-slate-700"
                                        : "bg-slate-300 cursor-not-allowed"
                                        }`}
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