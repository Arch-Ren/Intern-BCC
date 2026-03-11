'use client'

import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center">
            <img src="/images/Logo.png" className="w-[195px] h-[79px]"></img>
            <ul className="flex justify-center gap-8">
                <li><Link href="/" className="no-underline hover:underline">Home</Link></li>
                <li><Link href="/about" className="no-underline hover:underline">About</Link></li>
                <li><Link href="/contact" className="no-underline hover:underline">Contact</Link></li>
                <button><Link href="/" className="no-underline hover:underline">Login</Link></button>
            </ul>
        </nav>
    )
}