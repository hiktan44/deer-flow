"use client";

import MagicBento, { type BentoCardProps } from "@/components/ui/magic-bento";
import { cn } from "@/lib/utils";

import { Section } from "../section";

const COLOR = "#0a0a0a";
const features: BentoCardProps[] = [
  {
    color: COLOR,
    label: "Bağlam Mühendisliği",
    title: "Uzun/Kısa Süreli Bellek",
    description: "Artık ajan sizi daha iyi anlayabilir",
  },
  {
    color: COLOR,
    label: "Uzun Süreli Görev Çalıştırma",
    title: "Planlama ve Alt Görevler",
    description:
      "Önceden plan yapar, karmaşıklık üzerinde düşünür, ardından sıralı veya paralel çalıştırır",
  },
  {
    color: COLOR,
    label: "Genişletilebilir",
    title: "Yetenekler ve Araçlar",
    description:
      "Tak, çalıştır veya yerleşik araçları değiştir. İstediğiniz ajanı oluşturun.",
  },

  {
    color: COLOR,
    label: "Kalıcı",
    title: "Dosya Sistemli Sandbox",
    description: "Oku, yaz, çalıştır — gerçek bir bilgisayar gibi",
  },
  {
    color: COLOR,
    label: "Esnek",
    title: "Çoklu Model Desteği",
    description: "Doubao, DeepSeek, OpenAI, Gemini ve daha fazlası",
  },
  {
    color: COLOR,
    label: "Ücretsiz",
    title: "Açık Kaynak",
    description: "MIT Lisansı, kendi sunucunuzda barındırın, tam kontrol",
  },
];

export function WhatsNewSection({ className }: { className?: string }) {
  return (
    <Section
      className={cn("", className)}
      title="DeerFlow 2.0'daki Yenilikler"
      subtitle="DeerFlow artık bir Derin Araştırma ajanından tam donanımlı bir Süper Ajana dönüşüyor"
    >
      <div className="flex w-full items-center justify-center">
        <MagicBento data={features} />
      </div>
    </Section>
  );
}
