import { Doctor } from "@/data/Doctor"
import DoctorCard from "./doctorCard"

type DoctorScheduleSectionProps = {
    title?: string
    doctors: Doctor[]
}

export default function DoctorScheduleSection({
    title = "Riwayat G - Connect",
    doctors,
}: DoctorScheduleSectionProps) {
    return (
        <section className="h-[561px] rounded-[28px] bg-white p-5 md:p-6 shadow-2xl flex flex-col">
            <h2 className="shrink-0 text-[24px] font-semibold tracking-tight text-black md:text-[28px]">
                {title}
            </h2>

            <div className="mt-5 min-h-0 flex-1 overflow-y-auto space-y-3 pr-1">
                {doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </section>
    )
}