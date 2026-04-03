"use client"

import { useEffect, useState } from "react"
import { ActionButton } from "./ui/Button/Action"
import EditProfileModal from "./EditProfileModal"
import { useChildrenStore } from "@/stores/children"

type ChildType = {
    id?: string | number
    name: string
    photo: string
    birthDate?: string
    gender?: string
    bloodType?: string
    allergy?: string
    anakKe?: number | string
    riwayatPenyakit?: string

    // tetap ada di data, tapi tidak diedit dari modal
    tinggi?: number | string
    beratBadan?: number | string
    lingkarKepala?: number | string
    lingkarLengan?: number | string
}

interface EditChildProfileModalProps {
    isOpen: boolean
    child: ChildType | null
    onClose: () => void
}

export default function EditChildProfileModal({
    isOpen,
    child,
    onClose,
}: EditChildProfileModalProps) {
    const updateChild = useChildrenStore((state) => state.updateChild)
    const isSubmitting = useChildrenStore((state) => state.isSubmitting)

    const [name, setName] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [gender, setGender] = useState("")
    const [bloodType, setBloodType] = useState("")
    const [allergy, setAllergy] = useState("")
    const [anakKe, setAnakKe] = useState("")
    const [riwayatPenyakit, setRiwayatPenyakit] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (!isOpen || !child) return

        setName(child.name || "")
        setBirthDate(child.birthDate || "")
        setGender(child.gender || "")
        setBloodType(child.bloodType || "")
        setAllergy(child.allergy || "")
        setAnakKe(child.anakKe?.toString() || "")
        setRiwayatPenyakit(child.riwayatPenyakit || "")
        setError("")
    }, [isOpen, child])

    if (!isOpen || !child) return null

    const handleSave = async () => {
        if (!child.id) {
            setError("ID anak tidak ditemukan")
            return
        }

        if (!name.trim() || !birthDate || !gender) {
            setError("Nama, tanggal lahir, dan jenis kelamin wajib diisi")
            return
        }

        try {
            setError("")

            await updateChild(child.id, {
                nama: name.trim(),
                tanggal_lahir: birthDate,
                gender: gender.toLowerCase() === "laki-laki" ? "laki-laki" : "perempuan",
                anak_ke: Number(anakKe) || 0,
                golongan_darah: bloodType || "",
                alergi: allergy || "tidak ada",
                riwayat_penyakit: riwayatPenyakit || "tidak ada",

                // pertahankan data lama, jangan diedit dari modal ini
                tinggi: Number(child.tinggi) || 0,
                berat_badan: Number(child.beratBadan) || 0,
                lingkar_kepala: Number(child.lingkarKepala) || 0,
                lingkar_lengan: Number(child.lingkarLengan) || 0,
            })

            onClose()
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Gagal mengedit data anak")
            }
        }
    }

    return (
        <EditProfileModal
            isOpen={isOpen}
            name={name || child.name}
            photo={child.photo}
            onClose={onClose}
        >
            <div>
                <label className="mb-1 block text-lg font-semibold text-black">Nama</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                />
            </div>

            <div>
                <label className="mb-1 block text-lg font-semibold text-black">Tanggal Lahir</label>
                <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                />
            </div>

            <div>
                <label className="mb-1 block text-lg font-semibold text-black">Jenis Kelamin</label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="laki-laki">Laki-laki</option>
                    <option value="perempuan">Perempuan</option>
                </select>
            </div>

            <div>
                <label className="mb-1 block text-lg font-semibold text-black">Anak Ke</label>
                <input
                    type="number"
                    value={anakKe}
                    onChange={(e) => setAnakKe(e.target.value)}
                    className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                />
            </div>

            <div>
                <label className="mb-1 block text-lg font-semibold text-black">Golongan Darah</label>
                <input
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                />
            </div>

            <div>
                <label className="mb-1 block text-lg font-semibold text-black">Alergi</label>
                <input
                    value={allergy}
                    onChange={(e) => setAllergy(e.target.value)}
                    className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                />
            </div>

            <div>
                <label className="mb-1 block text-lg font-semibold text-black">Riwayat Penyakit</label>
                <input
                    value={riwayatPenyakit}
                    onChange={(e) => setRiwayatPenyakit(e.target.value)}
                    className="w-full rounded-xl bg-[#DDF3EE] px-4 py-3 outline-none"
                />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex justify-end pt-4">
                <ActionButton
                    variant="secondary"
                    rounded="xsm"
                    className="min-w-[140px]"
                    onClick={handleSave}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Menyimpan..." : "Simpan"}
                </ActionButton>
            </div>
        </EditProfileModal>
    )
}