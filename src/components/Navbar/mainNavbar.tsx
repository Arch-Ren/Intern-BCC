import Link from 'next/link'
import { LinkButton } from '../Button/Link'

export default function mainNavbar() {
    return (
        <nav className="flex justify-between items-center px-20">
            <img src="/images/Logo.webp" className="w-[195px] h-[79px]"></img>
            <ul className="flex justify-center gap-20 text-white text-2xl items-center">
                <li><Link href="/" className="no-underline hover:underline">Home</Link></li>
                <li><Link href="/about" className="no-underline hover:underline">About</Link></li>
                <li><Link href="/contact" className="no-underline hover:underline">Contact</Link></li>
                <LinkButton href="/signin" variant="secondary" rounded="md" className="min-w-[195px] min-h-[79px] px-6">SignIn</LinkButton>
            </ul>
        </nav>
    )
}