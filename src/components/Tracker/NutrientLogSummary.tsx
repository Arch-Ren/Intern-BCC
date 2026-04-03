"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Button } from "../ui/button";
import { ActionButton } from "../ui/Button/Action";
import IntakesCard from "../Card/IntakesCard";

import { useSelectedChild } from "@/context/SelectedChild";
import { fetchNutrisiHarian, type NutrisiHarian } from "@/services/nutrisi";

type Props = {
    onOpenPicker: () => void;
};

export default function NutrientLogSummary({ onOpenPicker }: Props) {
    const { selectedChild } = useSelectedChild();
    const [nutrisi, setNutrisi] = useState<NutrisiHarian | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!selectedChild?.id) {
            setNutrisi(null);
            return;
        }

        let cancelled = false;
        setIsLoading(true);

        fetchNutrisiHarian(selectedChild.id)
            .then((data) => {
                if (!cancelled) setNutrisi(data);
            })
            .catch((err) => {
                console.error("Gagal load nutrisi harian:", err);
                if (!cancelled) setNutrisi(null);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [selectedChild?.id]);

    const intakesData = useMemo(
        () => [
            { label: "Protein", percentage: nutrisi?.persen_protein ?? 0 },
            { label: "Kalori", percentage: nutrisi?.persen_kalori ?? 0 },
            { label: "Lemak", percentage: nutrisi?.persen_lemak ?? 0 },
        ],
        [nutrisi]
    );

    return (
        <>
            <div className="grid w-full grid-cols-[1fr_1.6fr_1fr] gap-4">
                {intakesData.map((item) => (
                    <IntakesCard key={item.label} {...item} />
                ))}
            </div>

            <div className="bg-white w-full flex justify-center items-center text-xl text-black p-4 rounded-2xl font-semibold">
                <p>Ingin tahu cara menghitung berat makanan?</p>
                <Button asChild variant="link" className="text-xl">
                    <Link href="./eduhub">Cek di sini</Link>
                </Button>
            </div>

            <div className="bg-white w-full flex flex-col justify-center rounded-2xl border border-black">
                <p className="text-2xl font-bold text-color4 p-4 border-b border-black w-full text-center mb-20">
                    Pencatatan hari ini
                </p>

                <ActionButton
                    variant="secondary"
                    className="mx-20 my-4 font-semibold tracking-wider"
                    rounded="xsm"
                    onClick={onOpenPicker}
                >Tambah</ActionButton>
            </div>
        </>
    );
}