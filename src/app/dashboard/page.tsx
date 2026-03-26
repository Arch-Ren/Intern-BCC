'use client'

import { use, useEffect } from "react"
import { useRouter } from "next/navigation"
import IntakesCard from "@/components/IntakesCard"
import { dummyIntakes } from "@/data/Intake"
import { dummyChildren } from "@/data/Children"
import { ActionButton } from "@/components/Button/Action"
import Image from "next/image"
import { LinkButton } from "@/components/Button/Link"

export default function Dashboard() {

    const router = useRouter()

    useEffect(() => {
        const user = localStorage.getItem("user")
        if(!user) {
            router.push("/signin")
        }
    }, [])

        const data = dummyIntakes
        const children = dummyChildren

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col items-center gap-1.5">
                <div className="flex gap-4">
                    {data.map((item) => (
                        <IntakesCard key={item.label} {...item} />
                    ))}
                </div>
                <div className="min-w-full h-[142px] bg-[url('/images/Rectangle1.webp')] my-4 rounded-3xl py-4 px-8">
                    <div className="flex justify-between">
                        <h2 className="text-4xl text-white font-bold tracking-wider">Status BMI</h2>
                        <div className="flex flex-col gap-3">
                            {children.map((child) => (
                                <p className="text-[#00FF44] text-shadow-lg font-bold text-4xl tracking-widest">{child.bmi}</p>
                            ))}
                            <ActionButton className="py-2" variant="secondary" rounded="xsm" onClick={() => console.log("edit data")}>Ubah Data</ActionButton>
                        </div>
                    </div>
                </div>
                <a className="w-full" href="">
                    <div className="self-start flex gap-4 pb-4">
                        <h2 className="font-semibold text-2xl">Beli Sekarang</h2>
                        <Image
                        src="/images/arrow-right.png" alt="arrow"
                        width={30}
                        height={30} 
                        className="self-start"
                        />
                    </div>
                    <Image
                    src="/images/ad.png" alt="ad"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                        width: '100%', height: 'auto',
                    }} />
                </a>
                <div>
                    <div className="flex justify-between">
                        <h2>Baca Eduhub</h2>
                        <LinkButton href="/dashboard/eduhub" variant="primary" rounded="xsm">Lihat Semua</LinkButton>
                    </div>
                </div>
            </div>
            <div>
                <div className="bg-white min-h-[545px] w-auto rounded-3xl shadow-xl flex justify-center items-center">
                    {children.map((child) => (
                        <div className="flex flex-col items-center gap-2">
                            <Image
                            src={child.photo} alt="photo"
                            width={209}
                            height={283}
                            className="rounded-xl mb-4"
                            />
                            <p className="font-bold text-3xl">{child.name}</p>
                            <p className="text-2xl">{child.gender}</p>
                            <p className="text-2xl">{child.age} Tahun</p>
                            <ActionButton variant="primary" rounded="xsm" className="font-semibold tracking-widest">Ganti Profil</ActionButton>
                        </div>
                    ))}
                </div>
                <div>
                    Calendar
                </div>
            </div>
        </div>
    )
}