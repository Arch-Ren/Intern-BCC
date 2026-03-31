"use client"

import Image from "next/image"
import { ReactNode } from "react"

interface ProfileModalLayoutProps {
    isOpen: boolean
    name: string
    photo: string
    onClose: () => void
    children: ReactNode
}

export default function EditProfileModal({
    isOpen,
    name,
    photo,
    onClose,
    children,
}: ProfileModalLayoutProps) {
    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                className="relative min-w-[500px] max-h-[700px] overflow-auto rounded-[32px] bg-white px-8 py-6"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-6 top-6 aspect-square w-8 rounded-full bg-primary text-xl font-bold text-white flex items-center justify-center">
                    x
                </button>

                <div className="flex flex-col items-center">
                    <Image
                        src={photo}
                        alt={name}
                        width={140}
                        height={140}
                        className="mb-6 aspect-square rounded-full object-cover object-top"
                    />

                    <div className="w-full space-y-4">{children}</div>
                </div>
            </div>
        </div>
    )
}