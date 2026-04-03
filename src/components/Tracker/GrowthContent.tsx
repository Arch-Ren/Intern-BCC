"use client";

import { useMemo, useState } from "react";

import StatusCard from "./StatusCard";
import MeasureCard from "./MeasureCard";
import EditMeasureModal from "@/components/EditMeasureModal";
import NutrientLog from "./NutrientLog";

import { useSelectedChild } from "@/context/SelectedChild";
import { useChildrenStore } from "@/stores/children";

type EditField = "height" | "weight" | "lila" | "head" | null;

export default function GrowthContent() {
    const { selectedChild: child } = useSelectedChild();
    const updateChild = useChildrenStore((state) => state.updateChild);
    const isSubmitting = useChildrenStore((state) => state.isSubmitting);
    const error = useChildrenStore((state) => state.error);

    const [editField, setEditField] = useState<EditField>(null);

    const age = useMemo(() => {
        if (!child?.tanggal_lahir) return 0;

        const birthDate = new Date(child.tanggal_lahir);
        const today = new Date();

        let result = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            result--;
        }

        return result;
    }, [child?.tanggal_lahir]);

    if (!child) return null;

    const isToddler = age < 5;

    const currentHeight = Number(child.tinggi) || 0;
    const currentWeight = Number(child.berat_badan) || 0;
    const currentLila = Number(child.lingkar_lengan) || 0;
    const currentHead = Number(child.lingkar_kepala) || 0;

    const bmiNumber =
        currentHeight > 0 && currentWeight > 0 ? Number(child.bmi) || 0 : 0;

    const bmiLabel =
        currentHeight > 0 && currentWeight > 0
            ? child.status || "Belum ada data"
            : "Belum ada data";

    const fieldConfig: Record<
        Exclude<EditField, null>,
        { title: string; unit: string; value: number }
    > = {
        height: {
            title: "Tinggi Badan",
            unit: "cm",
            value: currentHeight,
        },
        weight: {
            title: "Berat Badan",
            unit: "kg",
            value: currentWeight,
        },
        lila: {
            title: "LiLA",
            unit: "cm",
            value: currentLila,
        },
        head: {
            title: "Lingkar Kepala",
            unit: "cm",
            value: currentHead,
        },
    };

    const activeField = editField ? fieldConfig[editField] : null;

    const handleCloseModal = () => {
        if (isSubmitting) return;
        setEditField(null);
    };

    const handleSaveMeasure = async (newValue: number) => {
        if (!child?.id || !editField) return;

        if (!Number.isFinite(newValue) || newValue <= 0) {
            alert("Nilai harus lebih dari 0");
            return;
        }

        if (!child.nama || !child.tanggal_lahir || !child.gender) {
            console.error("DATA CHILD TIDAK LENGKAP:", child);
            alert("Data anak belum lengkap. Cek nama, tanggal lahir, dan gender.");
            return;
        }

        const normalizedGender =
            child.gender?.toLowerCase() === "laki-laki"
                ? "laki-laki"
                : "perempuan";

        const payload = {
            nama: child.nama.trim(),
            tanggal_lahir: child.tanggal_lahir,
            tinggi: editField === "height" ? newValue : currentHeight,
            berat_badan: editField === "weight" ? newValue : currentWeight,
            gender: normalizedGender,
            anak_ke: Number(child.anak_ke) || 1,
            lingkar_kepala: editField === "head" ? newValue : currentHead,
            lingkar_lengan: editField === "lila" ? newValue : currentLila,
            golongan_darah: child.golongan_darah || "-",
            alergi: child.alergi || "-",
            riwayat_penyakit: child.riwayat_penyakit || "-",
        };

        try {
            await updateChild(child.id, payload);
            setEditField(null);
        } catch (error) {
            console.error("UPDATE MEASURE ERROR:", error);
            alert("Gagal menyimpan perubahan data anak");
        }
    };

    return (
        <>
            <div>
                <section className="grid grid-cols-1 gap-5 lg:grid-cols-6">
                    <StatusCard
                        bmi={bmiLabel}
                        bmiNumber={bmiNumber}
                        className="col-span-2"
                    />

                    <MeasureCard
                        title="Tinggi"
                        value={currentHeight}
                        unit="cm"
                        actionType="button"
                        className="col-span-2"
                        onEdit={() => setEditField("height")}
                    />

                    <MeasureCard
                        title="Berat"
                        value={currentWeight}
                        unit="kg"
                        actionType="button"
                        className="col-span-2"
                        onEdit={() => setEditField("weight")}
                    />

                    {isToddler && (
                        <>
                            <MeasureCard
                                title="LiLA"
                                value={currentLila}
                                unit="cm"
                                actionType="icon"
                                className="col-span-3"
                                onEdit={() => setEditField("lila")}
                            />

                            <MeasureCard
                                title="Lingkar Kepala"
                                value={currentHead}
                                unit="cm"
                                actionType="icon"
                                className="col-span-3"
                                onEdit={() => setEditField("head")}
                            />
                        </>
                    )}
                </section>

                {error && (
                    <p className="mt-4 rounded-xl bg-red-100 px-4 py-3 text-sm font-medium text-red-700">
                        {error}
                    </p>
                )}

                <section className="bg-primary my-4 flex w-full flex-col items-center gap-6 rounded-[30px] px-14 py-4">
                    <NutrientLog />
                </section>
            </div>

            {activeField && (
                <EditMeasureModal
                    isOpen={!!editField}
                    title={activeField.title}
                    unit={activeField.unit}
                    defaultValue={activeField.value}
                    onClose={handleCloseModal}
                    onSave={handleSaveMeasure}
                    isLoading={isSubmitting}
                />
            )}
        </>
    );
}