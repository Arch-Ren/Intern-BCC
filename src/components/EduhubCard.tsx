import Image from "next/image"
import { ActionButton } from "./Button/Action"
import { EduHub } from "@/data/Eduhub"

type EduhubCardProps = {
    item: EduHub
    onReadMore: (item: EduHub) => void
}

export default function EduhubCard({ item, onReadMore }: EduhubCardProps) {
    return(
        <div className="bg-white rounded-3xl w-full p-4 shadow-lg flex flex-col">
            <Image 
                src={item.picture} alt="contentPhoto"
                width={366}
                height={173}
                className="rounded-3xl w-full h-[270px] object-cover"
            />

            <p className="py-4 text-xl">{item.title}</p>

            <div className="mt-auto flex justify-end">
                <ActionButton variant="secondary" rounded="lg" className="font-semibold" onClick={() => onReadMore(item)}>
                    Baca Selengkapnya
                </ActionButton>
            </div>
        </div>
    )
}