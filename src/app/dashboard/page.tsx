"use client"

import { useEffect, useMemo, useState } from "react"
import { useRequireAuth } from "@/hooks/useRequireAuth"
import { useAuthStore } from "@/stores/auth"
import Image from "next/image"

import { LinkButton } from "@/components/ui/Button/Link"
import IntakesCard from "@/components/Card/IntakesCard"
import EduhubModal from "@/components/EduhubModal"
import EduhubSection from "@/components/Dashboard/Eduhub"
import CalendarSection from "@/components/Dashboard/Calendar"
import ProfileCard from "@/components/ProfileCard"
import ProfileSwitchModal from "@/components/ChildProfileSwitchModal"

import { useSelectedChild } from "@/context/SelectedChild"
import { useChildrenStore } from "@/stores/children"

import { dummyEduhub, EduHub } from "@/data/Eduhub"
import { dummyGrowthRecords } from "@/data/GrowthRecord"

import { getLatestGrowthRecord } from "@/utils/growth"
import { fetchNutrisiHarian, type NutrisiHarian } from "@/services/nutrisi"

export default function Dashboard() {
    useRequireAuth()

    const user = useAuthStore((state) => state.user)
    const isLoadingProfile = useAuthStore((state) => state.isLoadingProfile)

    const [selectedArticle, setSelectedArticle] = useState<EduHub | null>(null)
    const [isProfilModalOpen, setIsProfileModalOpen] = useState(false)
    const [nutrisi, setNutrisi] = useState<NutrisiHarian | null>(null)
    const [isLoadingNutrisi, setIsLoadingNutrisi] = useState(false)

    const featuredArticle = dummyEduhub[0]
    const { selectedChild, selectedChildIndex, setSelectedChildIndex } = useSelectedChild()

    const age = selectedChild?.umur

    const latestGrowthRecord = useMemo(
        () => selectedChild ? getLatestGrowthRecord(selectedChild.id, dummyGrowthRecords) : null,
        [selectedChild?.id]
    )

    const bmiLabel = selectedChild?.status

    // Fetch nutrisi harian when selected child changes
    useEffect(() => {
        if (!selectedChild?.id) {
            setNutrisi(null)
            return
        }

        let cancelled = false
        setIsLoadingNutrisi(true)

        fetchNutrisiHarian(selectedChild.id)
            .then((data) => {
                if (!cancelled) setNutrisi(data)
            })
            .catch((err) => {
                console.error("Gagal load nutrisi harian:", err)
                if (!cancelled) setNutrisi(null)
            })
            .finally(() => {
                if (!cancelled) setIsLoadingNutrisi(false)
            })

        return () => { cancelled = true }
    }, [selectedChild?.id])

    // Map API response to IntakesCard data
    const intakesData = useMemo(() => [
        { label: "Protein", percentage: nutrisi?.persen_protein ?? 0 },
        { label: "Kalori", percentage: nutrisi?.persen_kalori ?? 0 },
        { label: "Lemak", percentage: nutrisi?.persen_lemak ?? 0 },
    ], [nutrisi])

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

    if (isLoadingProfile && !user) {
        return <div className="p-6">Memuat dashboard...</div>
    }

    return (
        <>
            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                    Halo, {user?.name || "User"}
                </h1>
            </div>

            <div className="grid grid-cols-3 gap-4 items-stretch">
                <div className="col-span-2 flex flex-col items-center gap-4 h-full">
                    <section className="grid w-full grid-cols-[1fr_1.6fr_1fr] gap-4">
                        {intakesData.map((item) => (
                            <IntakesCard key={item.label} {...item} />
                        ))}
                    </section>

                    <section className="w-full min-h-[142px] bg-primary rounded-3xl bg-cover bg-center px-8 py-6">
                        <div className="flex justify-between">
                            <h2 className="text-4xl text-white font-bold tracking-wider">Status BMI</h2>
                            <div className="flex flex-col items-end gap-3">
                                <p className="text-4xl font-bold tracking-wider text-end text-[#00ff44] min-w-[158px]">
                                    {bmiLabel}
                                </p>
                                <LinkButton
                                    href="/dashboard/tracker"
                                    className="py-2 max-h-[43px] min-w-[158px]"
                                    variant="secondary"
                                    rounded="xsm"
                                >
                                    Ubah Data
                                </LinkButton>
                            </div>
                        </div>
                    </section>

                    <a className="w-full" href="">
                        <div className="flex gap-3 pb-4">
                            <h2 className="font-semibold text-2xl">Beli Sekarang</h2>
                            <Image
                                src="/images/arrow-right.png"
                                alt="arrow"
                                width={30}
                                height={30}
                                className="mt-1"
                            />
                        </div>
                        <Image
                            src="/images/ad.png"
                            alt="ad"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="h-auto w-full rounded-3xl"
                        />
                    </a>

                    <EduhubSection article={featuredArticle} onReadMore={openEDuhub} />
                </div>

                <div className="flex h-full flex-col gap-4">
                    <ProfileCard
                        isEmpty={!selectedChild}
                        name={selectedChild?.nama || "-"}
                        image={(selectedChild as any)?.photo || "/images/default-avatar.png"}
                        gender={selectedChild?.gender || "-"}
                        age={selectedChild ? age : "-"}
                        type="child"
                        onChangeProfile={openProfileModal}
                    />

                    <div className="min-h-0 max-h-[456px] flex-1">
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