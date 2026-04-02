"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { registerService, registerWithGoogleService } from "@/services/auth"

export default function SignUp() {
    const router = useRouter()

    const [nama, setNama] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        if (password !== confirmPassword) {
            setError("Password dan confirm password harus sama")
            return
        }

        try {
            setLoading(true)

            const data = await registerService({
                nama: nama.trim(),
                username: username.trim(),
                email: email.trim(),
                password,
                confirm_password: confirmPassword,
            })

            setSuccess(data.message || "Registrasi berhasil")
            router.push("/signin")
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Terjadi kesalahan")
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
        <main className="flex items-center justify-center min-h-screen py-[50px] px-[40px]">
            <div className="w-full max-w-[1440px] rounded-3xl bg-primary bg-cover bg-center">
                <section className="relative z-10 flex justify-between items-center p-[19px]">
                    <Image
                        src="/images/signin-pic.webp"
                        alt="gambar sign-in"
                        width={650}
                        height={886}
                        loading="eager"
                    />

                    <form
                        onSubmit={handleRegister}
                        className="flex flex-col items-center justify-center w-[650px] gap-8 text-xl"
                    >
                        <h1 className="text-white text-5xl font-bold">Sign Up</h1>

                        <div>
                            <div className="rounded-[20px] bg-white w-[571px] h-[80px] mb-4 flex items-center p-4">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full bg-transparent border-none outline-none"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                />
                            </div>

                            <div className="rounded-[20px] bg-white w-[571px] h-[80px] mb-4 flex items-center p-4">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full bg-transparent border-none outline-none"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="rounded-[20px] bg-white w-[571px] h-[80px] mb-4 flex items-center p-4">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full bg-transparent border-none outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="rounded-[20px] bg-white w-[571px] h-[80px] mb-4 flex items-center p-4">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="flex justify-center items-center w-full bg-transparent border-none outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="rounded-[20px] bg-white w-[571px] h-[80px] flex items-center p-4">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full bg-transparent border-none outline-none"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            {error && <p className="text-sm text-red-300 mt-3">{error}</p>}
                            {success && <p className="text-sm text-green-300 mt-3">{success}</p>}
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#1F3A58] rounded-[40px] text-white text-center w-[570px] h-[78px] font-bold hover:bg-[#0C7D8F] active:bg-[#486C93] active:scale-95 active:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Loading..." : "Create Account"}
                            </button>

                            <button
                                type="button"
                                onClick={handleGoogleRegister}
                                disabled={loading}
                                className="bg-white rounded-[40px] text-white text-center w-[570px] h-[78px] flex justify-center items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Image
                                    src="/images/google-icon.webp"
                                    alt="google-icon"
                                    width={30}
                                    height={30}
                                />
                                <p className="text-[#B8B8B8]">Sign In With Google</p>
                            </button>

                            <div className="w-[571px] flex justify-center mb-8 text-white gap-2">
                                <p>Already Have An Account?</p>
                                <Link href="/signin" className="text-right font-bold hover:underline">
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