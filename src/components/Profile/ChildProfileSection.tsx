"use client"

import { useState } from "react"
import { useChildrenStore } from "@/stores/children"
import EditChildProfileModal from "../EditChildProfileModal"
import ChildInfoModal from "../ChildInfoModal"
import ChildProfileList from "../ChildProfileList"

interface ChildProfileSectionProps {
    selectedIndex?: number
    onSelect?: (index: number) => void
    editMode?: "direct" | "info"
}

type ChildGender = "Laki-Laki" | "Perempuan"

function normalizeGender(gender?: string): ChildGender {
    const value = gender?.toLowerCase()

    if (value === "laki-laki" || value === "laki laki" || value === "male") {
        return "Laki-Laki"
    }

    return "Perempuan"
}

export default function ChildProfileSection({
    selectedIndex,
    onSelect,
    editMode = "direct",
}: ChildProfileSectionProps) {
    const children = useChildrenStore((state) => state.children)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [isInfoOpen, setIsInfoOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)

    function handleEdit(index: number) {
        setActiveIndex(index)

        if (editMode === "info") {
            setIsInfoOpen(true)
            return
        }

        setIsEditOpen(true)
    }

    const selectedChild = activeIndex !== null ? children[activeIndex] : null

    const activeChild = selectedChild
        ? {
            id: selectedChild.id,
            name: selectedChild.nama,
            photo: (selectedChild as any).photo || "/images/default-avatar.png",
            birthDate: selectedChild.tanggal_lahir,
            gender: normalizeGender(selectedChild.gender),
            age: selectedChild.umur ?? 0,
            height: selectedChild.tinggi ?? 0,
            weight: selectedChild.berat_badan ?? 0,
            bloodType: selectedChild.golongan_darah ?? "-",
            allergy: selectedChild.alergi ?? "-",
        }
        : null

    return (
        <>
            <section className="flex h-full min-h-0 flex-col rounded-[32px] bg-white p-5 shadow-xl">
                <div className="shrink-0 pb-5 text-center">
                    <h2 className="text-[20px] font-semibold">Profil Anak</h2>
                </div>

                <div className="flex-1 min-h-0">
                    <ChildProfileList
                        selectedIndex={selectedIndex}
                        onSelect={onSelect}
                        onEdit={handleEdit}
                        pinAddButtonBottom
                    />
                </div>
            </section>

            <ChildInfoModal
                isOpen={isInfoOpen}
                child={activeChild}
                onClose={() => {
                    setIsInfoOpen(false)
                    setActiveIndex(null)
                }}
                onEdit={() => {
                    setIsInfoOpen(false)
                    setIsEditOpen(true)
                }}
            />

            <EditChildProfileModal
                isOpen={isEditOpen}
                child={activeChild}
                onClose={() => {
                    setIsEditOpen(false)
                    setActiveIndex(null)
                }}
            />
        </>
    )
}