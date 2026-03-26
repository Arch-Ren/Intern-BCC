'use client'

import { ActionButton } from "@/components/Button/Action"
import { User } from "@/data/User"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignIn() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleLogin =() => {
        if (email === User.email && password == User.password) {
            localStorage.setItem("user", JSON.stringify({
                name: User.name,
                photo: User.photo,
                email: User.email,
            }))
            router.push("/dashboard")
        } else {
            alert("Email atau password salah")
        }
    }

    return(
            <main className="p-12 w-full flex justify-center">
            
                <div className="w-full max-w-[1440px] rounded-3xl bg-[url('/images/Rectangle1.webp')] bg-cover bg-center">
                    <section className="relative z-10 flex justify-between">
                        <Image
                        src="/images/signin-pic.webp" alt="gambar sign-in"
                        width={612}
                        height={762}
                        className="w-1/2 h-auto"
                        />
                
                        <div className="flex flex-col items-center justify-center w-full gap-4 text-xl">
                            <h1 className="text-white text-5xl font-bold mb-12">Sign In</h1>
                            <div>
                                <div className="rounded-[20px] bg-white w-[571px] h-[80px] mb-4 flex items-center p-4">
                                    <input onChange={(e) =>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full bg-transparent border-none outline-none"/>
                                </div>

                                <div className="rounded-[20px] bg-white w-[571px] h-[80px] mb-4 flex items-center p-4">
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full bg-transparent border-none outline-none"/>
                                </div>

                                <div className="w-[571px] flex justify-end mb-8">
                                    <button className="text-white text-right font-semibold hover:underline">Forgot Password?</button>
                                </div>
                            </div>

                            <ActionButton variant="secondary" rounded="lg" className="text-2xl min-w-[570px] min-h-[78px]" onClick={handleLogin}>SignIn</ActionButton>
                            <button className="bg-white rounded-[40px] text-white text-center w-[570px] h-[78px] flex justify-center items-center gap-4">
                                <Image 
                                src="/images/google-icon.webp" alt="google-icon"
                                width={35}
                                height={35}
                                />
                                <p className="text-[#B8B8B8]">Sign In With Google</p>
                            </button>

                            <div className="w-[571px] flex justify-center mb-8 text-white gap-2">
                                <p>Don't Have An Account? </p>
                                <Link className="text-right font-bold hover:underline" href="/signup">Sign Up</Link>
                            </div>
                        </div>
                    </section>
                </div>

            </main>
    )
}