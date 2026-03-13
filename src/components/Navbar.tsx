'use client'

import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-20">
            <img src="/images/Logo.png" className="w-[195px] h-[79px]"></img>
            <ul className="flex justify-center gap-20 text-white text-2xl items-center">
                <li><Link href="/" className="no-underline hover:underline">Home</Link></li>
                <li><Link href="/about" className="no-underline hover:underline">About</Link></li>
                <li><Link href="/contact" className="no-underline hover:underline">Contact</Link></li>
                <Link href="/login"
                className="
                border-none bg-[#1F3A58] w-[195px] h-[79px] rounded-4xl px-6 py-4 shadow-md flex justify-center items-center
                hover:bg-[#0C7D8F] 
                active:bg-[#486C93] active:scale-95 active:shadow-lg">Log In</Link>
            </ul>
        </nav>
    )
}