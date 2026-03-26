import Image from "next/image"

export default function Footer() {
    return(
        <div>
            <div className="relative h-[450px]">
                <Image 
                src="/images/Rectangle1.webp" alt="Background"
                fill
                className="object-cover"
                priority />
                <div className="relative z-10 text-white text-base ml-20 mr-16">
                    <div className="py-12 flex justify-between items-center gap-16">
                        <div>
                            <img src="/images/WhiteLogo.webp" className="mb-8"></img>
                            <p className="w-[307px] pb-8">Platform website untuk memantau pertumbuhan dan status gizi anak secara mandiri, akurat, dan efisien.</p>
                            <div className="flex gap-4">
                                <img src="images/facebook.webp" alt="facebook"/>
                                <img src="images/twitter.webp" alt="twitter"/>
                                <img src="images/instagram.webp" alt="instagram"/>
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold m-2">Quick Links</div>
                            <p className="m-2">About</p>
                            <p className="m-2">Testimonials</p>
                            <p className="m-2">Our Team</p>
                            <p className="m-2">Features</p>
                        </div>
                        <div>
                            <div className="text-2xl font-bold m-2">Our Services</div>
                            <p className="m-2">Nutrition Consultation</p>
                            <p className="m-2">Growth Tracking</p>
                            <p className="m-2">Stunting Awareness</p>
                            <p className="m-2">Article</p>
                        </div>
                        <div>
                            <div className="text-2xl font-bold m-6">Contact Us</div>
                            <div className="flex m-2 gap-2 items-center">
                                <img src="/images/location-pic.webp" alt="location" className="h-fit"/>
                                    <h3 className="max-w-[220px] leading-snug">Jl. Kesehatan No. 10, Malang, Indonesia</h3>
                            </div>
                            <div className="flex m-2 gap-2 items-center">
                                <img src="/images/mail-pic.webp" alt="location"/>
                                <h3>support @geazy.id</h3>
                            </div>
                            <div className="flex m-2 gap-2 items-center">
                                <img src="/images/telephone-pic.webp" alt="telephone"/>
                                <h3>+62 812-3456-7890</h3>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p>© 2026  Geazy. All rights reserved.</p>
                        <div className="flex justify-between gap-16 px-16">
                            <p>Terms & Condition</p>
                            <p>Privacy Policy</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}