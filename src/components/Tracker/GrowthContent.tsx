'use client'

import IntakesCard from "../Card/IntakesCard";
import StatusCard from "./StatusCard";
import MeasureCard from "./MeasureCard"
import Link from "next/link";

import { useSelectedChild } from "@/context/SelectedChild";

import { ActionButton } from "../ui/Button/Action";
import { dummyChildren } from "@/data/Children";
import { dummyIntakes } from "@/data/Intake";
import { Button } from "../ui/button";

export default function GrowthContent() {
const { selectedChild: child } = useSelectedChild()

    const data = dummyIntakes
    const isToddler = child.age < 5

    return(
        <div>
            <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <StatusCard bmi={child.bmi} bmiNumber={child.bmiNumber} />
                <MeasureCard title="Tinggi" value={child.weight} unit="cm" />
                <MeasureCard title="Berat" value={child.weight} unit="kg" />

                {isToddler && (
                    <>
                        <MeasureCard title="LiLA" value={child.upperArmCircumference ?? 0} unit="cm" />
                        <MeasureCard title="Lingkar Kepala" value={child.headCircumference ?? 0} unit="cm" />
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
    )
}