'use client'

import { useMemo, useState } from "react"

import StatusCard from "./StatusCard"
import MeasureCard from "./MeasureCard"
import EditMeasureModal from "@/components/EditMeasureModal"
import NutrientLog from "./NutrientLog"

import { useSelectedChild } from "@/context/SelectedChild"

import { calculateAge } from "@/utils/date"
import { calculateBMI, getBMICategory } from "@/utils/bmi"
import { getLatestGrowthRecord } from "@/utils/growth"

import { dummyGrowthRecords } from "@/data/GrowthRecord"

type EditField = "height" | "weight" | "lila" | "head" | null

export default function GrowthContent() {
    const { selectedChild: child } = useSelectedChild()

    const age = calculateAge(child.birthDate)
    const isToddler = age < 5

    const latestGrowthRecord = useMemo(() => {
        return getLatestGrowthRecord(child.id, dummyGrowthRecords)
    }, [child.id])

    const bmiNumber = latestGrowthRecord
        ? calculateBMI(latestGrowthRecord.weight, latestGrowthRecord.height)
        : 0

    const bmiLabel = latestGrowthRecord ? getBMICategory(bmiNumber) : "Belum ada data"

    const [editField, setEditField] = useState<EditField>(null)

    const fieldConfig = {
        height: {
            title: "Tinggi Badan",
            unit: "cm",
            value: latestGrowthRecord?.height ?? 0,
        },
        weight: {
            title: "Berat Badan",
            unit: "kg",
            value: latestGrowthRecord?.weight ?? 0,
        },
        lila: {
            title: "LiLA",
            unit: "cm",
            value: latestGrowthRecord?.upperArmCircumference ?? 0,
        },
        head: {
            title: "Lingkar Kepala",
            unit: "cm",
            value: latestGrowthRecord?.headCircumference ?? 0,
        },
    }

    const activeField = editField ? fieldConfig[editField] : null

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
                        value={latestGrowthRecord?.height ?? 0}
                        unit="cm"
                        actionType="button"
                        className="col-span-2"
                        onEdit={() => setEditField("height")}
                    />

                    <MeasureCard
                        title="Berat"
                        value={latestGrowthRecord?.weight ?? 0}
                        unit="kg"
                        actionType="button"
                        className="col-span-2"
                        onEdit={() => setEditField("weight")}
                    />

                    {isToddler && (
                        <>
                            <MeasureCard
                                title="LiLA"
                                value={latestGrowthRecord?.upperArmCircumference ?? 0}
                                unit="cm"
                                actionType="icon"
                                className="col-span-3"
                                onEdit={() => setEditField("lila")}
                            />

                            <MeasureCard
                                title="Lingkar Kepala"
                                value={latestGrowthRecord?.headCircumference ?? 0}
                                unit="cm"
                                actionType="icon"
                                className="col-span-3"
                                onEdit={() => setEditField("head")}
                            />
                        </>
                    )}
                </section>

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
                    onClose={() => setEditField(null)}
                    onSave={(newValue: number) => {
                        console.log(editField, newValue)
                        setEditField(null)
                    }}
                />
            )}
        </>
    )
}   