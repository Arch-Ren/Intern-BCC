import type { GrowthRecord } from "@/types/growth"

export const dummyGrowthRecords: GrowthRecord[] = [
    {
        id: "gr-1",
        childId: "1",
        recordedAt: "2026-06-01T08:00:00.000Z",
        height: 104,
        weight: 17.5,
        upperArmCircumference: 16,
        headCircumference: 34,
    },
    {
        id: "gr-2",
        childId: "1",
        recordedAt: "2026-06-20T08:00:00.000Z",
        height: 105,
        weight: 18,
        upperArmCircumference: 16.2,
        headCircumference: 34.2,
    },
    {
        id: "gr-3",
        childId: "2",
        recordedAt: "2026-06-10T08:00:00.000Z",
        height: 85,
        weight: 12,
        upperArmCircumference: 14,
        headCircumference: 30,
    },
    {
        id: "gr-4",
        childId: "2",
        recordedAt: "2026-06-25T08:00:00.000Z",
        height: 86,
        weight: 12.4,
        upperArmCircumference: 14.2,
        headCircumference: 30.3,
    },
]