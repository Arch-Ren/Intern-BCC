import Image from "next/image";
import { ActionButton } from "./ui/Button/Action";
import { dummyChildren } from "@/data/Children";

type child = (typeof dummyChildren)[number]

interface ProfileCardProps {
    child: child
    onChangeProfile: () => void
}

export default function ProfileCard({ child, onChangeProfile,}: ProfileCardProps) {
    return(
        <section className="flex min-h-[545px] items-center justify-center rounded-3xl bg-white shadow-xl">
            <div className="flex flex-col items-center gap-2 px-6 py-8 text-center">
                <Image
                src={child.photo} alt="photo"
                width={209}
                height={283}
                className="rounded-xl mb-4"
                />
                <p className="font-bold text-3xl">{child.name}</p>
                <p className="text-2xl">{child.gender}</p>
                <p className="text-2xl">{child.age} Tahun</p>
                <ActionButton variant="primary" rounded="xsm" className="font-semibold tracking-widest" onClick={onChangeProfile}>Ganti Profil</ActionButton>
            </div>
        </section>
    )
}