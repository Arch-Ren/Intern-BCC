import type { Doctor } from "@/lib/doctor"

type DoctorCardProps = {
    doctor: Doctor
    active?: boolean
    onSelect: (doctor: Doctor) => void
}

export default function DoctorCard({
    doctor,
    active = false,
    onSelect,
}: DoctorCardProps) {
    return (
        <div
            className={`rounded-2xl border bg-white p-3 shadow-sm transition hover:shadow-md ${active ? "border-emerald-400 ring-2 ring-emerald-100" : "border-slate-200"
                }`}
        >
            <button
                type="button"
                onClick={() => onSelect(doctor)}
                className="w-full text-left"
            >
                <div className="w-full aspect-square overflow-hidden rounded-xl bg-slate-100">
                    <img
                        src={doctor.image || "/images/default-avatar.png"}
                        alt={doctor.name}
                        className="w-full h-full object-cover object-[center_35%] transition hover:scale-[1.02]"
                        onError={(e) => {
                            e.currentTarget.src = "/images/default-avatar.png"
                        }}
                    />
                </div>

                <div className="mt-3 space-y-1">
                    <h3 className="line-clamp-1 text-xl font-bold text-slate-800">
                        {doctor.name}
                    </h3>
                    <p className="line-clamp-1 text-sm">{doctor.specialist}</p>

                    <div className="flex items-center gap-1 text-xs text-amber-500">
                        <span>★</span>
                        <span>{doctor.rating}</span>
                    </div>
                </div>
            </button>
        </div>
    )
}