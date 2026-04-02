import Image from "next/image"
import { ActionButton } from "./ui/Button/Action"

type ParentProfileCardProps = {
    type: "parent"
    name: string
    image?: string
    role?: string
    onChangeProfile: () => void
    layout?: "default" | "compact" | "stretch"
}

type ChildProfileCardProps = {
    type: "child"
    name: string
    image?: string
    gender?: "Laki-Laki" | "Perempuan" | string
    age?: number | string
    onChangeProfile: () => void
    layout?: "default" | "compact" | "stretch"
    isEmpty?: boolean
}

type ProfileCardProps = ParentProfileCardProps | ChildProfileCardProps

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
    const imageSrc = props.image || "/images/default-avatar.png"
    const displayName = props.name || "Pengguna"

    if (props.type === "child" && props.isEmpty) {
        return (
            <section className={sectionClass}>
                <div className="flex flex-col items-center justify-center gap-4 px-6 py-8 text-center h-full">
                    <p className="text-xl font-semibold text-gray-500">Data anak belum tersedia</p>
                    <ActionButton
                        variant="primary"
                        rounded="xsm"
                        className={`${buttonMarginClass} font-semibold tracking-wider min-w-[200px]`}
                        onClick={props.onChangeProfile}
                    >
                        Tambah Profil
                    </ActionButton>
                </div>
            </section>
        )
    }

    return (
        <section className={sectionClass}>
            <div className="flex flex-col items-center gap-2 px-6 py-8 text-center">
                <Image
                    src={imageSrc}
                    alt={displayName}
                    width={imageSize.width}
                    height={imageSize.height}
                    className="mb-4 rounded-xl object-cover"
                />

                <p className="text-3xl font-bold">{displayName}</p>

                {props.type === "parent" ? (
                    <p className="text-2xl">{props.role || "Parent"}</p>
                ) : (
                    <>
                        <p className="text-2xl">{props.gender || "-"}</p>
                        <p className="text-2xl">
                            {props.age !== undefined && props.age !== null ? `${props.age} Tahun` : "-"}
                        </p>
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