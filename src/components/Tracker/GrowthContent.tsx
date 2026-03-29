'use client'

import Link from "next/link";
import { useState } from "react";

import IntakesCard from "../Card/IntakesCard";
import StatusCard from "./StatusCard";
import MeasureCard from "./MeasureCard"
import EditMeasureModal from "@/components/EditMeasureModal";

import { useSelectedChild } from "@/context/SelectedChild";

import { ActionButton } from "../ui/Button/Action";
import { dummyIntakes } from "@/data/Intake";
import { Button } from "../ui/button";

export default function GrowthContent() {
    const data = dummyIntakes

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
                    <h1 className="text-white font-bold text-4xl">Nutrient Log Drop-down</h1>
                    
                    <div className="grid w-full grid-cols-[1fr_1.6fr_1fr] gap-4">
                        {data.map((item) => (
                            <IntakesCard key={item.label} {...item} />
                        ))}
                    </div>

                    <div className="bg-white w-full flex justify-center items-center text-xl text-black p-4 rounded-2xl font-semibold">
                        <p>Ingin tahu cara menghitung berat makanan?</p>
                        <Button asChild variant="link" className="text-xl">
                            <Link href="./tracker">Cek di sini</Link>
                        </Button>
                    </div>

                    <div className="bg-white w-full flex flex-col justify-center rounded-2xl border border-black ">
                        <p className="text-2xl font-bold text-color4 p-4 border-b border-black w-full text-center mb-20">Pencatatan hari ini</p>
                        <ActionButton variant="secondary" className="mx-20 my-4 font-semibold tracking-wider" rounded="xsm">Tambah</ActionButton>
                    </div>
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