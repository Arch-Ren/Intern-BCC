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

    const activeChild =
        activeIndex !== null && children[activeIndex]
            ? {
                id: children[activeIndex].id,
                name: children[activeIndex].nama,
                photo: (children[activeIndex] as any).photo || "/images/default-avatar.png",
                birthDate: children[activeIndex].tanggal_lahir,
                gender: children[activeIndex].gender,
                age: children[activeIndex].umur ?? 0,
                height: children[activeIndex].tinggi ?? 0,
                weight: children[activeIndex].berat_badan ?? 0,
                bloodType: children[activeIndex].golongan_darah ?? "-",
                allergy: children[activeIndex].alergi ?? "-",
            } as any
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