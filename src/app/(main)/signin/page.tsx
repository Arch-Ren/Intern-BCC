"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ActionButton } from "@/components/ui/Button/Action"
import { loginService, loginWithGoogleService } from "@/services/auth"
import { useAuthStore } from "@/stores/auth"

export default function SignIn() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const setAuth = useAuthStore((state) => state.setAuth)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        try {
            setLoading(true)

            const data = await loginService(email.trim(), password)

            setAuth({
                user: {
                    name: data.user?.name || "User",
                    email: data.user?.email || email.trim(),
                    photo: data.user?.photo,
                },
                token: data.token,
            })

            router.push("/dashboard")
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

    const handleGoogleLogin = () => {
        setError("")

        try {
            loginWithGoogleService()
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Google login gagal")
            }
        }
    }

    return (
        <main className="p-12 w-full flex justify-center">
            <div className="w-full max-w-[1440px] rounded-3xl bg-primary bg-cover bg-center">
                <section className="relative z-10 flex justify-between items-center p-[19px]">
                    <Image
                        src="/images/signin-pic.webp"
                        alt="gambar sign-in"
                        width={612}
                        height={762}
                        className="w-1/2 h-auto"
                        loading="eager"
                    />

                    <form
                        className="flex flex-col items-center justify-center w-full gap-4 text-xl"
                        onSubmit={handleLogin}
                    >
                        <h1 className="text-white text-5xl font-bold mb-12">Sign In</h1>

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

                            <div className="w-[571px] flex justify-end mb-8">
                                <Button
                                    variant="link"
                                    className="text-white text-right font-semibold text-xl"
                                    type="button"
                                >
                                    Forgot Password?
                                </Button>
                            </div>
                        </div>

                        <ActionButton
                            variant="secondary"
                            rounded="lg"
                            className="text-2xl min-w-[570px] min-h-[78px]"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Sign In"}
                        </ActionButton>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="bg-white rounded-[40px] w-[570px] h-[78px] flex justify-center items-center gap-4 active:scale-95 active:brightness-75 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Image
                                src="/images/google-icon.webp"
                                alt="google-icon"
                                width={35}
                                height={35}
                            />
                            <p className="text-black font-semibold">Login dengan Google</p>
                        </button>

                        <div className="w-[571px] flex justify-center mb-8 text-white gap-2">
                            <p>Don&apos;t Have An Account?</p>
                            <Link className="text-right font-bold hover:underline" href="/signup">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}