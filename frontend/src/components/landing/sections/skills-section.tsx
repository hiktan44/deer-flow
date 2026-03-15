"use client";

import { cn } from "@/lib/utils";

import ProgressiveSkillsAnimation from "../progressive-skills-animation";
import { Section } from "../section";

export function SkillsSection({ className }: { className?: string }) {
  return (
    <Section
      className={cn("h-[calc(100vh-64px)] w-full bg-white/2", className)}
      title="Ajan Yetenekleri"
      subtitle={
        <div>
          Ajan yetenekleri kademeli olarak yüklenir — yalnızca ihtiyaç
          duyulduğunda, ihtiyaç duyulduğu kadar.
          <br />
          DeerFlow&apos;u kendi yetenek dosyalarınızla genişletin veya yerleşik
          kütüphanemizi kullanın.
        </div>
      }
    >
      <div className="relative overflow-hidden">
        <ProgressiveSkillsAnimation />
      </div>
    </Section>
  );
}
