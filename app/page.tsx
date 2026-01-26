import { CategoriesSection } from "@/components/home/CategoriesSection";
import { CTASection } from "@/components/home/CTASection";
import { HeroSection } from "@/components/home/HeroSection";
import { LiveMapSection } from "@/components/home/LiveMap";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyKindaGigz } from "@/components/home/WhyKindaGigz";
import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
        <Navbar />
        <HeroSection />
        <WhyKindaGigz />
        <CategoriesSection />
        <ServicesSection />
        <LiveMapSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}
