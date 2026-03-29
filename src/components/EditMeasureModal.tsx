'use client'

import { useEffect, useState } from "react"
import { ActionButton } from "./ui/Button/Action"

type EditMeasureModalProps = {
    isOpen: boolean
    title: string
    unit: string;
    defaultValue: number
    onClose: () => void
    onSave: (value: number) => void
}

export default function EditMeasureModal({ isOpen, title, unit, defaultValue, onClose, onSave, }: EditMeasureModalProps) {
    const [value, setValue] = useState(String(defaultValue))

    useEffect(() => {
        setValue(String(defaultValue))
    }, [defaultValue])

    if(!isOpen) return null

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
            <div className="w-full max-w-[300px] rounded-[32px] bg-white p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <h2 className="mb-8 text-center text-3xl font-extrabold text-[#1F3A58]">{title}</h2>
                <div className="mb-6 flex items-center rounded-[18px] border border-slate-400 px-5 py-3">
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full bg-transparent text-center text-2xl font-bold text-[#1F3B63] outline-none"
                    />
                    <span className="ml-3 text-2xl font-bold text-[#1F3B63]">{unit}</span>
                    </div>

                    <div className="flex justify-end">
                        <ActionButton variant="primary" rounded="xsm"
                            className="w-[120px] h-[50px]"
                            onClick={() => onSave(Number(value))}>Simpan</ActionButton>
                    </div>
            </div>
        </div> 
    )
}