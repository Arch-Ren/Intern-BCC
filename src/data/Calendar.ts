export type CalendarDay = {
    day: number
    dayName: string
    hasEvent?: boolean
    isActive?: boolean
}

export type CalendarMonth = {
    month: string
    year: number
    days: CalendarDay[]
}

export const dummyCalendarMonths: CalendarMonth[] = [
    {
        month: "Januari",
        year: 2026,
        days: [
            { day: 1, dayName: "Sunday", hasEvent: false },
            { day: 2, dayName: "Sunday", hasEvent: true },
            { day: 3, dayName: "Sunday", hasEvent: false },
            { day: 4, dayName: "Sunday", hasEvent: false },
            { day: 5, dayName: "Sunday", hasEvent: true },
            { day: 6, dayName: "Sunday", hasEvent: false },
            { day: 7, dayName: "Sunday", hasEvent: false },
        ]
    },
    {
        month: "Februari",
        year: 2026,
        days: [
            { day: 1, dayName: "Sunday", hasEvent: false },
            { day: 2, dayName: "Sunday", hasEvent: true },
            { day: 3, dayName: "Sunday", hasEvent: false },
            { day: 4, dayName: "Sunday", hasEvent: false },
            { day: 5, dayName: "Sunday", hasEvent: true },
            { day: 6, dayName: "Sunday", hasEvent: false },
            { day: 7, dayName: "Sunday", hasEvent: false },
        ]
    },
    {
        month: "Maret",
        year: 2026,
        days: [
            { day: 1, dayName: "Sunday", hasEvent: false },
            { day: 2, dayName: "Sunday", hasEvent: true },
            { day: 3, dayName: "Sunday", hasEvent: false },
            { day: 4, dayName: "Sunday", hasEvent: false },
            { day: 5, dayName: "Sunday", hasEvent: true },
            { day: 6, dayName: "Sunday", hasEvent: false },
            { day: 7, dayName: "Sunday", hasEvent: false },
        ]
    },
]