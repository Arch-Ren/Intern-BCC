import HomeSidebar from "@/components/Navbar/homeSidebar";
import HomeNavbar from "@/components/Navbar/homeNavbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F1FFFB]">
        <div className="flex py-4 px-8">
            <HomeSidebar />
            <div className="flex flex-col min-w-0 flex-1 pl-6">
                <HomeNavbar/>
                <div className="min-w-0 pt-4">
                    { children }
                </div>
            </div>
        </div>
    </div>
  );
}