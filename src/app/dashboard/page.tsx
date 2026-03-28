'use client'

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import IntakesCard from "@/components/Card/IntakesCard"
import EduhubModal from "@/components/EduhubModal"
import EduhubSection from "@/components/Dashboard/Eduhub"
import CalendarSection from "@/components/Dashboard/Calendar"

import { useSelectedChild } from "@/context/SelectedChild"

import { dummyIntakes } from "@/data/Intake"
import { dummyChildren } from "@/data/Children"
import { dummyEduhub, EduHub } from "@/data/Eduhub"
import { LinkButton } from "@/components/ui/Button/Link"
import ProfileCard from "@/components/ProfileCard"
import ProfileSwitchModal from "@/components/SwitchChildModal"

export default function Dashboard() {
    const router = useRouter()

    const [selectedArticle, setSelectedArticle] = useState<EduHub | null>(null)
    const [isProfilModalOpen, setIsProfileModalOpen] = useState(false)

    const data = dummyIntakes
    const featuredArticle = dummyEduhub[0]
    const{ selectedChild, selectedChildIndex, setSelectedChildIndex } = useSelectedChild()

    useEffect(() => {
        const user = localStorage.getItem("user")
        if(!user) {
            router.push("/signin")
        }
    }, [router])

    function openEDuhub(article: EduHub) {
        setSelectedArticle(article)
    }
    function closeEduhub() {
        setSelectedArticle(null)
    }

    function openProfileModal() {
        setIsProfileModalOpen(true)
    }
    function closeProfileModal() {
        setIsProfileModalOpen(false)
    }

    function selectChild(index: number) {
        setSelectedChildIndex(index)
        closeProfileModal()
    }

    return (
        <>
        <div className="grid grid-cols-3 gap-4 items-stretch">
            <div className="col-span-2 flex flex-col items-center gap-4 h-full">

                <section className="grid w-full grid-cols-[1fr_1.6fr_1fr] gap-4">
                    {data.map((item) => (
                        <IntakesCard key={item.label} {...item} />
                    ))}
                </section>

                <section className="w-full min-h-[142px] bg-primary rounded-3xl bg-cover bg-center px-8 py-6">
                    <div className="flex justify-between">
                        <h2 className="text-4xl text-white font-bold tracking-wider">Status BMI</h2>
                        <div className="flex flex-col items-end gap-3">
                            <p className="text-4xl font-bold tracking-widest text-[#00ff44] min-w-[158px]">{selectedChild.bmi}</p>
                            <LinkButton href="/dashboard/tracker" className="py-2 max-h-[43px] min-w-[158px]" variant="secondary" rounded="xsm">Ubah Data</LinkButton>
                        </div>
                    </div>
                </section>

                <a className="w-full" href="">
                    <div className="flex gap-3 pb-4">
                        <h2 className="font-semibold text-2xl">Beli Sekarang</h2>
                        <Image
                        src="/images/arrow-right.png" alt="arrow"
                        width={30}
                        height={30} 
                        className="mt-1"
                        />
                    </div>
                    <Image
                    src="/images/ad.png" alt="ad"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto w-full rounded-3xl"
                    />
                </a>

                <EduhubSection
                    article={featuredArticle}
                    onReadMore={openEDuhub}
                />
            </div>

            <div className="flex flex-col gap-4 h-full">

                <ProfileCard 
                    child={selectedChild} 
                    onChangeProfile={openProfileModal} 
                />

                <div className="flex-1 min-h-0">
                    <CalendarSection />
                </div>
            </div>
        </div>

        <EduhubModal 
            article={selectedArticle}
            isOpen={!!selectedArticle}
            onClose={closeEduhub}
        />

        <ProfileSwitchModal 
            isOpen={isProfilModalOpen}
            selectedIndex={selectedChildIndex}
            onClose={closeProfileModal}
            onSelect={selectChild}
        />
        </>
    )
}