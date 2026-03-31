import type { GrowthRecord } from "@/types/growth"

export function getLatestGrowthRecord(
    childId: string,
    records: GrowthRecord[]
): GrowthRecord | null {
    const filteredRecords = records.filter((record) => record.childId === childId)

    if (filteredRecords.length === 0) return null

    return filteredRecords.sort(
        (a, b) =>
            new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()
    )[0]
}