'use client'

import Image from "next/image"
import Link from "next/link"

export default function SignUp() {
    return(
    <main className="flex items-center justify-center min-h-screen py-[50px] px-[40px]">
        <div className="relative w-[1360px] min-h-[924px]">
            <Image 
                src="/images/Rectangle1.webp" alt="Background"
                fill
                className="object-cover rounded-3xl"
                priority />
                
            <section className="relative z-10 flex justify-between items-center p-[19px]">
                <Image
                    src="/images/signin-pic.webp" alt="gambar sign-in"
                    width={650}
                    height={886}
                />
                    
                <div className="flex flex-col items-center justify-center w-[650px] gap-8 text-xl">
                    <h1 className="text-white text-5xl font-bold">Sign Up</h1>
                    <div>
                        <div className="rounded-[20px] bg-white w-[571px] h-[80px] mb-4 flex items-center p-4">
                            <input type="fullName" placeholder="Full Name" className="w-full bg-transparent border-non outline-none"/>
                        </div>

                        <div className="rounded-[20px] bg-white w-[571px] h-[80px] mb-4 flex items-center p-4">
                            <input type="username" placeholder="Username"className="w-full bg-transparent border-non outline-none"/>
                        </div>

                        <div className="rounded-[20px] bg-white w-[571px] h-[80px] mb-4 flex items-center p-4">
                            <input type="email" placeholder="Email" className="w-full bg-transparent border-non outline-none"/>
                        </div>

                        <div className="rounded-[20px] bg-white w-[571px] h-[80px] mb-4 flex items-center p-4">
                            <input type="password" placeholder="Password" className="flex justify-center items-center w-full bg-transparent border-non outline-none"/>
                        </div>

                        <div className="rounded-[20px] bg-white w-[571px] h-[80px] flex items-center p-4">
                            <input type="confirmPassword" placeholder="Confirm Password" className="w-full bg-transparent border-non outline-none"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <button className="
                        bg-[#1F3A58] rounded-[40px] text-white text-center w-[570px] h-[78px] font-bold
                        hover:bg-[#0C7D8F] 
                        active:bg-[#486C93] active:scale-95 active:shadow-lg">Create Account</button>
                        <button className="bg-white rounded-[40px] text-white text-center w-[570px] h-[78px] flex justify-center items-center gap-4">
                            <Image 
                            src="/images/google-icon.webp" alt="google-icon"
                            width={30}
                            height={30}
                            />
                            <p className="text-[#B8B8B8]">Sign In With Google</p>
                        </button>
                            <div className="w-[571px] flex justify-center mb-8 text-white gap-2">
                            <p>Already Have An Account?</p>
                        <button className="text-right font-bold hover:underline"><Link href="/login">Sign In</Link></button>
                    </div>
                    </div>
                </div>
            </section>
    
        </div>
    </main>
    )
}