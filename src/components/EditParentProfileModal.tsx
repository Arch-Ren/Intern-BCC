"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { ActionButton } from "./ui/Button/Action"
import EditProfileModal from "./EditProfileModal"
import { uploadProfilePhotoService } from "@/app/dashboard/profile/services/profiles"
import { useAuthStore } from "@/stores/auth"

type ParentType = {
    id?: string | number
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
    const user = useAuthStore((state) => state.user)
    const setUser = useAuthStore((state) => state.setUser)

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [preview, setPreview] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        if (!isOpen || !parent) return

        setName(parent.name || "")
        setUsername(parent.username || "")
        setEmail(parent.email || "")
        setPhone(parent.phone || "")
        setPreview(parent.photo || "/images/default-avatar.png")
        setSelectedFile(null)
        setError("")
        setSuccess("")
    }, [isOpen, parent])

    useEffect(() => {
        if (!selectedFile) return

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => {
            URL.revokeObjectURL(objectUrl)
        }
    }, [selectedFile])

    const buttonLabel = useMemo(() => {
        return loading ? "Menyimpan..." : "Simpan"
    }, [loading])

    if (!isOpen || !parent) return null

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return

        if (!file.type.startsWith("image/")) {
            setError("File harus berupa gambar")
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            setError("Ukuran gambar maksimal 2 MB")
            return
        }

        setError("")
        setSelectedFile(file)
    }

    const handleSave = async () => {
        setError("")
        setSuccess("")

        try {
            setLoading(true)

            let uploadedPhotoUrl = parent.photo

            if (selectedFile) {
                const uploadResult = await uploadProfilePhotoService(selectedFile)
                uploadedPhotoUrl = uploadResult.url
            }

            if (user) {
                setUser({
                    ...user,
                    name: name || user.name,
                    username: username || user.username,
                    email: email || user.email,
                    phone: phone || user.phone,
                    photo: uploadedPhotoUrl || user.photo,
                })
            }

            setSuccess("Perubahan berhasil disimpan")
            onClose()
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Gagal menyimpan perubahan")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <EditProfileModal
            isOpen={isOpen}
            name={name || "Pengguna"}
            photo={preview || "/images/default-avatar.png"}
            onClose={onClose}
        >
            <div className="space-y-4">
                <div className="flex flex-col items-center gap-3">


                    <label className="cursor-pointer rounded-xl bg-[#DDF3EE] px-4 py-2 text-sm font-medium text-black">
                        Pilih Foto
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>

                    <p className="text-xs text-gray-500">Format gambar, maksimal 2 MB</p>
                </div>

                <div>
                    <label className="mb-1 block text-lg font-semibold text-black">Nama</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-lg font-semibold text-black">Username</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-lg font-semibold text-black">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-lg font-semibold text-black">Nomor</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                    />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}

                <div className="flex justify-end pt-4">
                    <ActionButton
                        variant="secondary"
                        rounded="xsm"
                        className="min-w-[140px]"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {buttonLabel}
                    </ActionButton>
                </div>
            </div>
        </EditProfileModal>
    )
}