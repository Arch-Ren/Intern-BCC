'use client'

import { usePathname } from "next/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"

const pageNames : Record<string, string> = {
    "/dashboard" : "Dashboard",
    "/dashboard/tracker" : "G - Growth Tracker",
    "/dashboard/eduhub" : "G - EduHub",
    "/dashboard/connect" : "G - Connect",
}

export default function HomeNavbar() {
const pathname = usePathname()
const currentPage = pageNames[pathname] ?? "Halaman"

const [user, setUser] = useState({ name: "", photo: ""})

useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
        setUser(JSON.parse(stored))
    }
}, [])

    return(
        <nav className="flex justify-between py-4 items-center">
            <h1 className="text-4xl font-bold">{currentPage}</h1>
            <div className="flex justify-center gap-6">
                <Image 
                    src="/images/search.png" alt="search"
                    width={60}
                    height={60}
                />
                <Image 
                    src="/images/notification.png" alt="notification"
                    width={60}
                    height={60}
                />
                <div className="flex items-center gap-4">
                    <Image 
                    src={user.photo || "/images/default-avatar.png"} alt="foto profil"
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                    />
                    <div>
                        <p className="text-2xl">{user.name || "Pengguna"}</p>
                        <p>Parrent</p>
                    </div>
                </div>
            </div>
        </nav>
    )
}