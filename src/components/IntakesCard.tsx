import { Intakes } from "@/data/Intake";

export default function IntakesCard({ label, current, max }: Intakes) {
    const percentage = Math.min((current / max) * 100, 100)

    return(
        <div className="flex flex-col gap-4 bg-white px-6 py-3 rounded-3xl shadow-xl">
            <div className="flex justify-between items-center">
                <p className="font-bold text-5xl text-[#1F3A58]">{label}</p>
                <p className="text-[#FFE500] text-3xl font-bold">{current}%</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                    className={`h-4 rounded-full`}
                    style={{ width: `${percentage}% `}}
                />
            </div>
        </div>
    )
}