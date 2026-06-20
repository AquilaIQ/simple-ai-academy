import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import CoreValuesSection from "@/components/sections/CoreValuesSection";
import CurriculumFormSection from "@/components/sections/CurriculumFormSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" role="main">
        <HeroSection />
        <CoreValuesSection />
        <CurriculumFormSection />
      </main>
      <FooterSection />
    </>
  );
}
