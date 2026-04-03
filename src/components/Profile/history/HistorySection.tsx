import { useState, useEffect } from "react"
import HistoryCard from "@/components/Profile/history/historyItem"
import HistorySection from "@/components/Profile/history/history"
import { useSelectedChild } from "@/context/SelectedChild"
import { getFoodLogService } from "@/services/makananLog"
type HistoryItem = {
    id: string | number
    date: number
    day: string
    title: string
    subtitle?: string
}

function groupByDate(items: HistoryItem[]) {
    const grouped = items.reduce<Record<string, HistoryItem[]>>((acc, item) => {
        const key = `${item.date}-${item.day}`
        if (!acc[key]) acc[key] = []
        acc[key].push(item)
        return acc
    }, {})

    return Object.entries(grouped).map(([key, values]) => ({
        key,
        date: values[0].date,
        day: values[0].day,
        items: values,
    }))
}

export default function RiwayatPencatatanPage() {
    const { selectedChild } = useSelectedChild()
    const [foodLogs, setFoodLogs] = useState<HistoryItem[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!selectedChild?.id) {
            setFoodLogs([])
            return
        }

        let cancelled = false;
        setIsLoading(true)

        getFoodLogService(String(selectedChild.id))
            .then((resData) => {
                if (cancelled) return
                const rawLogs = Array.isArray(resData) ? resData : (resData?.data || [])
                const mappedLogs: HistoryItem[] = rawLogs.map((log: any, index: number) => {
                    const dateObj = new Date(log.tanggal || log.created_at || new Date().toISOString())
                    const kalori = log.total_kalori || log.kalori || 0

                    let titleString = "Log Makanan"
                    if (Array.isArray(log.makanan)) {
                        titleString = log.makanan.map((m: any) => m.nama || m.nama_makanan || "Makanan").join(", ")
                    } else if (log.judul || log.nama_makanan || typeof log.makanan === "string") {
                        titleString = log.judul || log.nama_makanan || log.makanan
                    }

                    return {
                        id: log.id || log.id_log || `log-${index}`,
                        date: dateObj.getDate(),
                        day: dateObj.toLocaleDateString("id-ID", { month: "short" }),
                        title: titleString,
                        subtitle: "Nutrient Log Drop-down",
                    }
                })
                setFoodLogs(mappedLogs)
            })
            .catch((err) => console.error(err))
            .finally(() => {
                if (!cancelled) setIsLoading(false)
            })

        return () => { cancelled = true }
    }, [selectedChild?.id])

    const groupedHistory = groupByDate(foodLogs)

    return (
        <div className="h-full min-h-0 w-full">
            <HistorySection title="Riwayat Pencatatan">
                {isLoading ? (
                    <div className="text-center p-4 text-slate-500">Memuat riwayat...</div>
                ) : (
                <div className="space-y-4">
                    {groupedHistory.map((group, groupIndex) => (
                        <div key={group.key}>
                            <div className="space-y-2">
                                {group.items.map((item) => (
                                    <HistoryCard
                                        key={item.id}
                                        date={item.date}
                                        day={item.day}
                                        title={item.title}
                                        subtitle={item.subtitle ?? ""}
                                    />
                                ))}
                            </div>

                            {groupIndex !== groupedHistory.length - 1 && (
                                <div className="my-4 h-[2px] w-full bg-black" />
                            )}
                        </div>
                    ))}
                </div>
                )}
            </HistorySection>
        </div>
    )
}