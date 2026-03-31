"use client"

import { ActionButton } from "./ui/Button/Action"
import EditProfileModal from "./EditProfileModal"

type ParentType = {
    name: string
    photo: string
    username?: string
    email?: string
    phone?: string
}

interface EditParentProfileModalProps {
    isOpen: boolean
    parent: ParentType | null
    onClose: () => void
}

export default function EditParentProfileModal({
    isOpen,
    parent,
    onClose,
}: EditParentProfileModalProps) {
    if (!isOpen || !parent) return null

    return (
        <EditProfileModal
            isOpen={isOpen}
            name={parent.name}
            photo={parent.photo}
            onClose={onClose}
        >
            <div>
                <label className="mb-1 block text-lg font-semibold text-black">Nama</label>
                <input
                    defaultValue={parent.name}
                    className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                />
            </div>

            <div>
                <label className="mb-1 block text-lg font-semibold text-black">Username</label>
                <input
                    defaultValue={parent.username ?? "LaylaRhma"}
                    className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                />
            </div>

            <div>
                <label className="mb-1 block text-lg font-semibold text-black">Email</label>
                <input
                    defaultValue={parent.email ?? "lylrahma@gmail.com"}
                    className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                />
            </div>

            <div>
                <label className="mb-1 block text-lg font-semibold text-black">Nomor</label>
                <input
                    defaultValue={parent.phone ?? "088798556436"}
                    className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                />
            </div>

            <div className="flex justify-end pt-4">
                <ActionButton
                    variant="secondary"
                    rounded="xsm"
                    className="min-w-[140px]"
                    onClick={onClose}
                >
                    Simpan
                </ActionButton>
            </div>
        </EditProfileModal>
    )
}