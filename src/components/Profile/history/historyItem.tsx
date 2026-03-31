import { Pencil } from "lucide-react"

type HistoryCardProps = {
    date: number
    day: string
    title: string
    subtitle: string
    onEdit?: () => void
}

export default function HistoryCard({
    date,
    day,
    title,
    subtitle,
    onEdit,
}: HistoryCardProps) {
    return (
        <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#176c57] to-[#48bfa7] px-3 py-2.5 text-white shadow-sm">
            <div className="flex w-[54px] shrink-0 flex-col items-center border-r border-white/50 pr-2 leading-none">
                <span className="text-[28px] font-semibold">
                    {String(date).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[10px] font-medium uppercase tracking-wide">
                    {day}
                </span>
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-[16px] font-medium leading-tight">
                    {title}
                </p>
                <p className="truncate text-[11px] text-white/85">{subtitle}</p>
            </div>

            <button
                type="button"
                onClick={onEdit}
                className="shrink-0 rounded-full p-1.5 transition hover:bg-white/10"
                aria-label={`Edit ${title}`}
            >
                <Pencil size={16} className="text-white" />
            </button>
        </div>
    )
}