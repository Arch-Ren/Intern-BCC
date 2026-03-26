'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menu = [
    {
        iconName: "Dashboard",
        href: "/dashboard",
        iconActive: "/images/home-active.png",
        iconInactive: "/images/home.png",
    },
    {
        iconName: "Nutrigrowth",
        href: "/dashboard/tracker",
        iconActive: "/images/plus-active.png",
        iconInactive: "/images/plus.png",
    },
    {
        iconName: "G - EduHub",
        href: "/dashboard/eduhub",
        iconActive: "/images/book-active.png",
        iconInactive: "/images/book.png",
    },
    {
        iconName: "G - Connect",
        href: "/dashboard/connect",
        iconActive: "/images/doctor-active.png",
        iconInactive: "/images/doctor.png",
    },
]

export default function HomeNavbarSidebar() {
    const pathname = usePathname()

    return(
        <nav className="flex items-center max-h-max">
            <div className="bg-[url('/images/Rectangle1.webp')] bg-cover py-8 px-2 rounded-3xl flex flex-col items-center">
                <Image 
                src="/images/geazy-logo.png" alt="logo"
                width={60}
                height={60}
                className="pb-24"
                />

                {menu.map((item) => {
                    const isActive = pathname === item.href

                    return (
                        <Link key={item.href} href={item.href} className="flex items-center pb-8 flex-col gap-2">
                            <Image 
                                src={isActive ? item.iconActive : item.iconInactive} alt={item.iconName}
                                width={60}
                                height={60}
                            />
                            <span className={isActive ? "text-black" : "text-white"}>
                                {item.iconName}
                            </span>
                        </Link>
                    )
                })}

                <img src="/images/help-button.png" width={60} height={60} className="pt-24" />
            </div>
        </nav>
    )
}