import HistoryCard from "@/components/Profile/history/historyItem"
import HistorySection from "@/components/Profile/history/history"
import { dummyGrowthTrackerHistory, dummyIntakesHistory, } from "@/data/LogHistory"

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
    const combinedHistory: HistoryItem[] = [
        ...dummyIntakesHistory.map((item) => ({
            ...item,
            subtitle: "Nutrient Log Drop-down",
        })),
        ...dummyGrowthTrackerHistory.map((item) => ({
            ...item,
            subtitle: "G - Growth Tracker",
        })),
    ]

    const groupedHistory = groupByDate(combinedHistory)

    return (
        <div className="h-full min-h-0 w-full">
            <HistorySection title="Riwayat Pencatatan">
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
            </HistorySection>
        </div>
    )
}