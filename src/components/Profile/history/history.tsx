import { ReactNode } from "react"

type HistorySectionProps = {
    title: string
    children: ReactNode
}

export default function HistorySection({
    title,
    children,
}: HistorySectionProps) {
    return (
        <section className="h-[561px] rounded-[28px] bg-white p-4 md:p-5 shadow-2xl flex flex-col">
            <h2 className="shrink-0 text-[20px] font-semibold tracking-tight text-black">
                {title}
            </h2>

            <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
                {children}
            </div>
        </section>
    )
}