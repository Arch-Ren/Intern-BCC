"use client"

import { useMemo, useState } from "react"
import { Doctor, dummyDoctors } from "@/data/Doctor"
import DoctorCard from "./DoctorCard"
import DoctorCardChat from "../Profile/doctorCardChat"
import BookingPanel from "./BookingPanel"

export type DoctorSchedule = {
    dateLabel: string
    timeLabel: string
}

type DoctorCardProps = {
    doctor: Doctor
    active?: boolean
    onSelect: (doctor: Doctor) => void
}

export default function DoctorConsultationPage() {
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)

    const sortedDoctors = useMemo(() => dummyDoctors, [])

    const handleSelectDoctor = (doctor: Doctor) => {
        setSelectedDoctor(doctor)
        setSelectedTime(null)
    }

    return (
        <section className="h-screen overflow-hidden p-4">
            <div className="mx-auto grid h-full grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">

                {/* LEFT - LIST DOKTER */}
                <div className="flex h-full min-h-0 flex-col rounded-3xl bg-white p-4 shadow">

                    {/* SCROLL AREA */}
                    <div className="min-h-0 flex-1 overflow-y-auto pr-2">
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
                    </div>
                </div>

                {/* RIGHT - BOOKING PANEL */}
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