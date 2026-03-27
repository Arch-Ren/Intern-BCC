'use client'

import Image from "next/image"
import { ActionButton } from "./Button/Action"
import type { EduHub } from "@/data/Eduhub"

type EduhubModalProps = {
    article: EduHub | null
    isOpen: boolean
    onClose:() => void
}

export default function EduhubModal({article, isOpen, onClose}: EduhubModalProps) {
    if(!isOpen || !article) return null

    return(
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 px-4" onClick={onClose}>
            <div className="relative w-full max-w-[520px] rounded-2xl bg-white p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={onClose} className="absolute right-4 top-3 text-2xl font-bold text-[#4B4B4B]">
                    x
                </button>

                <div className="max-h-[85vh] overflow-y-auto pr-1">
                    <Image 
                        src={article.picture} alt={article.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="mb-4 h-auto w-full rounded-xl object-cover"
                    />

                    <h2 className="mb-2 text-[24px] font-semibold leading-snug text-[#333]">
                        {article.title}
                    </h2>

                    <div className="mb-4 flex justify-between text-[10px] text-gray-500">
                        <span>Penerbit</span>
                        <span>18 Feb 2025</span>
                    </div>

                    <div className="space-y-4 text-[15px] leading-7 text-[#333]">
                        {article.content.split("\n\n").map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <ActionButton variant="primary" rounded="xsm" onClick={onClose}>
                        Simpan
                        </ActionButton>
                    </div>
                </div>
            </div>
        </div>
    )
}