'use client'

import Image from "next/image"

interface benefitCardProps {
    gambar: string
    benefit: string
}

export default function BenefitCard({gambar, benefit} : benefitCardProps) {
    return (
        <div className="bg-white rounded-3xl justify-items-center content-center w-[417px] h-[402px] shadow-2xl">
            <img src={gambar} alt={benefit} className="scale-80"></img>
            <h3 className="w-[357px] h-[110px] text-[34px] text-center">{benefit}</h3>
        </div>
    )
}