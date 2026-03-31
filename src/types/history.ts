export type LogHistoryBase = {
    id: number
    date: number
    day: string
    title: string
}

export type IntakeHistory = LogHistoryBase & {
    time: string
}

export type GrowthTrackerHistory = LogHistoryBase
