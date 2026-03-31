"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { ActionButton } from "@/components/ui/Button/Action"

type ChildInfoModalProps = {
    isOpen: boolean
    onClose: () => void
    onEdit: () => void
    child: {
        id: string | number
        name: string
        photo: string
        birthDate: string
        gender: "Laki-Laki" | "Perempuan"
        age: number
        height?: number
        weight?: number
        bloodType?: string
        allergy?: string
    } | null
}

export default function ChildInfoModal({
    isOpen,
    onClose,
    onEdit,
    child,
}: ChildInfoModalProps) {
    if (!isOpen || !child) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={onClose}
        >
            <div
                className="relative max-w-[500px] rounded-[28px] bg-white p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#49c5a8] text-white"
                    aria-label="Tutup modal"
                >
                    <X size={18} />
                </button>

                <h2 className="mb-6 text-[24px] font-semibold text-black">
                    Informasi Anak :
                </h2>

                <div className="grid grid-cols-[1fr_120px] gap-6">
                    <div className="space-y-3 text-[18px] text-black">
                        <div className="grid grid-cols-[140px_16px_1fr]">
                            <span>Nama</span>
                            <span>:</span>
                            <span>{child.name}</span>
                        </div>

                        <div className="grid grid-cols-[140px_16px_1fr]">
                            <span>Tanggal Lahir</span>
                            <span>:</span>
                            <span>{child.birthDate}</span>
                        </div>

                        <div className="grid grid-cols-[140px_16px_1fr]">
                            <span>Jenis Kelamin</span>
                            <span>:</span>
                            <span>{child.gender}</span>
                        </div>

                        <div className="grid grid-cols-[140px_16px_1fr]">
                            <span>Umur</span>
                            <span>:</span>
                            <span>{child.age} tahun</span>
                        </div>

                        <div className="grid grid-cols-[140px_16px_1fr]">
                            <span>Tinggi badan</span>
                            <span>:</span>
                            <span>{child.height ?? "-"} cm</span>
                        </div>

                        <div className="grid grid-cols-[140px_16px_1fr]">
                            <span>Berat Badan</span>
                            <span>:</span>
                            <span>{child.weight ?? "-"} kg</span>
                        </div>

                        <div className="grid grid-cols-[140px_16px_1fr]">
                            <span>Golongan Darah</span>
                            <span>:</span>
                            <span>{child.bloodType ?? "-"}</span>
                        </div>

                        <div className="grid grid-cols-[140px_16px_1fr]">
                            <span>Alergi</span>
                            <span>:</span>
                            <span>{child.allergy ?? "-"}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex justify-end">
                    <ActionButton
                        variant="primary"
                        rounded="xsm"
                        className="font-semibold"
                        onClick={onEdit}
                    >
                        Edit Data Anak
                    </ActionButton>
                </div>
            </div>
        </div>
    )
}