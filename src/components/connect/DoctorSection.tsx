"use client"

import { useEffect, useMemo, useState } from "react"
import DoctorCard from "./DoctorCard"
import BookingPanel from "./BookingPanel"
import type { Doctor } from "@/lib/doctor"
import { mapDoctorsResponse } from "@/lib/doctor"
import { useAuthStore } from "@/stores/auth"

export default function DoctorConsultationPage() {
    const token = useAuthStore((state) => state.token)

    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)

    useEffect(() => {
        const fetchDoctors = async () => {
            if (!token) {
                setError("Token login tidak ditemukan")
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError(null)

                const res = await fetch("/api/dokter", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                })

                const json = await res.json()

                if (!res.ok) {
                    throw new Error(
                        json?.message ||
                        json?.error?.message ||
                        "Gagal mengambil data dokter"
                    )
                }

                const mappedDoctors = mapDoctorsResponse(json)
                setDoctors(mappedDoctors)

                if (mappedDoctors.length > 0) {
                    setSelectedDoctor(mappedDoctors[0])
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Terjadi kesalahan")
            } finally {
                setLoading(false)
            }
        }

        fetchDoctors()
    }, [token])

    const sortedDoctors = useMemo(() => doctors, [doctors])

    const handleSelectDoctor = (doctor: Doctor) => {
        setSelectedDoctor(doctor)
        setSelectedTime(null)
    }

    return (
        <section className="h-screen overflow-hidden p-4">
            <div className="mx-auto grid h-full grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
                <div className="flex h-full min-h-0 flex-col rounded-3xl bg-white p-4 shadow">
                    <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                        {loading && <p>Loading dokter...</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        {!loading && !error && (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {sortedDoctors.map((doctor) => (
                                    <DoctorCard
                                        key={doctor.id}
                                        doctor={doctor}
                                        active={selectedDoctor?.id === doctor.id}
                                        onSelect={handleSelectDoctor}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex h-full min-h-0">
                    <BookingPanel
                        doctors={sortedDoctors}
                        selectedDoctor={selectedDoctor}
                        selectedTime={selectedTime}
                        onSelectTime={setSelectedTime}
                    />
                </div>
            </div>
        </section>
    )
}