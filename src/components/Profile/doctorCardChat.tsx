"use client"

import { CalendarDays, Clock3, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { Doctor } from "@/data/Doctor"

type DoctorCardVariant = "schedule" | "payment" | "history"

type DoctorCardProps = {
    doctor: Doctor
    variant?: DoctorCardVariant
    onChatClick?: () => void
    action?: React.ReactNode
    className?: string
    imageClassName?: string
    contentClassName?: string
    scheduleClassName?: string
    hideSchedule?: boolean
    hideChatButton?: boolean
}

const variantStyles: Record<
    DoctorCardVariant,
    {
        root: string
        imageWrapper: string
        image: string
        title: string
        specialist: string
        scheduleBox: string
        chatButton: string
        wrapperGap: string
        contentGap: string
    }
> = {
    schedule: {
        root: "rounded-[18px] bg-gradient-to-r from-[#39b79f] via-[#2f9d88] to-[#176c57] p-3 text-white",
        imageWrapper: "h-[94px] w-[94px] shrink-0 overflow-hidden rounded-[6px] bg-white",
        image: "h-full w-full object-cover object-[center_20%]",
        title: "truncate text-[18px] font-bold leading-tight md:text-[20px]",
        specialist: "mt-1 truncate text-[14px] text-white/95 md:text-[15px]",
        scheduleBox: "mt-3 flex h-[40px] items-center justify-between gap-4 rounded-[12px] bg-[#edf3f1] px-3 py-2 text-[#a7adaa]",
        chatButton: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf3f1] text-[#a7adaa] transition hover:scale-[1.05]",
        wrapperGap: "flex items-center gap-3",
        contentGap: "min-w-0 flex-1",
    },
    payment: {
        root: "rounded-[18px] bg-white p-3 text-slate-800 shadow-sm",
        imageWrapper: "h-[74px] w-[74px] shrink-0 overflow-hidden rounded-[8px] bg-slate-100",
        image: "h-full w-full object-cover object-[center_20%]",
        title: "truncate text-[18px] font-semibold leading-tight",
        specialist: "mt-1 truncate text-[13px] text-slate-500",
        scheduleBox: "mt-3 flex h-[35px] items-center justify-between gap-4 rounded-[10px] bg-[#4cc0a7] px-3 py-2 text-white",
        chatButton: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition hover:scale-[1.05]",
        wrapperGap: "flex items-center gap-3",
        contentGap: "min-w-0 flex-1",
    },
    history: {
        root: "rounded-[18px] bg-gradient-to-r from-[#39b79f] via-[#2a967f] to-[#166a56] p-3 text-white shadow-sm",
        imageWrapper: "h-[94px] w-[94px] shrink-0 overflow-hidden rounded-[6px] bg-white",
        image: "h-full w-full object-cover object-[center_20%]",
        title: "truncate text-[16px] font-bold leading-tight md:text-[18px]",
        specialist: "mt-1 truncate text-[11px] text-white/95 md:text-[12px]",
        scheduleBox: "mt-3 flex h-[40px] w-full items-center justify-between gap-4 rounded-[12px] bg-[#edf3f1] px-3 py-2 text-[#b0b4b1]",
        chatButton: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/95 text-[#a7adaa] transition hover:scale-[1.05]",
        wrapperGap: "flex items-center gap-4",
        contentGap: "min-w-0 flex-1",
    },
}

export default function DoctorCard({
    doctor,
    variant = "schedule",
    onChatClick,
    action,
    className,
    imageClassName,
    contentClassName,
    scheduleClassName,
    hideSchedule = false,
    hideChatButton = false,
}: DoctorCardProps) {
    const router = useRouter()
    const styles = variantStyles[variant]

    const handleChatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (onChatClick) {
            onChatClick()
            return
        }

        const params = new URLSearchParams({
            doctorId: String(doctor.id),
            doctorName: doctor.name,
            specialist: doctor.specialist,
            image: doctor.image,
        })

        router.push(`/DoctorChat?${params.toString()}`)
    }

    return (
        <div className={clsx(styles.root, className)}>
            <div className={styles.wrapperGap}>
                <div className={clsx(styles.imageWrapper, imageClassName)}>
                    <img
                        src={doctor.image}
                        alt={doctor.name}
                        className={styles.image}
                    />
                </div>

                <div className={clsx(styles.contentGap, contentClassName)}>
                    <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                            <h3 className={styles.title}>{doctor.name}</h3>
                            <p className={styles.specialist}>{doctor.specialist}</p>
                        </div>

                        {action ? (
                            action
                        ) : !hideChatButton ? (
                            <button
                                type="button"
                                onClick={handleChatClick}
                                className={styles.chatButton}
                                aria-label={`Chat ${doctor.name}`}
                            >
                                <MessageCircle className="h-4 w-4" />
                            </button>
                        ) : null}
                    </div>

                    {!hideSchedule && (
                        <div className={clsx(styles.scheduleBox, scheduleClassName)}>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4" />
                                <span className="text-[14px] font-semibold">
                                    {doctor.schedule?.dateLabel}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock3 className="h-4 w-4" />
                                <span className="text-[14px] font-semibold">
                                    {doctor.schedule?.timeLabel}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}