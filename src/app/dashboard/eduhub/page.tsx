'use client'

import { useState, useEffect } from "react"
import EduhubCard from "@/components/Card/EduhubCard"
import EduhubModal from "@/components/EduhubModal"
import { dummyEduhub, EduHub } from "@/data/Eduhub"
import { fetchInformasi, type InformasiAPI } from "@/services/informasi"
import { EduhubFilter } from "@/data/EduHubFilter"

export default function Eduhub() {
    const [selectedItem, setSelectedItem] = useState<EduHub | null>(null)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [articles, setArticles] = useState<EduHub[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let isMounted = true;
        fetchInformasi()
            .then((data) => {
                if (isMounted) {
                    const mappedData: EduHub[] = data.map((item, index) => ({
                        id: Number(item.id) || index, // try to handle if ID is string
                        title: item.judul,
                        picture: `/images/eduhub${(index % 6) + 1}.jpg`,
                        summary: item.ringkasan,
                        content: item.ringkasan,
                    }));
                    setArticles(mappedData)
                }
            })
            .catch((err) => {
                console.error("Gagal load informasi:", err)
            })
            .finally(() => {
                if (isMounted) setIsLoading(false)
            });

        return () => { isMounted = false; }
    }, [])

    function handleReadMore(item: EduHub) {
        setSelectedItem(item)
        setIsPopupOpen(true)
    }

    function handleClosePopup() {
        setSelectedItem(null)
        setIsPopupOpen(false)
    }

    return (
        <>
            <div className="w-full overflow-x-hidden">
                <div className="bg-primary p-6 rounded-3xl w-full">
                    <div className="flex items-center gap-4 px-4 pb-8">
                        <h3 className="text-white text-3xl leading-none whitespace-nowrap">Filter : </h3>
                        <div className="flex gap-4 overflow-x-auto whitespace-nowrap min-w-0 flex-1">
                            {EduhubFilter.map((item) => (
                                <div key={item.id} className="bg-white px-4 h-[40px] flex items-center justify-center rounded-[36px] text-primary shrink-0">
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {isLoading ? (
                            <p className="col-span-3 text-center text-white">Memuat artikel...</p>
                        ) : articles.length === 0 ? (
                            <p className="col-span-3 text-center text-white">Belum ada artikel eduhub.</p>
                        ) : (
                            articles.map((item, index) => (
                                <EduhubCard key={item.id || index} item={item} onReadMore={handleReadMore} />
                            ))
                        )}
                    </div>
                </div>

                <EduhubModal article={selectedItem} isOpen={isPopupOpen} onClose={handleClosePopup} />
            </div>
        </>
    )
}