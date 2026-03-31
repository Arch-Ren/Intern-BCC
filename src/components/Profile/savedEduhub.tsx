import { savedEduhub } from "@/data/savedEduhub"
import { LinkButton } from "../ui/Button/Link"

export default function SavedEduhub() {
    return (
        <div className="w-full bg-white rounded-[30px] max-h-[300px] overflow-y-auto p-6 space-y-3 shadow-2xl">
            <p className="font-semibold text-xl">Disimpan</p>

            {savedEduhub.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-between bg-primary rounded-xl px-4 py-3 min-h-[90px]"
                >
                    <h3 className="text-white text-sm font-medium max-w-[70%]">{item.title}</h3>
                    <LinkButton className="min-w-[150px] max-h-[40px]" href="/dashboard/eduhub" variant="secondary" rounded="xsm">Baca Lagi</LinkButton>
                </div>
            ))}
        </div>
    )
}