import { Doctor } from "@/data/Doctor"
import DoctorCard from "./doctorCardChat"

type DoctorScheduleSectionProps = {
    doctors: Doctor[]
    onChatClick?: (doctor: Doctor) => void
}

export default function DoctorScheduleSection({
    doctors,
    onChatClick,
}: DoctorScheduleSectionProps) {
    return (
        <div className="flex flex-col gap-4">
            {doctors.map((doctor) => (
                <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    variant="history"
                    onChatClick={onChatClick ? () => onChatClick(doctor) : undefined}
                />
            ))}
        </div>
    )
}