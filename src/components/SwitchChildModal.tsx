import Image from "next/image";
import { useState } from "react";

import { dummyChildren } from "@/data/Children";

import { LinkButton } from "./ui/Button/Link";
import EditChildProfileModal from "./EditChildProfileModal";

interface SwitchChildrenModalProps {
    isOpen: boolean
    selectedIndex: number
    onClose: () => void
    onSelect: (index: number) => void
}

export default function ProfileSwitchModal({ isOpen, selectedIndex, onClose, onSelect}: SwitchChildrenModalProps) {
    const [editIndex, setEditIndex] = useState<number | null>(null)
    
    if (!isOpen) return null

    return(
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
                <div className="min-w-[500px] rounded-[32px] bg-white p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                    <div className="pb-6 grid grid-cols-3 items-center">
                        <h2 className="col-start-2 text-xl font-bold ">Profil Anak</h2>
                        <button type="button" onClick={onClose} className="col-start-3 text-xl font-bold text-black text-right pr-4"> x </button>
                    </div>
                
                    <div className="flex flex-col gap-4">
                        {dummyChildren.map((child, index) => {
                            const isActive = index === selectedIndex

                            return(
                                <div key={child.name}
                                    className={`flex items-center justify-between rounded-full border px-4 py-3 text-left transition ${
                                        isActive ? "border-primary bg-primary/10" : "border-primary hover:bg-gray-50"
                                    }`}
                                >
                                    <button type="button" onClick={() => onSelect(index)} className="w-full">
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-4 items-center">
                                                <Image 
                                                    src={child.photo} alt={child.name}
                                                    width={48}
                                                    height={48}
                                                    className="rounded-full object-cover aspect-square object-top"
                                                />
                                                <p className="font-semibold">{child.name}</p>
                                            </div>
                                            <p className="">{index === 0 ? "Anak Pertama" : `Anak Ke-${index + 1}`}</p>
                                        </div>                                                                
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setEditIndex(index)}
                                        className="ml-3 flex items-center justify-center h-9 aspect-square rounded-full hover:bg-primary/10"
                                    >
                                        <Image
                                        src="/images/Pencil.png"
                                        alt="edit"
                                        width={18}
                                        height={18}
                                        />
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    <LinkButton href="/dashboard" rounded="xsm" className="mt-8">Tambah Profil Anak</LinkButton>
                </div>
            </div>

            <EditChildProfileModal
                isOpen={editIndex !== null}
                child={editIndex !== null ? dummyChildren[editIndex] : null}
                onClose={() => setEditIndex(null)}
            />
        </>
    )
}