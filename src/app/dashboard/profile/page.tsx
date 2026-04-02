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

import { dummyDoctors } from "@/data/Doctor"
import { dummyChildren } from "@/data/Children"

import { useAuthStore } from "@/stores/auth"

export default function ProfilePage() {
    const router = useRouter()

    const token = useAuthStore((state) => state.token)
    const user = useAuthStore((state) => state.user)
    const fetchProfile = useAuthStore((state) => state.fetchProfile)
    const isLoadingProfile = useAuthStore((state) => state.isLoadingProfile)

    const [openEditParent, setOpenEditParent] = useState(false)

    useEffect(() => {
        if (!token) {
            router.push("/signin")
            return
        }

        if (!user) {
            fetchProfile()
        }
    }, [token, user, fetchProfile, router])

    if (!token) {
        return null
    }

    if (isLoadingProfile && !user) {
        return <div className="p-6">Memuat profile...</div>
    }

    return (
        <>
            <div className="grid grid-cols-11 gap-5 items-stretch min-h-screen">
                <div className="col-span-4 flex flex-col gap-5 min-h-0">
                    <ProfileCard
                        type="parent"
                        name={user?.name || "Pengguna"}
                        image={user?.photo}
                        role={user?.email || "Parent"}
                        onChangeProfile={() => setOpenEditParent(true)}
                    />

                    <ChildProfileSection editMode="info" />
                </div>

                <div className="col-span-7 flex flex-col gap-5 min-h-0">
                    <SavedEduhub />

                    <Image
                        src="/images/ad-2.png"
                        alt="ad-profile"
                        width={1200}
                        height={300}
                        className="w-full h-auto"
                    />

                    <div className="grid grid-cols-7 gap-5 flex-1 min-h-0">
                        <div className="col-span-3 min-h-0">
                            <HistorySection />
                        </div>

                        <div className="col-span-4 min-h-0 bg-white rounded-2xl p-4">
                            <DoctorScheduleSection doctors={dummyDoctors.slice(0, 3)} />
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