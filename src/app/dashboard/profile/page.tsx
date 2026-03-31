"use client"

import { useState } from "react"
import EditParentProfileModal from "@/components/EditParentProfileModal"
import ProfileCard from "@/components/ProfileCard"
import ChildProfileSection from "@/components/Profile/ChildProfileSection"
import SavedEduhub from "@/components/Profile/savedEduhub"
import HistorySection from "@/components/Profile/history/HistorySection"
import DoctorScheduleSection from "@/components/Profile/doctorSection"
import { dummyDoctors } from "@/data/Doctor"
import { dummyParent } from "@/data/Parent"
import { dummyChildren } from "@/data/Children"
import { calculateAge } from "@/utils/date"

export default function ProfilePage() {
    const [openEditParent, setOpenEditParent] = useState(false)

    const selectedChild = dummyChildren[0]

    return (
        <>
            <div className="grid grid-cols-11 gap-5 items-stretch min-h-screen">
                <div className="col-span-4 flex flex-col gap-5 min-h-0">
                    <ProfileCard
                        type="parent"
                        name={dummyParent.name}
                        image={dummyParent.photo}
                        role={dummyParent.label}
                        onChangeProfile={() => setOpenEditParent(true)}
                    />

                    <ChildProfileSection editMode="info" />
                </div>

                <div className="col-span-7 flex flex-col gap-5 min-h-0">
                    <SavedEduhub />

                    <img src="/images/ad-2.png" alt="ad-profile" />

                    <div className="grid grid-cols-7 gap-5 flex-1 min-h-0">
                        <div className="col-span-3 min-h-0">
                            <HistorySection />
                        </div>

                        <div className="col-span-4 min-h-0">
                            <DoctorScheduleSection doctors={dummyDoctors.slice(0, 3)} />
                        </div>
                    </div>
                </div>
            </div>

            <EditParentProfileModal
                isOpen={openEditParent}
                parent={dummyParent}
                onClose={() => setOpenEditParent(false)}
            />
        </>
    )
}