import { CalendarDays, Clock3, MessageCircle } from "lucide-react"
import { Doctor } from "@/data/Doctor"

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
    return (
        <div className="flex items-center gap-3 rounded-[18px] bg-gradient-to-r from-[#39b79f] via-[#2f9d88] to-[#176c57] p-3 text-white">
            <div className="h-[100px] w-[104px] shrink-0 overflow-hidden rounded-[4px] bg-white/80">
                <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-full w-full object-cover object-top"
                />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[18px] font-bold leading-tight md:text-[20px]">
                            {doctor.name}
                        </h3>

                        <p className="mt-1 truncate text-[14px] text-white/95 md:text-[15px]">
                            {doctor.specialist}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf3f1] text-[#a7adaa] transition hover:scale-[1.1]"
                        aria-label={`Chat ${doctor.name}`}
                    >
                        <MessageCircle className="h-4 w-4" />
                    </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4 rounded-[12px] bg-[#edf3f1] px-3 py-2 text-[#a7adaa]">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span className="text-[14px] font-semibold md:text-[15px]">
                            {doctor.schedule.dateLabel}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4" />
                        <span className="text-[14px] font-semibold md:text-[15px]">
                            {doctor.schedule.timeLabel}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}