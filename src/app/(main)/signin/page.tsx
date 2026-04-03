"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { ActionButton } from "@/components/ui/Button/Action"
import { signinService } from "./services/auth"
import { signinWithGoogleService } from "@/services/authGoogle"
import { useAuthStore } from "@/stores/auth"
import { useChildrenStore } from "@/stores/children"

export default function SignIn() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const setAuth = useAuthStore((state) => state.setAuth)
    const clearChildren = useChildrenStore((state) => state.clearChildren)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        if (!email.trim() || !password) {
            setError("Email dan password wajib diisi")
            return
        }

        try {
            setLoading(true)

            const data = await signinService(email.trim(), password)

            clearChildren()

            setAuth({
                user: {
                    id: (data.user as any)?.id,
                    name: (data.user as any)?.name || (data.user as any)?.nama || "User",
                    email: data.user?.email || email.trim(),
                    photo: data.user?.photo,
                    gender: (data.user as any)?.gender,
                },
                token: data.token,
            })

            router.push("/dashboard")
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Terjadi kesalahan saat login")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        setError("")

        try {
            clearChildren()
            signinWithGoogleService()
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Google login gagal")
            }
        }
    }

    return (
        <main className="flex w-full justify-center p-12">
            <div className="w-full max-w-[1440px] rounded-3xl bg-primary bg-cover bg-center">
                <section className="relative z-10 flex items-center justify-between p-[19px]">
                    <Image
                        src="/images/signin-pic.webp"
                        alt="gambar sign-in"
                        width={612}
                        height={762}
                        className="h-auto w-1/2"
                        loading="eager"
                        priority
                    />

                    <form
                        className="flex w-full flex-col items-center justify-center gap-4 text-xl"
                        onSubmit={handleLogin}
                    >
                        <h1 className="mb-12 text-5xl font-bold text-white">Sign In</h1>

                        <div className="flex flex-col gap-4">
                            <Input
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && <p className="text-sm text-red-300">{error}</p>}

                            <div className="mb-8 flex w-[571px] justify-end">
                                <Link
                                    className="text-right text-xl font-semibold text-white hover:underline"
                                    href="/forgotPassword"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <ActionButton
                            variant="secondary"
                            rounded="lg"
                            className="min-h-[78px] min-w-[570px] text-2xl"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Sign In"}
                        </ActionButton>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="flex h-[78px] w-[570px] items-center justify-center gap-4 rounded-[40px] bg-white active:scale-95 active:brightness-75 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Image
                                src="/images/google-icon.webp"
                                alt="google-icon"
                                width={35}
                                height={35}
                            />
                            <p className="font-semibold text-black">Login dengan Google</p>
                        </button>

                        <div className="mb-8 flex w-[571px] justify-center gap-2 text-white">
                            <p>Don&apos;t Have An Account?</p>
                            <Link className="font-bold hover:underline" href="/signup">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}