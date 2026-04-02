"use client"

import { Search, Heart, Mic, Paperclip, Camera, Smile, SendHorizonal } from "lucide-react"
import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Doctor, dummyDoctors } from "@/data/Doctor"
import { Suspense } from "react"

type ChatListItem = {
    id: number
    name: string
    preview: string
    time: string
    avatar: string
    active?: boolean
    unread?: number
}

type Message = {
    id: number
    sender: "patient" | "doctor"
    text: string
}

type ScheduleItem = {
    id: number
    dayLabel: string
    time: string
    patientName: string
    age: string
    status: string
    statusColor: string
}

const chatList: ChatListItem[] = [
    {
        id: 1,
        name: "Nicha Mina",
        preview: "Halo Dokter dr. Elena Wijaya, Sp.A,",
        time: "13.30",
        avatar: "/images/patient-1.jpg",
        unread: 1,
    },
    {
        id: 2,
        name: "Phupu Tana",
        preview: "Baik dok",
        time: "10.30",
        avatar: "/images/patient-2.jpg",
        active: true,
    },
    {
        id: 3,
        name: "Santy Vani",
        preview: "Terima kasih Dokter",
        time: "09.30",
        avatar: "/images/patient-3.jpg",
    },
    {
        id: 4,
        name: "Ganin Casey",
        preview: "Baik dok, Terimakasih.",
        time: "14.00",
        avatar: "/images/patient-2.jpg",
    },
]

const messages: Message[] = [
    {
        id: 1,
        sender: "patient",
        text: "Saat ini saya memperhatikan bahwa Permian sangat kesulitan saat diminta menulis atau menggambar, pegang pensilnya tampak masih kaku dan ia cepat merasa lelah. Saya khawatir ini menghambat proses adaptasinya di kelas 1 SD nanti.",
    },
    {
        id: 2,
        sender: "doctor",
        text: "Halo Ibu Phupu. Secara fisik di data Geazy, pertumbuhan Permian normal. Namun, keluhan cepat lelah menulis di usia 6 tahun bisa jadi indikasi otot motorik halusnya belum kuat.",
    },
    {
        id: 3,
        sender: "patient",
        text: "Kalau main Lego atau nonton video dia bisa fokus lama Dok, lebih dari 30 menit. Tapi kalau diminta menulis tugas sekolah, dia langsung gelisah dan banyak alasan untuk berhenti.",
    },
    {
        id: 4,
        sender: "doctor",
        text: "Jika fokus di hobi masih bagus, kemungkinan besar ia menghindari menulis karena sakit atau tidak nyaman di tangan. Saya sarankan latihan otot tangan ringan di rumah dan evaluasi lanjutan.",
    },
    {
        id: 5,
        sender: "patient",
        text: "Baik Dok, terima kasih penjelasannya. Saya akan coba latihan di rumah dan segera buat janji temu lewat aplikasi Geazy.",
    },
]

const doctorSchedules: ScheduleItem[] = [
    {
        id: 1,
        dayLabel: "Hari Ini",
        time: "13.30",
        patientName: "Kenha Krittang",
        age: "5 tahun",
        status: "Sedang Berlangsung",
        statusColor: "text-cyan-500",
    },
    {
        id: 2,
        dayLabel: "Hari Ini",
        time: "09.30",
        patientName: "Permian Naratan",
        age: "6 tahun",
        status: "Selesai",
        statusColor: "text-emerald-500",
    },
    {
        id: 3,
        dayLabel: "Hari Ini",
        time: "08.30",
        patientName: "Damian Tanavian",
        age: "8 tahun",
        status: "Selesai",
        statusColor: "text-emerald-500",
    },
]

function Loading() {
    return <div>Loading...</div>
}

export default function ChatDoctorPageContent() {
    const searchParams = useSearchParams()
    const [messageInput, setMessageInput] = useState("")

    const doctorId = Number(searchParams.get("doctorId") ?? 0)
    const doctorName = searchParams.get("doctorName") ?? ""
    const specialist = searchParams.get("specialist") ?? ""
    const image = searchParams.get("image") ?? ""

    const selectedDoctor: Doctor = useMemo(() => {
        const doctorFromDummy = dummyDoctors.find((doctor) => doctor.id === doctorId)

        return {
            id: doctorId || doctorFromDummy?.id || 0,
            name: doctorName || doctorFromDummy?.name || "dr. Elena Wijaya, Sp.A",
            specialist: specialist || doctorFromDummy?.specialist || "Spesialis Anak",
            image: image || doctorFromDummy?.image || "/images/doctor-7.jpg",
            schedule: doctorFromDummy?.schedule,
        }
    }, [doctorId, doctorName, specialist, image])

    return (
        <Suspense fallback={<Loading />}>
            <section className="h-screen overflow-hidden bg-[#edf6f3] p-6">
                <div className="mx-auto grid h-full max-w-[1500px] grid-cols-[320px_1fr_320px] overflow-hidden rounded-[28px] bg-[#edf6f3] shadow-sm">
                    {/* LEFT SIDEBAR */}
                    <aside className="flex h-full min-h-0 flex-col bg-[#edf6f3] p-6">
                        {/* LOGO */}
                        <div className="mb-6 flex items-center gap-2">
                            <img
                                src="/images/geazy-logo-nobg.png"
                                alt="Geazy Logo"
                                className="h-10 w-auto object-contain"
                            />
                        </div>

                        {/* SEARCH */}
                        <div className="mb-5 flex items-center gap-3 rounded-full bg-white px-4 py-3 text-slate-400 shadow-sm">
                            <Search className="h-5 w-5" />
                            <input
                                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                                placeholder="Search"
                            />
                        </div>

                        {/* HEADER */}
                        <div className="mb-4 flex items-end justify-between">
                            <h2 className="text-2xl font-semibold text-[#1589a0] leading-tight">
                                Hari Ini
                            </h2>
                            <span className="text-sm text-slate-500">
                                Senin, 2 Juli 2026
                            </span>
                        </div>

                        {/* LIST */}
                        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
                            {chatList.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={`w-full rounded-2xl px-4 py-3 text-left shadow-sm transition ${item.active
                                        ? "bg-[#16879b] text-white"
                                        : "bg-white text-slate-700"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {/* AVATAR */}
                                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-200">
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        {/* CONTENT */}
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="truncate text-sm font-semibold">
                                                    {item.name}
                                                </h3>
                                                <span className="text-xs opacity-70">
                                                    {item.time}
                                                </span>
                                            </div>

                                            <p className="mt-1 truncate text-xs opacity-80">
                                                {item.preview}
                                            </p>
                                        </div>

                                        {/* UNREAD */}
                                        {item.unread ? (
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] text-[#16879b] font-bold">
                                                {item.unread}
                                            </div>
                                        ) : null}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* CENTER CHAT */}
                    <main className="flex h-full min-h-0 flex-col bg-white p-6">
                        <div className="mb-4 flex items-center justify-between border-b border-slate-300 pb-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src="/images/patient-2.jpg"
                                    alt="Phupu Tana"
                                    className="h-14 w-14 rounded-full object-cover"
                                />
                                <h1 className="text-[22px] font-semibold text-slate-700">
                                    Phupu Tana
                                </h1>
                            </div>

                            <div className="flex items-center gap-4 text-slate-500">
                                <Search className="h-5 w-5" />
                                <Heart className="h-5 w-5" />
                            </div>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === "doctor" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[72%] rounded-[18px] px-5 py-4 text-sm leading-relaxed ${message.sender === "doctor"
                                                ? "bg-[#16879b] text-white"
                                                : "bg-[#f2f2f2] text-slate-700"
                                                }`}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 border-t border-slate-300 pt-4">
                            <div className="flex items-center gap-3 rounded-full border border-slate-300 px-4 py-3">
                                <Mic className="h-5 w-5 text-slate-500" />
                                <input
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                                    placeholder="Ketik pesan"
                                />
                                <Paperclip className="h-5 w-5 text-slate-500" />
                                <Camera className="h-5 w-5 text-slate-500" />
                                <Smile className="h-5 w-5 text-slate-500" />
                                <button
                                    type="button"
                                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#16879b] text-white"
                                >
                                    <SendHorizonal className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </main>

                    {/* RIGHT SIDEBAR */}
                    <aside className="flex h-full min-h-0 flex-col bg-[#edf6f3] px-6 py-8">
                        {/* Doctor Profile */}
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-white shadow-sm md:h-28 md:w-28">
                                <img
                                    src={selectedDoctor.image}
                                    alt={selectedDoctor.name}
                                    className="h-full w-full object-cover object-[center_20%]"
                                />
                            </div>

                            <h2 className="mx-auto max-w-[240px] text-[18px] font-semibold leading-snug text-[#1589a0] md:text-[20px]">
                                {selectedDoctor.name}
                            </h2>

                            <p className="mx-auto mt-1 max-w-[220px] text-sm text-slate-600 md:text-[15px]">
                                {selectedDoctor.specialist}
                            </p>
                        </div>

                        {/* Schedule */}
                        <div className="min-h-0 flex-1">
                            <h3 className="mb-4 text-[20px] font-semibold text-slate-800 md:text-[22px]">
                                Jadwal
                            </h3>

                            <div className="space-y-3 overflow-y-auto pr-1">
                                {doctorSchedules.map((item) => (
                                    <div
                                        key={item.id}
                                        className="rounded-2xl bg-white p-3 shadow-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* Time Box */}
                                            <div className="flex w-[72px] shrink-0 flex-col items-center justify-center rounded-xl bg-[#edf3f1] px-2 py-2">
                                                <span className="text-[10px] leading-none text-slate-400">
                                                    {item.dayLabel}
                                                </span>
                                                <span className="mt-1 text-[14px] font-semibold leading-none text-slate-500 md:text-[16px]">
                                                    {item.time}
                                                </span>
                                            </div>

                                            {/* Patient Info */}
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-[14px] font-semibold text-slate-800 md:text-[15px]">
                                                    {item.patientName}
                                                </p>
                                                <p className="text-[12px] text-slate-400 md:text-[13px]">
                                                    {item.age}
                                                </p>
                                                <p className={`text-[12px] font-medium md:text-[13px] ${item.statusColor}`}>
                                                    {item.status}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex shrink-0 flex-col gap-2">
                                                <button
                                                    type="button"
                                                    className="min-w-[72px] rounded-lg bg-[#5fd1bd] px-3 py-1.5 text-[12px] font-medium text-white transition hover:bg-[#49c4ae]"
                                                >
                                                    Detail
                                                </button>

                                                <button
                                                    type="button"
                                                    className="min-w-[72px] rounded-lg bg-[#5fd1bd] px-3 py-1.5 text-[12px] font-medium text-white transition hover:bg-[#49c4ae]"
                                                >
                                                    Chat
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </Suspense>
    )
}