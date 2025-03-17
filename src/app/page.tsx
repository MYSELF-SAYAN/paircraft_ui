import Image from "next/image";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/HomeHero";
import { FeatureSection } from "@/components/FeatureSection";
export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <HomeHero/>
      <FeatureSection />
    </div>
  );
}
