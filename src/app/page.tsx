import Image from 'next/image'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      <Image
        src="/images/Rectangle1.png" alt="homeBackground"
        fill 
        className="object-cover [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%, transparent_100%)]"
        priority
        />
        <div className="absolute inset-0 justify-center px-[80px] py-[70px]">
          
        </div>
    </div>
  )
}