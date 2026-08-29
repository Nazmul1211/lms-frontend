import React from "react";
import Hero from "@/components/home/Hero";
import StatsBanner from "@/components/home/StatsBanner";
import FeaturesSection from "@/components/home/FeaturesSection";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <StatsBanner />
      <FeaturesSection />
      <CtaBanner />
    </div>
  );
}