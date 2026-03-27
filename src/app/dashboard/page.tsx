'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import IntakesCard from "@/components/IntakesCard"
import EduhubModal from "@/components/EduhubModal"
import Calendar from "@/components/Calendar"
import { dummyIntakes } from "@/data/Intake"
import { dummyChildren } from "@/data/Children"
import { dummyEduhub, EduHub } from "@/data/Eduhub"
import { ActionButton } from "@/components/Button/Action"
import { LinkButton } from "@/components/Button/Link"

export default function Dashboard() {
    const router = useRouter()

    useEffect(() => {
        const user = localStorage.getItem("user")
        if(!user) {
            router.push("/signin")
        }
    }, [router])

    const data = dummyIntakes
    const children = dummyChildren[0]
    const featuredArticle = dummyEduhub[0]

    const [selectedArticle, setSelectedArticle] = useState<EduHub | null>(null)
    const [isEduhubOpen, setIsEduhubOpen] = useState(false)

    function handleOpenEDuhub(article: EduHub) {
        setSelectedArticle(article)
        setIsEduhubOpen(true)
    }

    function handleCloseEduhub() {
        setSelectedArticle(null)
        setIsEduhubOpen(false)
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
                            <p className="text-4xl font-bold tracking-widest text-[#00ff44] min-w-[158px]">{children.bmi}</p>
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

                <section className="w-full">
                    <div className="mb-4 flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">Baca EduHub</h2>
                        <LinkButton href="/dashboard/eduhub" variant="primary" rounded="xsm" className="w-[170px] max-h-[40px]">Lihat Semua</LinkButton>
                    </div>

                    <div className="flex w-full gap-5 rounded-3xl bg-white p-4 shadow-md">
                        <div className="max-w-[309px] shrink-0">
                            <Image 
                                src={featuredArticle.picture} alt={featuredArticle.title}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="h-full w-full rounded-2xl object-cover"
                            />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                            <div>
                                <h3 className="mb-4 text-2xl font-bold leading-snug text-[#243B63]">
                                    {featuredArticle.title}
                                </h3>
                                <p className="max-w-[750px] text-[18px] leading-8 text-[#3E4C63]">
                                    {featuredArticle.summary}
                                </p>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <ActionButton variant="primary" rounded="xsm" onClick={() => handleOpenEDuhub(featuredArticle)}>
                                    Baca Selengkapnya
                                </ActionButton>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="flex flex-col gap-4 h-full">
                <section className="flex min-h-[545px] items-center justify-center rounded-3xl bg-white shadow-xl">
                    <div className="flex flex-col items-center gap-2 px-6 py-8 text-center">
                        <Image
                        src={children.photo} alt="photo"
                        width={209}
                        height={283}
                        className="rounded-xl mb-4"
                        />
                        <p className="font-bold text-3xl">{children.name}</p>
                        <p className="text-2xl">{children.gender}</p>
                        <p className="text-2xl">{children.age} Tahun</p>
                        <ActionButton variant="primary" rounded="xsm" className="font-semibold tracking-widest">Ganti Profil</ActionButton>
                    </div>
                </section>
                
                <div className="flex-1 min-h-0">
                    <Calendar />
                </div>
            </div>
        </div>

        <EduhubModal 
            article={selectedArticle}
            isOpen={isEduhubOpen}
            onClose={handleCloseEduhub}
        />
        </>
    )
}