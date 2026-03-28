import { Intakes } from "@/data/Intake";

export default function IntakesCard({ label, percentage, className = "" }: Intakes) {
    const safePercentage = Math.max(0, Math.min(percentage, 100))

    return(
        <div className={`w-full rounded-3xl border border-black bg-white px-4 py-4 shadow-sm ${className}`}>
            <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-3xl font-bold text-[#3a3a3a]">{label}</h3>
                <span className="text-2xl font-semibold text-[#FFE500]">{percentage}%</span>
            </div>

            <div className="h-4 w-full overflow-hidden rounded-full border border-gray-400 bg-gray-200">
                <div className="h-full rounded-full bg-gradient-to-r from-[#C0FFEF] to-[#43BA9C]" style={{width: `${safePercentage}%`}} />
            </div>
        </div>
    )
}