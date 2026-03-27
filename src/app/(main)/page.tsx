import Image from 'next/image'
import Link from 'next/link'
import BenefitCard from '@/components/BenefitCard'
import Footer from "@/components/Footer";
import MainNavbar from '@/components/Navbar/mainNavbar';

const benefits = [
  {
    gambar:"/images/mingcute_baby-fill.webp",
    benefit: "Deteksi Risiko Stunting Dini",
  }, 
  {
    gambar:"/images/ion_nutrition.webp",
    benefit: "Pemantauan Asupan Gizi Anak",
  }, 
  {
    gambar:"/images/solid_user-doctor.webp",
    benefit: "Konsultasi Dokter Spesialis Anak",
  }, 
]

const listFitur = [
  {
    id:1, fitur:"G-NutriLog"
  },
  {
    id:2, fitur:"G-Growth Tracker"
  },
  {
    id:3, fitur:"G-EduHub"
  },
  {
    id:4, fitur:"G-Connect"
  }
]

export default function Home() {
  return (
    <main className="relative">

      <div className="absolute top-0 left-0 w-full h-[1440px] -z-10">
                <Image 
                src="/images/Rectangle1.webp" alt="Background"
                fill
                className="object-cover"
                priority />
              </div>

      <div className="py-10">
        <MainNavbar />
      </div>

      <div className="z-10">
        <section className="w-full flex justify-center">
          <div className="relative max-w-[1440px] w-auto">
            <Image 
            src="/images/CardStartPage.webp" alt="cardBackground"
            width={1301}
            height={724}
            className=""
            />
            <div className="absolute inset-0 flex items-center px-[60px]">
              <div className="pr-24 w-[850px]">
                <h1 className="font-bold text-6xl text-[var(--greenLightPrimary)] pb-12 leading-snug">Geazy - Pantau Gizi Jadi Easy</h1>
                <p className="text-[24px] pb-12 text-black">Platform website untuk membantu orang tua memantau pertumbuhan dan status gizi anak secara mandiri, akurat, dan efisien</p>
                <Link href="/login"
                className="
                border-none flex w-[330px] h-[61px] rounded-xl bg-[#1F3A58] px-10 py-2 text-white justify-center items-center text-xl hover:bg-[#0C7D8F] active:bg-[#486C93] active:scale-95 active:shadow-lg">Coba Sekarang</Link>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h1 className="mt-48 mb-8 text-white font-bold text-7xl text-shadow-lg text-center">Benefit</h1>
          <div className="flex gap-8 justify-center">
            {benefits.map((benefit) => (
              <BenefitCard 
                key={benefit.benefit}
                gambar={benefit.gambar}
                benefit={benefit.benefit}
                />
            ))}
          </div>
        </section>
          
        <section>
          <h1 className="mt-24 mb-2 font-bold text-7xl text-[#43BA9C] text-shadow-lg text-center">Fitur Kami</h1>
          <div className="relative w-full min-h-[200px] overflow-hidden mb-24">
            <div className="absolute inset-0 flex flex-row gap-4 justify-center items-center">
              {listFitur.map((fitur) => (
                <div key={fitur.id} className="relative bg-primary border-none rounded-2xl p-6 w-[307px] h-[150px] flex overflow-hidden items-center justify-center shadow-lg">
                  <h2 className="relative z-10 font-semibold text-3xl text-center text-[var(--background)]">{fitur.fitur}</h2>
                </div>
                ))}
            </div>
          </div>
        </section>
            
        <div className="flex justify-center w-full mb-12">
          <section className="flex justify-between items-center w-full max-w-[1440px]">
            <img src="/images/Rectangle19.webp" alt="Gambar Anak" className="w-[632px] h-[578px] rounded-2xl"></img>
            <div className="w-[632px] h-[261px]">
              <h2 className="font-bold text-6xl text-[var(--greenLightPrimary)] py-8">Tentang Kami</h2>
              <p className="text-2xl">Geazy adalah platform monitoring gizi digital berbasis website yang dirancang untuk membantu orang tua melakukan pemantauan pertumbuhan anak secara mandiri, akurat, dan efisien.</p>
            </div>
          </section>
        </div>
            
        <footer>
          <Footer />
        </footer>
      </div>
    </main>
  )
}