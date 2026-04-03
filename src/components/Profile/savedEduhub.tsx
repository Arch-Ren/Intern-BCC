"use client"

import { useEffect, useState } from "react"
import { LinkButton } from "../ui/Button/Link"
import { fetchInformasi, type InformasiAPI } from "@/services/informasi"

export default function SavedEduhub() {
    const [articles, setArticles] = useState<InformasiAPI[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetchInformasi()
            .then((data) => setArticles(data))
            .catch((err) => console.error("Gagal load eduhub:", err))
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <div className="w-full bg-white rounded-[30px] max-h-[300px] overflow-y-auto p-6 space-y-3 shadow-2xl">
            <p className="font-semibold text-xl">Disimpan</p>

            {isLoading ? (
                <div className="text-center text-sm text-gray-400 py-4">Memuat artikel...</div>
            ) : articles.length === 0 ? (
                <div className="text-center text-sm text-gray-400 py-4">Belum ada artikel</div>
            ) : (
                articles.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between bg-primary rounded-xl px-4 py-3 min-h-[90px]"
                    >
                        <h3 className="text-white text-sm font-medium max-w-[70%]">{item.judul}</h3>
                        <LinkButton className="min-w-[150px] max-h-[40px]" href="/dashboard/eduhub" variant="secondary" rounded="xsm">Baca Lagi</LinkButton>
                    </div>
                ))
            )}
        </div>
    )
}