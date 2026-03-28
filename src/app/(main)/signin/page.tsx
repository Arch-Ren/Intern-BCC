'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { ActionButton } from "@/components/ui/Button/Action"
import { User } from "@/data/User"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignIn() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleLogin =(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (email === User.email && password == User.password) {
            localStorage.setItem("user", JSON.stringify({
                name: User.name,
                photo: User.photo,
                email: User.email,
            }))
            router.push("/dashboard")
        } else if (email === User.email && password != User.password){
            alert("Password salah")
        } else {
            alert("Silahkan isi Email dan password anda")
        }
    }

    return(
            <main className="p-12 w-full flex justify-center">
            
                <div className="w-full max-w-[1440px] rounded-3xl bg-primary bg-cover bg-center">
                    <section className="relative z-10 flex justify-between items-center p-[19px]">
                        <Image
                        src="/images/signin-pic.webp" alt="gambar sign-in"
                        width={612}
                        height={762}
                        className="w-1/2 h-auto"
                        />
                
                        <form className="flex flex-col items-center justify-center w-full gap-4 text-xl" onSubmit={handleLogin}>
                            <h1 className="text-white text-5xl font-bold mb-12">Sign In</h1>
                            <div className="flex flex-col gap-4 ">
                                <Input placeholder="Email" type="email" onChange={(e) =>setEmail(e.target.value)} />

                                <Input placeholder="Password" type="password" onChange={(e) =>setPassword(e.target.value)} />

                                <div className="w-[571px] flex justify-end mb-8">
                                    <Button variant="link" className="text-white text-right font-semibold text-xl" type="button">Forgot Password?</Button>
                                </div>
                            </div>

                            <ActionButton variant="secondary" rounded="lg" className="text-2xl min-w-[570px] min-h-[78px]" type="submit">Sign In</ActionButton>
                            <button className="bg-white rounded-[40px] text-white text-center w-[570px] h-[78px] flex justify-center items-center gap-4 active:scale-95 active:brightness-75" type="button">
                                <Image 
                                src="/images/google-icon.webp" alt="google-icon"
                                width={35}
                                height={35}
                                />
                                <p className="text-black font-semibold">Sign In With Google</p>
                            </button>

                            <div className="w-[571px] flex justify-center mb-8 text-white gap-2">
                                <p>Don't Have An Account? </p>
                                <Link className="text-right font-bold hover:underline" href="/signup">Sign Up</Link>
                            </div>
                        </form>
                    </section>
                </div>

            </main>
    )
}