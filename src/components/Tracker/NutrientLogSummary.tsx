import Link from "next/link";

import { Button } from "../ui/button";
import { ActionButton } from "../ui/Button/Action";
import IntakesCard from "../Card/IntakesCard";

import { dummyIntakes } from "@/data/Intake";

type Props = {
    onOpenPicker: () => void;
};

export default function NutrientLogSummary({ onOpenPicker }: Props) {
    return (
        <>
            <div className="grid w-full grid-cols-[1fr_1.6fr_1fr] gap-4">
                {dummyIntakes.map((item) => (
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