"use client";

import { useEffect, useMemo, useState } from "react";
import { ActionButton } from "./ui/Button/Action";

type EditMeasureModalProps = {
    isOpen: boolean;
    title: string;
    unit: string;
    defaultValue: number;
    onClose: () => void;
    onSave: (value: number) => void | Promise<void>;
    isLoading?: boolean;
};

export default function EditMeasureModal({
    isOpen,
    title,
    unit,
    defaultValue,
    onClose,
    onSave,
    isLoading = false,
}: EditMeasureModalProps) {
    const [value, setValue] = useState(String(defaultValue));

    useEffect(() => {
        setValue(String(defaultValue));
    }, [defaultValue, isOpen]);

    const parsedValue = useMemo(() => Number(value), [value]);
    const isInvalid =
        value.trim() === "" || !Number.isFinite(parsedValue) || parsedValue <= 0;

    if (!isOpen) return null;

    const handleSave = async () => {
        if (isInvalid || isLoading) return;
        await onSave(parsedValue);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={isLoading ? undefined : onClose}
        >
            <div
                className="w-full max-w-[300px] rounded-[32px] bg-white p-8 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-8 text-center text-3xl font-extrabold text-[#1F3A58]">
                    {title}
                </h2>

                <div className="mb-2 flex items-center rounded-[18px] border border-slate-400 px-5 py-3">
                    <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full bg-transparent text-center text-2xl font-bold text-[#1F3B63] outline-none"
                        disabled={isLoading}
                    />
                    <span className="ml-3 text-2xl font-bold text-[#1F3B63]">
                        {unit}
                    </span>
                </div>

                {isInvalid && (
                    <p className="mb-4 text-center text-sm text-red-500">
                        Masukkan angka yang valid dan lebih dari 0
                    </p>
                )}

                <div className="flex justify-end gap-3">
                    <ActionButton
                        variant="secondary"
                        rounded="xsm"
                        className="h-[50px] w-[100px]"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Batal
                    </ActionButton>

                    <ActionButton
                        variant="primary"
                        rounded="xsm"
                        className="h-[50px] w-[120px]"
                        disabled={isLoading || isInvalid}
                        onClick={handleSave}
                    >
                        {isLoading ? "Menyimpan..." : "Simpan"}
                    </ActionButton>
                </div>
            </div>
        </div>
    );
}