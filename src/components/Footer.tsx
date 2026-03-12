'use client'

import Image from "next/image"

export default function Footer() {
    return(
        <div className="overflow-x-hidden">
            <div className="relative w-[1456px] h-[432px]">
                <Image 
                src="/images/Rectangle1.png" alt="Background"
                fill
                className="object-cover"
                priority />
                <div className="relative z-10 py-21 flex">
                    <div>
                        <img src="/images/WhiteLogo.png"></img>
                        <p>Platform website untuk memantau pertumbuhan dan status gizi anak secara mandiri, akurat, dan efisien.</p>
                        <div>gambar sosmed</div>
                    </div>
                    <div>
                        <div>Quick Links</div>
                        <div>About</div>
                        <div>Testimonials</div>
                        <div>Our Team</div>
                        <div>Features</div>
                    </div>
                    <div>
                        <div>Our Services</div>
                        <div>Nutrition Consultation</div>
                        <div>Growth Tracking</div>
                        <div>Stunting Awareness</div>
                        <div>Article</div>
                    </div>
                    <div>
                        <div>Contact Us</div>
                        <div>
                        <div>gambar maps</div>
                            <div>Jl. Kesehatan No. 10, Malang, Indonesia</div>
                        </div>
                        <div>
                            <div>gambar email</div>
                            <div>support @geazy.id</div>
                        </div>
                        <div>
                            <div>gambar telepon</div>
                            <div>+62 812-3456-7890</div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}

