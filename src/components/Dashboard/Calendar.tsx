'use client'

import { useEffect, useRef, useState, useMemo } from "react"
import { LinkButton } from "../ui/Button/Link"
import { useSelectedChild } from "@/context/SelectedChild"
import { getFoodLogService } from "@/services/makananLog"

export default function Calendar() {

type LogAPI = {
    id: string | number
    tanggal?: string
    created_at?: string
    waktu?: string
    jam?: string
    nama_makanan?: string
    judul?: string
    makanan?: string
    total_kalori?: number
    kalori?: number
    [key: string]: any
}

    const { selectedChild } = useSelectedChild()

    const todayObj = new Date()
    todayObj.setHours(0,0,0,0)
    
    // Generate 7 days (today - 5 to today + 1)
    const sevenDays = useMemo(() => {
        const days = []
        for(let i = -5; i <= 1; i++) {
            const d = new Date(todayObj)
            d.setDate(todayObj.getDate() + i)
            days.push(d)
        }
        return days
    }, [])

    const [allLogs, setAllLogs] = useState<any[]>([])
    const [selectedDateStr, setSelectedDateStr] = useState(todayObj.toISOString().split('T')[0])

    useEffect(() => {
        if (!selectedChild?.id) {
            setAllLogs([])
            return
        }

        let cancelled = false

        getFoodLogService(String(selectedChild.id))
            .then((resData) => {
                if (cancelled) return
                const rawLogs: LogAPI[] = Array.isArray(resData) ? resData : (resData?.data || [])
                setAllLogs(rawLogs)
            })
            .catch((err) => {
                console.error("Gagal get food log calendar:", err)
            })

        return () => { cancelled = true }
    }, [selectedChild?.id])

    const filteredLogs = useMemo(() => {
        return allLogs.filter((log) => {
            const logDate = new Date(log.tanggal || log.created_at || new Date().toISOString())
            logDate.setHours(0,0,0,0)
            const logDateStr = logDate.toISOString().split('T')[0]
            return logDateStr === selectedDateStr
        })
    }, [allLogs, selectedDateStr])

    return (
        <section className="relative rounded-3xl bg-primary shadow-xl w-full h-full overflow-hidden">
            <div className="flex h-full flex-col">
                <div className="flex flex-col bg-[#F1FFFB] w-full rounded-2xl">
                    <div className="flex items-center justify-between bg-primary p-4 rounded-2xl">
                        <h3 className="font-medium text-[20px] text-white">MY CALENDAR</h3>

                        <div className="relative">
                            <button type="button" 
                                className="flex items-center rounded-xl px-4 py-2 text-[16px] font-medium text-[#8D8D8D] bg-white cursor-default">
                                <span>{todayObj.toLocaleDateString("id-ID", { month: "long" })} {todayObj.getFullYear()}</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 p-2">
                        {sevenDays.map((dateObjItem) => {
                            const dateStr = dateObjItem.toISOString().split('T')[0]
                            const isSelected = dateStr === selectedDateStr
                            
                            const dayName = dateObjItem.toLocaleDateString("id-ID", { weekday: "short" })
                            const dayNum = dateObjItem.getDate()

                            return (
                                <button key={dateStr} type="button" onClick={() => setSelectedDateStr(dateStr)}
                                    className={`flex flex-col items-center max-w-full min-h-[70px] justify-center text-[18px] relative ${isSelected ? "bg-primary text-white rounded-xl" : "bg-[#F1FFFB] text-black"
                                        }`}>
                                    <span className="text-[14px] font-normal">{dayName}</span>
                                    <span className="text-[18px] font-medium">{dayNum}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="flex flex-1 flex-col overflow-y-auto px-6 py-5">
                    <div className="space-y-3">
                        {filteredLogs.length > 0 ? (
                            filteredLogs.map((item, idx) => {
                                const time = item.waktu || item.jam || item.time || "00.00"
                                
                                let titleString = "Log Makanan"
                                if (Array.isArray(item.makanan)) {
                                    titleString = item.makanan.map((m: any) => m.nama || m.nama_makanan || "Makanan").join(", ")
                                } else if (item.judul || item.nama_makanan || typeof item.makanan === "string") {
                                    titleString = item.judul || item.nama_makanan || item.makanan
                                }

                                return (
                                    <div key={item.id || idx}
                                        className="flex items-center gap-12 rounded-xl bg-[#F1FFFB] px-8 py-2"
                                    >
                                        <p className="min-w-[110px] text-lg font-medium text-black">{time}</p>
                                        <p className="text-lg font-medium text-black line-clamp-1">{titleString}</p>
                                    </div>
                                )
                            })
                        ) : (
                            <p className="text-slate-500 text-center py-4">Belum ada riwayat kalender pada hari ini.</p>
                        )}
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