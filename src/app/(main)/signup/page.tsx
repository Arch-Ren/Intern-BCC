"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { registerService } from "./services/auth"
import { registerWithGoogleService } from "@/services/authGoogle"

export default function SignUp() {
    const router = useRouter()

    const [nama, setNama] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        if (!nama.trim() || !username.trim() || !email.trim() || !password || !confirmPassword) {
            setError("Semua field wajib diisi")
            return
        }

        if (password !== confirmPassword) {
            setError("Password dan confirm password harus sama")
            return
        }

        try {
            setLoading(true)

            await registerService({
                nama: nama.trim(),
                username: username.trim(),
                email: email.trim(),
                password,
                confirm_password: confirmPassword,
            })

            router.replace("/signin")
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Terjadi kesalahan saat register")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleRegister = () => {
        setError("")

        try {
            registerWithGoogleService()
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Google register gagal")
            }
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-10 py-[50px]">
            <div className="w-full max-w-[1440px] rounded-3xl bg-primary bg-cover bg-center">
                <section className="relative z-10 flex items-center justify-between p-[19px]">
                    <Image
                        src="/images/signin-pic.webp"
                        alt="gambar sign-up"
                        width={650}
                        height={886}
                        loading="eager"
                        priority
                    />

                    <form
                        onSubmit={handleRegister}
                        className="flex w-[650px] flex-col items-center justify-center gap-8 text-xl"
                    >
                        <h1 className="text-5xl font-bold text-white">Sign Up</h1>

                        <div>
                            <div className="mb-4 flex h-[80px] w-[571px] items-center rounded-[20px] bg-white p-4">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full border-none bg-transparent outline-none"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                />
                            </div>

                            <div className="mb-4 flex h-[80px] w-[571px] items-center rounded-[20px] bg-white p-4">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full border-none bg-transparent outline-none"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="mb-4 flex h-[80px] w-[571px] items-center rounded-[20px] bg-white p-4">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border-none bg-transparent outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-4 flex h-[80px] w-[571px] items-center rounded-[20px] bg-white p-4">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full border-none bg-transparent outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex h-[80px] w-[571px] items-center rounded-[20px] bg-white p-4">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full border-none bg-transparent outline-none"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="h-[78px] w-[570px] rounded-[40px] bg-[#1F3A58] text-center font-bold text-white hover:bg-[#0C7D8F] active:scale-95 active:bg-[#486C93] active:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? "Loading..." : "Create Account"}
                            </button>

                            <button
                                type="button"
                                onClick={handleGoogleRegister}
                                disabled={loading}
                                className="flex h-[78px] w-[570px] items-center justify-center gap-4 rounded-[40px] bg-white text-center disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Image
                                    src="/images/google-icon.webp"
                                    alt="google-icon"
                                    width={30}
                                    height={30}
                                />
                                <p className="text-[#B8B8B8]">Sign Up with Google</p>
                            </button>

                            <div className="mb-8 flex w-[571px] justify-center gap-2 text-white">
                                <p>Already have an account?</p>
                                <Link href="/signin" className="font-bold hover:underline">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}