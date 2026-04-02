"use client"

import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { dummyNotification } from "@/data/Notification"
import { useAuthStore } from "@/stores/auth"

const pageNames: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/tracker": "G - Growth Tracker",
    "/dashboard/eduhub": "G - EduHub",
    "/dashboard/connect": "G - Connect",
    "/dashboard/profile": "Profile",
}

export default function HomeNavbar() {
    const pathname = usePathname()
    const router = useRouter()
    const currentPage = pageNames[pathname] ?? "Halaman"

    const notifications = dummyNotification

    const user = useAuthStore((state) => state.user)
    const token = useAuthStore((state) => state.token)
    const logout = useAuthStore((state) => state.logout)
    const fetchProfile = useAuthStore((state) => state.fetchProfile)

    const [openProfile, setOpenProfile] = useState(false)
    const [openNotif, setOpenNotif] = useState(false)

    const profileRef = useRef<HTMLDivElement | null>(null)
    const notifRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (token && !user) {
            fetchProfile()
        }
    }, [token, user, fetchProfile])

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node

            if (profileRef.current && !profileRef.current.contains(target)) {
                setOpenProfile(false)
            }

            if (notifRef.current && !notifRef.current.contains(target)) {
                setOpenNotif(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    function getNotificationTextColor(type: string) {
        if (type === "reminder") return "text-[#FFBB00]"
        if (type === "success") return "text-[secondary]"
        return "text-black"
    }

    function handleLogout() {
        logout()
        router.push("/signin")
    }

    return (
        <nav className="flex justify-between py-4 items-center">
            <h1 className="text-4xl font-bold">{currentPage}</h1>

            <div className="flex justify-center gap-6">
                <button type="button" className="cursor-pointer">
                    <Image
                        src="/images/search.png"
                        alt="search"
                        width={60}
                        height={60}
                    />
                </button>

                <div className="relative" ref={notifRef}>
                    <button
                        type="button"
                        onClick={() => {
                            setOpenNotif((prev) => !prev)
                            setOpenProfile(false)
                        }}
                        className="cursor-pointer"
                    >
                        <Image
                            src="/images/notification.png"
                            alt="notification"
                            width={60}
                            height={60}
                        />
                    </button>

                    {openNotif && (
                        <div className="absolute right-0 top-[70px] z-50 w-[430px] rounded-[20px] bg-[#ffffff] shadow-2xl">
                            <div className="flex items-center justify-between border-b border-black px-5 py-4">
                                <button
                                    type="button"
                                    onClick={() => setOpenNotif(false)}
                                    className="text-2xl text-primary"
                                >
                                    &#8249;
                                </button>

                                <h2 className="text-2xl font-semibold text-[#3b3b3b]">
                                    Notifikasi
                                </h2>

                                <button type="button" onClick={() => console.log("pengaturan")}>
                                    <Image
                                        src="/images/setting.png"
                                        alt="setting"
                                        width={32}
                                        height={32}
                                    />
                                </button>
                            </div>

                            <div className="max-h-[420px] space-y-4 overflow-y-auto px-5 py-4">
                                {notifications.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <Image
                                            src={item.icon}
                                            alt={item.type}
                                            width={22}
                                            height={22}
                                            className="mt-1 h-[22px] w-[22px]"
                                        />

                                        <div className="leading-snug">
                                            <p className={`text-[13px] ${getNotificationTextColor(item.type)}`}>
                                                <span>{item.message}</span>
                                            </p>
                                            <p className="mt-1 text-[11px] text-gray-400">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative" ref={profileRef}>
                    <button
                        type="button"
                        onClick={() => {
                            setOpenProfile((prev) => !prev)
                            setOpenNotif(false)
                        }}
                        className="flex cursor-pointer items-center gap-4"
                    >
                        <Image
                            src={user?.photo || "/images/default-avatar.png"}
                            alt="foto profil"
                            width={60}
                            height={60}
                            className="rounded-full object-cover"
                        />
                        <div className="text-left">
                            <p className="text-2xl">{user?.name || "Pengguna"}</p>
                            <p>{user?.email || "Parent"}</p>
                        </div>
                    </button>

                    {openProfile && (
                        <div className="absolute right-0 top-[72px] z-50 w-[260px] rounded-[20px] bg-white shadow-2xl">
                            <div className="flex items-center gap-3 border-b border-primary p-3 pb-3">
                                <Image
                                    src={user?.photo || "/images/default-avatar.png"}
                                    alt="foto profil"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-[18px] font-medium text-[#333]">
                                        {user?.name || "Pengguna"}
                                    </p>
                                    <p className="text-sm text-gray-500">{user?.email || "-"}</p>
                                </div>
                            </div>

                            <div className="p-3 text-[15px] text-black">
                                <button
                                    type="button"
                                    className="flex w-full items-center gap-2 py-2 text-left"
                                    onClick={() => {
                                        setOpenProfile(false)
                                        router.push("/dashboard/profile")
                                    }}
                                >
                                    <Image
                                        src="/images/setting.png"
                                        alt="setting"
                                        width={24}
                                        height={24}
                                    />
                                    <span>Pengaturan</span>
                                </button>

                                <button
                                    type="button"
                                    className="flex w-full items-center gap-2 py-2 text-left"
                                    onClick={handleLogout}
                                >
                                    <Image
                                        src="/images/logout.png"
                                        alt="logout"
                                        width={24}
                                        height={24}
                                    />
                                    <span>Keluar</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}