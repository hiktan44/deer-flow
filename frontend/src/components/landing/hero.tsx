"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import Galaxy from "@/components/ui/galaxy";
import { WordRotate } from "@/components/ui/word-rotate";
import { cn } from "@/lib/utils";

export function Hero({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-full flex-col items-center justify-center",
        className,
      )}
    >
      <div className="absolute inset-0 z-0 bg-black/40">
        <Galaxy
          mouseRepulsion={false}
          starSpeed={0.2}
          density={0.6}
          glowIntensity={0.35}
          twinkleIntensity={0.3}
          speed={0.5}
        />
      </div>
      <FlickeringGrid
        className="absolute inset-0 z-0 translate-y-8 mask-[url(/images/deer.svg)] mask-size-[100vw] mask-center mask-no-repeat md:mask-size-[72vh]"
        squareSize={4}
        gridGap={4}
        color={"white"}
        maxOpacity={0.3}
        flickerChance={0.25}
      />
      <div className="container-md relative z-10 mx-auto flex h-screen flex-col items-center justify-center">
        <h1 className="flex items-center gap-2 text-4xl font-bold md:text-6xl">
          <WordRotate
            words={[
              "Derinlemesine Araştır",
              "Veri Topla",
              "Veri Analiz Et",
              "Web Sayfası Oluştur",
              "Kod Geliştir",
              "Sunum Oluştur",
              "Görsel Üret",
              "Podcast Oluştur",
              "Video Üret",
              "Şarkı Üret",
              "E-posta Düzenle",
              "Her Şeyi Yap",
              "Her Şeyi Öğren",
            ]}
          />{" "}
          <div>DeerFlow ile</div>
        </h1>
        <p
          className="mt-8 scale-105 text-center text-2xl text-shadow-sm"
          style={{ color: "rgb(184,184,192)" }}
        >
          Araştıran, kodlayan ve üreten açık kaynaklı bir Süper Ajan.
          <br />
          Sandbox, bellek, araçlar, yetenekler ve alt ajanlar sayesinde
          <br />
          dakikalar ile saatler arası süren görevleri üstlenir.
        </p>
        <Link href="/workspace">
          <Button className="size-lg mt-8 scale-108" size="lg">
            <span className="text-md">2.0 ile Başla</span>
            <ChevronRightIcon className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
