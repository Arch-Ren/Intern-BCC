import Image from "next/image"
import { ActionButton } from "./ui/Button/Action"

type ProfileCardProps =
    | {
        type: "parent"
        name: string
        image: string
        role: string
        onChangeProfile: () => void
        layout?: "default" | "compact" | "stretch"
    }
    | {
        type: "child"
        name: string
        image: string
        gender: "Laki-Laki" | "Perempuan"
        age: number
        onChangeProfile: () => void
        layout?: "default" | "compact" | "stretch"
    }

export default function ProfileCard(props: ProfileCardProps) {
    const layout = props.layout ?? "default"

    const sectionClass =
        layout === "stretch"
            ? "flex h-full min-h-0 items-center justify-center rounded-3xl bg-white shadow-xl"
            : layout === "compact"
                ? "flex items-center justify-center rounded-3xl bg-white px-6 py-8 shadow-xl"
                : "flex min-h-[520px] items-center justify-center rounded-3xl bg-white shadow-xl"

    const imageSize =
        layout === "compact"
            ? { width: 160, height: 200 }
            : { width: 209, height: 283 }

    const buttonMarginClass = layout === "compact" ? "mt-8" : "mt-12"

    return (
        <section className={sectionClass}>
            <div className="flex flex-col items-center gap-2 px-6 py-8 text-center">
                <Image
                    src={props.image}
                    alt={props.name}
                    width={imageSize.width}
                    height={imageSize.height}
                    className="mb-4 rounded-xl object-cover"
                />

                <p className="text-3xl font-bold">{props.name}</p>

                {props.type === "parent" ? (
                    <p className="text-2xl">{props.role}</p>
                ) : (
                    <>
                        <p className="text-2xl">{props.gender}</p>
                        <p className="text-2xl">{props.age} Tahun</p>
                    </>
                )}

                <ActionButton
                    variant="primary"
                    rounded="xsm"
                    className={`${buttonMarginClass} font-semibold tracking-wider`}
                    onClick={props.onChangeProfile}
                >
                    {props.type === "parent" ? "Edit Profil" : "Ganti Profil"}
                </ActionButton>
            </div>
        </section>
    )
}