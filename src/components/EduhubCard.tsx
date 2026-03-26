import Image from "next/image"
import { ActionButton } from "./Button/Action"
import { EduHub } from "@/data/Eduhub"

export default function EduhubCard({ item }: { item: EduHub}) {
    return(
        <div className="bg-white rounded-3xl w-full p-4 shadow-lg flex flex-col">
            <Image 
                src={item.picture} alt="contentPhoto"
                width={366}
                height={173}
                className="rounded-3xl w-full h-[270px] object-cover"
            />
            <p className="py-4 text-xl">{item.tittle}</p>
            <div className="mt-auto flex justify-end">
                <ActionButton variant="secondary" rounded="lg" className="font-semibold">Baca Selengkapnya</ActionButton>
            </div>
        </div>
    )
}