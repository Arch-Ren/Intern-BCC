import Image from "next/image"
import { Pencil } from "lucide-react"

import { LinkButton } from "./ui/Button/Link"

interface ChildProfileListProps {
    selectedIndex?: number
    onSelect?: (index: number) => void
    onEdit?: (index: number) => void
    showAddButton?: boolean
    pinAddButtonBottom?: boolean
    className?: string
}

import { useChildrenStore } from "@/stores/children"

export default function ChildProfileList({
    selectedIndex,
    onSelect,
    onEdit,
    showAddButton = true,
    pinAddButtonBottom = false,
    className = "",
}: ChildProfileListProps) {
    const children = useChildrenStore((state) => state.children)

    return (
        <div
            className={`${pinAddButtonBottom ? "flex h-full min-h-0 flex-col" : ""} ${className}`}
        >
            <div className={`${pinAddButtonBottom ? "flex-1 min-h-0 overflow-y-auto pr-1" : ""}`}>
                <div className="flex flex-col gap-4">
                    {children.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">
                            Belum ada data profil anak. Silakan tambahkan.
                        </div>
                    ) : (
                        children.map((child, index) => {
                            const isActive = index === selectedIndex
                            const label = child.anak_ke_label || (index === 0 ? "Anak Pertama" : `Anak Ke-${index + 1}`)

                            return (
                                <div
                                    key={child.id}
                                    className={`flex items-center justify-between rounded-full border px-4 py-3 transition ${isActive
                                        ? "border-primary bg-primary/10"
                                        : "border-primary hover:bg-gray-50"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => onSelect?.(index)}
                                        className="flex w-full items-center justify-between text-left"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={(child as any).photo || "/images/default-avatar.png"}
                                                alt={child.nama || "Anak"}
                                                width={48}
                                                height={48}
                                                className="aspect-square rounded-full object-cover object-top"
                                            />
                                            <p className="font-semibold">{child.nama}</p>
                                        </div>

                                        <p>{label}</p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onEdit?.(index)}
                                        className="ml-3 flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary/10"
                                        aria-label={`Edit ${child.nama || "Anak"}`}
                                    >
                                        <Pencil size={18} className="text-primary" />
                                    </button>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>

            {showAddButton && (
                <div className={pinAddButtonBottom ? "shrink-0 pt-5" : "mt-8"}>
                    <LinkButton
                        href="/childProfileForm"
                        rounded="xsm"
                        className={pinAddButtonBottom ? "w-full" : ""}
                    >
                        Tambah Profil Anak
                    </LinkButton>
                </div>
            )}
        </div>
    )
}