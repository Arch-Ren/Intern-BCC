import Image from "next/image";
import { dummyChildren } from "@/data/Children";
import { LinkButton } from "./ui/Button/Link";

interface SwitchChildrenModalProps {
    isOpen: boolean
    selectedIndex: number
    onClose: () => void
    onSelect: (index: number) => void
}

export default function ProfileSwitchModal({ isOpen, selectedIndex, onClose, onSelect}: SwitchChildrenModalProps) {
    if (!isOpen) return null

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="min-w-[500px] rounded-[32px] bg-white p-4 shadow-2xl">
                <div className="pb-6 grid grid-cols-3 items-center">
                    <h2 className="col-start-2 text-xl font-bold ">Profil Anak</h2>
                    <button type="button" onClick={onClose} className="col-start-3 text-xl font-bold text-black text-right pr-4"> x </button>
                </div>
                
                <div className="flex flex-col gap-4">
                    {dummyChildren.map((child, index) => {
                        const isActive = index === selectedIndex

                        return(
                            <button key={child.name} type="button" onClick={() => onSelect(index)}
                                className={`flex items-center justify-between rounded-full border px-4 py-3 text-left transition ${
                                    isActive ? "border-primary bg-primary/10" : "border-primary hover:bg-gray-50"
                                }`}
                            >
                                <div className="flex justify-center items-center gap-4">
                                    <Image 
                                        src={child.photo} alt={child.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full object-cover aspect-square object-top"
                                    />
                                    <p className="font-semibold">{child.name}</p>
                                </div>
                                
                                <p>
                                    {index === 0 ? "Anak Pertama" : `Anak Ke-${index + 1}`}
                                </p>
                            </button>
                        )   
                    })}
                </div>

                <LinkButton href="/dashboard" rounded="xsm" className="mt-8">Tambah Profil Anak</LinkButton>
            </div>
        </div>
    )
}