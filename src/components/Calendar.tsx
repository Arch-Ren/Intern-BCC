'use client'

import { useEffect, useRef, useState } from "react"
import { dummyCalendarMonths, dummyIntakesHistory } from "@/data/Calendar"
import { LinkButton } from "./Button/Link"

export default function Calendar() {
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(0)
    const [isMonthPopupOpen, setIsMonthPopupOpen] = useState(false)

    const popupRef = useRef<HTMLDivElement | null>(null)

    const selectedMonth = dummyCalendarMonths[selectedMonthIndex]

    const [selectedDay, setSelectedDay] = useState(selectedMonth.days.find((day) => day.isActive)?.day ?? 1)

    useEffect(() => {
        const activeDay = selectedMonth.days.find((day) => day.isActive)?.day ?? selectedMonth.days[0]?.day ?? 1
        setSelectedDay(activeDay)
    }, [selectedMonthIndex])

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node

            if(popupRef.current && !popupRef.current.contains(target)) {
                setIsMonthPopupOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return(
        <section className="relative rounded-3xl bg-primary shadow-xl w-full h-full overflow-hidden">
            <div className="flex h-full flex-col">
                <div className="flex flex-col bg-[#F1FFFB] w-full rounded-2xl">
                    <div className="flex items-center justify-between bg-primary p-4 rounded-2xl">
                        <h3 className="font-medium text-[20px] text-white">MY CALENDAR</h3>

                        <div className="relative" ref={popupRef}>
                            <button type="button" onClick={() => setIsMonthPopupOpen((prev) => !prev)}
                            className="flex items-center rounded-xl px-4 py-2 text-[16px] font-medium text-[#8D8D8D] bg-white">
                                <span>{selectedMonth.month} {selectedMonth.year}</span>
                                <span className="text-sm">▼</span>
                            </button>

                            {isMonthPopupOpen && (
                                <div className="absolute right-0 top-[54px] z-50 min-w-[170px] rounded-2xl bg-white p-2 shadow-2xl border border-[#E5E7EB]">
                                    {dummyCalendarMonths.map((item, index) => (
                                        <button key={`${item.month}-${item.year}`} type="button" 
                                            onClick={() => {
                                                setSelectedMonthIndex(index)
                                                setIsMonthPopupOpen(false)
                                            }}
                                            className={`block w-full rounded-xl px-4 py-3 text-left text-[15px] ${
                                                index === selectedMonthIndex? "bg-primary text-white" : "text-[#243B63] hover:bg-[#F3F6FB]"
                                            }`}>{item.month} {item.year}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-7 p-2">
                        {selectedMonth.days.map((item) => {
                            const isSelected = selectedDay === item.day

                            return(
                                <button key={item.day} type="button" onClick={() => setSelectedDay(item.day)}
                                className={`flex flex-col items-center max-w-full min-h-[70px] justify-center text-[18px] relative ${
                                    isSelected? "bg-primary text-white rounded-xl" : "bg-[#F1FFFB] text-black"
                                    }`}>
                                    <span className="text-[14px] font-normal">{item.dayName}</span>
                                    <span className="text-[18px] font-medium">{item.day}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="flex flex-1 flex-col px-6 py-5">
                        <div className="space-y-3">
                            {dummyIntakesHistory.map((item) => (
                                <div key={item.id}
                                    className="flex items-center gap-12 rounded-xl bg-[#F1FFFB] px-8 py-2"
                                    >
                                    <p className="min-w-[110px] text-lg font-medium text-black">{item.time}</p>
                                    <p className="text-lg font-medium text-black">{item.title}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-auto pt-10">
                            <div className="flex justify-end border-t border-white pt-3">
                                <LinkButton href="/dashboard" variant="secondary" rounded="xsm" className="max-h-[40px]">Riwayat</LinkButton>
                            </div>
                    </div>
                </div>
            </div>
        </section>
    )
}