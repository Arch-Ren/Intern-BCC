"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import EditParentProfileModal from "@/components/EditParentProfileModal"
import ProfileCard from "@/components/ProfileCard"
import ChildProfileSection from "@/components/Profile/ChildProfileSection"
import SavedEduhub from "@/components/Profile/savedEduhub"
import HistorySection from "@/components/Profile/history/HistorySection"
import DoctorScheduleSection from "@/components/Profile/doctorScheduleSection"

import { useAuthStore } from "@/stores/auth"
import { useChildrenStore } from "@/stores/children"
import type { Doctor } from "@/lib/doctor"
import { mapDoctorsResponse } from "@/lib/doctor"

export default function ProfilePage() {
    const router = useRouter()

    const token = useAuthStore((state) => state.token)
    const user = useAuthStore((state) => state.user)
    const fetchProfile = useAuthStore((state) => state.fetchProfile)
    const isLoadingProfile = useAuthStore((state) => state.isLoadingProfile)

    const fetchChildren = useChildrenStore((state) => state.fetchChildren)
    const clearChildren = useChildrenStore((state) => state.clearChildren)

    const [openEditParent, setOpenEditParent] = useState(false)
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [isLoadingDoctors, setIsLoadingDoctors] = useState(false)

    useEffect(() => {
        if (!token) {
            clearChildren()
            router.push("/signin")
            return
        }

        fetchProfile()
        fetchChildren()
    }, [token, fetchProfile, fetchChildren, clearChildren, router])

    useEffect(() => {
        const fetchDoctors = async () => {
            if (!token) return

            try {
                setIsLoadingDoctors(true)

                const res = await fetch("/api/dokter", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                })

                const json = await res.json()

                if (!res.ok) {
                    throw new Error(json?.message || "Gagal mengambil data dokter")
                }

                setDoctors(mapDoctorsResponse(json))
            } catch (error) {
                console.error("Gagal load dokter:", error)
            } finally {
                setIsLoadingDoctors(false)
            }
        }

        fetchDoctors()
    }, [token])

    if (!token) {
        return null
    }

    if (isLoadingProfile && !user) {
        return <div className="p-6">Memuat profile...</div>
    }

    return (
        <>
            <div className="grid min-h-screen grid-cols-11 items-stretch gap-5">
                <div className="col-span-4 flex min-h-0 flex-col gap-5">
                    <ProfileCard
                        type="parent"
                        name={user?.name || "Pengguna"}
                        image={user?.photo}
                        role={user?.email || "Parent"}
                        onChangeProfile={() => setOpenEditParent(true)}
                    />

                    <ChildProfileSection editMode="info" />
                </div>

                <div className="col-span-7 flex min-h-0 flex-col gap-5">
                    <SavedEduhub />

                    <Image
                        src="/images/ad-2.png"
                        alt="ad-profile"
                        width={1200}
                        height={300}
                        className="h-auto w-full"
                    />

                    <div className="grid min-h-0 flex-1 grid-cols-7 gap-5">
                        <div className="col-span-3 min-h-0">
                            <HistorySection />
                        </div>

                        <div className="col-span-4 min-h-0 rounded-2xl bg-white p-4">
                            {isLoadingDoctors ? (
                                <div>Loading dokter...</div>
                            ) : (
                                <DoctorScheduleSection doctors={doctors.slice(0, 3)} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <EditParentProfileModal
                isOpen={openEditParent}
                parent={{
                    id: user?.id ?? 0,
                    name: user?.name || "Pengguna",
                    email: user?.email || "",
                    photo: user?.photo || "/images/default-avatar.png",
                }}
                onClose={() => setOpenEditParent(false)}
            />
        </>
    )
}