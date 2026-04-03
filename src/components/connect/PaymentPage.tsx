"use client"

import { useMemo, useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import DoctorCardChat from "../Profile/doctorCardChat"
import { Doctor } from "@/lib/doctor"
import { useChildrenStore } from "@/stores/children"

type PaymentMethod = {
    id: string
    name: string
    category: string
    image?: string
}
const paymentMethods: PaymentMethod[] = [
    { id: "qris", name: "QRIS", category: "Metode Pembayaran", image: "/images/qris-logo.png" },
    { id: "gopay", name: "Gopay", category: "E-Wallet", image: "/images/gopay-logo.png" },
    { id: "dana", name: "Dana", category: "E-Wallet", image: "/images/dana-logo.png" },
    { id: "shopeepay", name: "ShopeePay", category: "E-Wallet", image: "/images/shopeepay-logo.png" },
]

function formatRupiah(value: number) {
    return `Rp ${value.toLocaleString("id-ID")}`
}

export default function PaymentPageContent() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const doctorId = Number(searchParams.get("doctorId") ?? 0)
    const doctorName = searchParams.get("doctorName") ?? ""
    const specialist = searchParams.get("specialist") ?? ""
    const image = searchParams.get("image") ?? ""
    const dateLabel = searchParams.get("dateLabel") ?? ""
    const timeLabel = searchParams.get("timeLabel") ?? ""

    const { children, fetchChildren, isLoading } = useChildrenStore()
    const [selectedPatient, setSelectedPatient] = useState<string>("")
    const [selectedPayment, setSelectedPayment] = useState<string>("qris")

    useEffect(() => {
        fetchChildren()
    }, [fetchChildren])

    useEffect(() => {
        if (children.length > 0 && !selectedPatient) {
            setSelectedPatient(children[0].id)
        }
    }, [children, selectedPatient])

    const sessionFee = 150000
    const serviceFee = 2500
    const total = useMemo(() => sessionFee + serviceFee, [])

    const selectedDoctor: Doctor = useMemo(() => {
        return {
            id: String(doctorId),
            name: doctorName || "dr. Elena Wijaya, Sp.A",
            specialist: specialist || "Spesialis Anak",
            image: image || "/images/doctor-7.jpg",
            rating: 4.8,
            availableTimes: ["08:00", "09:00", "10:00", "13:00", "14:00", "15:00"],
            schedule: {
                dateLabel: dateLabel || "6 July 2026",
                timeLabel: timeLabel || "10.00 - 11.00",
            },
        }
    }, [doctorId, doctorName, specialist, image, dateLabel, timeLabel])

    return (
        <section className="h-screen overflow-hidden rounded-3xl bg-white p-4">
            <div className="mx-auto h-full max-w-6xl rounded-[28px] bg-white">

                <div className="grid h-[calc(100%-40px)] grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
                    <div className="min-h-0 rounded-[28px] bg-[#F1FFFB] p-6">
                        <div className="h-full overflow-y-auto p-5">
                            <h2 className="mb-4 text-2xl font-bold text-slate-700">Pilih Pasien</h2>

                            <div className="space-y-3">
                                {children.length > 0 ? (
                                    children.map((patient) => {
                                        const active = selectedPatient === patient.id

                                        return (
                                            <button
                                                key={patient.id}
                                                type="button"
                                                onClick={() => setSelectedPatient(patient.id)}
                                                className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 text-left shadow-sm"
                                            >
                                                <div>
                                                    <p className="font-semibold text-slate-700">{patient.nama}</p>
                                                    <p className="text-sm text-slate-500">{patient.anak_ke_label || `Anak ke-${patient.anak_ke}`}</p>
                                                </div>

                                                <div
                                                    className={`flex h-7 w-7 items-center justify-center rounded-full border-4 ${active ? "border-emerald-400" : "border-slate-300"
                                                        }`}
                                                >
                                                    {active && <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />}
                                                </div>
                                            </button>
                                        )
                                    })
                                ) : (
                                    <div className="rounded-2xl bg-white p-4 text-center text-slate-500 shadow-sm">
                                        {isLoading ? "Memuat data anak..." : "Belum ada data anak. Silakan tambah data anak di profil."}
                                    </div>
                                )}
                            </div>

                            <DoctorCardChat
                                doctor={selectedDoctor}
                                variant="payment"
                                hideChatButton
                                className="my-4"
                            />

                            <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                                <div className="mt-6 space-y-3 text-slate-700">
                                    <div className="flex items-center justify-between">
                                        <span>Biaya sesi 1 Jam</span>
                                        <span className="text-emerald-500">{formatRupiah(sessionFee)}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span>Biaya Layanan</span>
                                        <span className="text-emerald-500">{formatRupiah(serviceFee)}</span>
                                    </div>

                                    <div className="flex items-center justify-between text-2xl font-semibold">
                                        <span>Pembayaranmu</span>
                                        <span className="text-emerald-500">{formatRupiah(total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex min-h-0 flex-col rounded-[28px] bg-[#F1FFFB] p-5">
                        <h2 className="mb-4 text-2xl font-bold text-slate-700">Metode Pembayaran</h2>

                        <div className="rounded-2xl bg-white p-5 shadow-lg">
                            <div className="space-y-5">
                                <div>
                                    <p className="mb-3 font-semibold text-slate-700">Metode Pembayaran</p>

                                    <button
                                        type="button"
                                        onClick={() => setSelectedPayment("qris")}
                                        className="flex w-full items-center justify-between py-2 text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src="/images/qris-logo.png"
                                                alt="QRIS"
                                                className="h-10 w-10 rounded-xl object-cover"
                                            />
                                            <span className="text-slate-600">QRIS</span>
                                        </div>

                                        <div
                                            className={`flex h-7 w-7 items-center justify-center rounded-full border-4 ${selectedPayment === "qris" ? "border-slate-500" : "border-slate-300"
                                                }`}
                                        >
                                            {selectedPayment === "qris" && (
                                                <div className="h-2.5 w-2.5 rounded-full bg-slate-500" />
                                            )}
                                        </div>
                                    </button>
                                </div>

                                <div>
                                    <p className="mb-3 font-semibold text-slate-700">E-Wallet</p>

                                    <div className="space-y-3">
                                        {paymentMethods
                                            .filter((method) => method.category === "E-Wallet")
                                            .map((method) => (
                                                <button
                                                    key={method.id}
                                                    type="button"
                                                    onClick={() => setSelectedPayment(method.id)}
                                                    className="flex w-full items-center justify-between py-2 text-left"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={method.image}
                                                            alt={method.name}
                                                            className="h-10 w-10 rounded-xl object-cover"
                                                        />
                                                        <span className="font-medium text-slate-800">{method.name}</span>
                                                    </div>

                                                    <div
                                                        className={`flex h-7 w-7 items-center justify-center rounded-full border-4 ${selectedPayment === method.id
                                                            ? "border-slate-500"
                                                            : "border-slate-300"
                                                            }`}
                                                    >
                                                        {selectedPayment === method.id && (
                                                            <div className="h-2.5 w-2.5 rounded-full bg-slate-500" />
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-6">
                            <div className="mb-3 flex items-center justify-between text-2xl font-semibold text-slate-700">
                                <span>Total</span>
                                <span className="text-emerald-500">{formatRupiah(total)}</span>
                            </div>

                            <button
                                type="button"
                                onClick={() => router.push("/dashboard/connect")}
                                className="w-full rounded-xl bg-slate-800 px-4 py-4 text-sm font-semibold text-white hover:bg-slate-700"
                            >
                                Bayar Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}