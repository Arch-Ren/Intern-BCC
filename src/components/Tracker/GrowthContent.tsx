'use client'

import { useState } from "react";

import StatusCard from "./StatusCard";
import MeasureCard from "./MeasureCard"
import EditMeasureModal from "@/components/EditMeasureModal";
import NutrientLog from "./NutrientLog";

import { useSelectedChild } from "@/context/SelectedChild";

export default function GrowthContent() {
    const { selectedChild: child } = useSelectedChild()

    const isToddler = child.age < 5

    const [editField, setEditField] = useState< "height" | "weight" | "lila" | "head" | null>(null) 

    const fieldConfig = {
        height: {
            title: "Tinggi Badan",
            unit: "cm",
            value: child.height,
        },
        weight: {
            title: "Berat Badan",
            unit: "cm",
            value: child.weight,
        },
        lila: {
            title: "LiLA",
            unit: "cm",
            value: child.upperArmCircumference,
        },
        head: {
            title: "Lingkar Kepala",
            unit: "cm",
            value: child.headCircumference,
        }
    }

    const activeField = editField ? fieldConfig[editField] : null

    return(
        <>
            <div>
                <section className="grid grid-cols-1 gap-5 lg:grid-cols-6">
                    <StatusCard bmi={child.bmi} bmiNumber={child.bmiNumber} className="col-span-2"/>
                    <MeasureCard 
                        title="Tinggi" value={child.height} unit="cm" actionType="button"
                        className="col-span-2"
                        onEdit={() => setEditField("height")}/>
                    <MeasureCard 
                        title="Berat" value={child.weight} unit="kg" actionType="button"
                        className="col-span-2"
                        onEdit={() => setEditField("weight")}/>

                    {isToddler && (
                        <>
                            <MeasureCard 
                                title="LiLA" value={child.upperArmCircumference ?? 0} unit="cm" actionType="icon"
                                className="col-span-3"
                                onEdit={() => setEditField("lila")}/>
                            <MeasureCard 
                                title="Lingkar Kepala" value={child.headCircumference ?? 0} unit="cm" actionType="icon"
                                className="col-span-3"
                                onEdit={() => setEditField("head")}/>
                        </>
                    )}
                </section>
                    
                <section className="bg-primary rounded-[30px] w-full flex flex-col gap-6 items-center my-4 py-4 px-14">
                    <NutrientLog />
                </section>
            </div>

            {activeField && (
                <EditMeasureModal
                    isOpen={!!editField}
                    title={activeField.title}
                    unit={activeField.unit}
                    defaultValue={activeField.value ?? 0}
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