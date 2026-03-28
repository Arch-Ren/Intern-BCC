import { dummyEduhub, EduHub } from "@/data/Eduhub"
import { ActionButton } from "@/components/ui/Button/Action"
import { LinkButton } from "@/components/ui/Button/Link"
import Image from "next/image"

type EduhubProps = {
    article: EduHub
    onReadMore: (article: EduHub) => void
}

export default function EduhubSection({ article, onReadMore, }: EduhubProps) {
    return (
        <section className="w-full">
                    <div className="mb-4 flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">Baca EduHub</h2>
                        <LinkButton href="/dashboard/eduhub" variant="primary" rounded="xsm" className="w-[170px] max-h-[40px]">Lihat Semua</LinkButton>
                    </div>

                    <div className="flex w-full gap-5 rounded-3xl bg-white p-4 shadow-md">
                        <div className="max-w-[309px] shrink-0">
                            <Image 
                                src={article.picture} alt={article.title}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="h-full w-full rounded-2xl object-cover"
                            />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                            <div>
                                <h3 className="mb-4 text-2xl font-bold leading-snug text-[#243B63]">
                                    {article.title}
                                </h3>
                                <p className="max-w-[750px] text-[18px] leading-8 text-[#3E4C63]">
                                    {article.summary}
                                </p>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <ActionButton variant="primary" rounded="xsm" onClick={() => onReadMore(article)}>
                                    Baca Selengkapnya
                                </ActionButton>
                            </div>
                        </div>
                    </div>
                </section>
    )
}