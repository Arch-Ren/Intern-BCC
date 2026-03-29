import Image from "next/image";
import { ActionButton } from "./ui/Button/Action";

type childType = {
    name: string;
    photo: string
    birthDate?: string;
    gender?: string;
    bloodType?: string;
    allergy?: string;
}

interface editChildProfileModalProps {
    isOpen: boolean
    child: childType | null
    onClose: () => void
}

export default function editChildProfileModal({ isOpen, child, onClose, }: editChildProfileModalProps) {
    if(!isOpen || !child) return null;

    return(
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="relative min-w-[500px] max-h-[700px] overflow-auto rounded-[32px] bg-white px-8 py-6" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-6 top-6 flex justify-center aspect-square w-8 rounded-full text-xl font-bold text-white bg-primary"
                > x </button>

                <div className="flex flex-col items-center">
                    <Image
                        src={child.photo} alt={child.name}
                        width={140}
                        height={140}
                        className="mb-6 aspect-square rounded-full object-cover object-top"
                    />

                    <div className="w-full space-y-4">
                        <div>
                            <label className="mb-1 block text-lg font-semibold text-black">Nama</label>
                            <input defaultValue={child.name} className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"/>
                        </div>

                        <div>
                            <label className="mb-1 block text-lg font-semibold text-black">Tanggal Lahir</label>
                            <input defaultValue={child.birthDate ?? "13 Maret 2019"} className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"/>
                        </div>

                        <div>
                            <label className="mb-1 block text-lg font-semibold text-black">Jenis Kelamin</label>
                            <input defaultValue={child.gender ?? "Perempuan"} className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"/>
                        </div>

                        <div>
                            <label className="mb-1 block text-lg font-semibold text-black">Golongan Darah</label>
                            <input defaultValue={child.bloodType ?? "AB"} className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"/>
                        </div>

                        <div>
                            <label className="mb-1 block text-lg font-semibold text-black">Alergi</label>
                            <input defaultValue={child.allergy ?? "-"} className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"/>
                        </div>

                        <div className="flex justify-end pt-4">
                            <ActionButton variant="secondary" rounded="xsm" className="min-w-[140px]" onClick={onClose}>Simpan</ActionButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}