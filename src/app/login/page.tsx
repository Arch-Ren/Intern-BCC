'use client'

import Image from "next/image"
import Link from "next/link"

export default function Login() {
    return(
        <main className="flex items-center justify-center min-h-screen py-[50px] px-[40px]">
            <div className="relative w-[1360px] min-h-[924px]">
                <Image 
                src="/images/Rectangle1.png" alt="Background"
                fill
                className="object-cover rounded-3xl"
                priority />
            
            <section className="relative z-10 flex justify-between items-center p-[19px]">
                <Image
                src="/images/signin-pic.png" alt="gambar sign-in"
                width={650}
                height={886}
                />
                
                <div className="flex flex-col items-center justify-center w-[650px] gap-4">
                    <h1 className="text-white text-5xl font-bold mb-12">Sign In</h1>
                    <div>
                        <div className="rounded-[20px] bg-white w-[571px] h-[80px] mb-4 flex items-center p-4">
                            <input type="email" placeholder="Email"/>
                        </div>

                        <div className="rounded-[20px] bg-white w-[571px] h-[80px] mb-4 flex items-center p-4">
                            <input type="password" placeholder="Password" className="flex justify-center items-center"/>
                        </div>

                        <div className="w-[571px] flex justify-end mb-8">
                            <button className="text-white text-right font-semibold hover:underline">Forgot Password?</button>
                        </div>
                    </div>

                    <button className="bg-[#1F3A58] rounded-[40px] text-white text-center w-[570px] h-[78px] font-bold">Sign In</button>
                    <button className="bg-white rounded-[40px] text-white text-center w-[570px] h-[78px] flex justify-center items-center gap-4">
                        <Image 
                        src="/images/google-icon.png" alt="google-icon"
                        width={30}
                        height={30}
                        />
                        <p className="text-[#B8B8B8]">Sign In With Google</p>
                    </button>

                    <div className="w-[571px] flex justify-center mb-8 text-white gap-2">
                        <p>Don't Have An Account? </p>
                        <button className="text-right font-bold hover:underline"><Link href="/signup">Sign Up</Link></button>
                    </div>
                </div>
            </section>

            </div>
        </main>
    )
}