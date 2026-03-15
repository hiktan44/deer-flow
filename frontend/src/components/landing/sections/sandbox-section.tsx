"use client";

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";

import { Section } from "../section";

export function SandboxSection({ className }: { className?: string }) {
  return (
    <Section
      className={className}
      title="Ajan Çalışma Ortamı"
      subtitle={
        <p>
          DeerFlow&apos;a bir &quot;bilgisayar&quot; verdik — komut çalıştırır,
          dosyaları yönetir ve uzun süren görevleri yürütür — hepsi güvenli
          Docker tabanlı bir sandbox içinde
        </p>
      }
    >
      <div className="mt-8 flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Sol: Terminal */}
        <div className="w-full flex-1">
          <Terminal className="h-[360px] w-full">
            {/* Sahne 1: Oyun Geliştirme */}
            <TypingAnimation>$ cat requirements.txt</TypingAnimation>
            <AnimatedSpan delay={800} className="text-zinc-400">
              pygame==2.5.0
            </AnimatedSpan>

            <TypingAnimation delay={1200}>
              $ pip install -r requirements.txt
            </TypingAnimation>
            <AnimatedSpan delay={2000} className="text-green-500">
              ✔ pygame yüklendi
            </AnimatedSpan>

            <TypingAnimation delay={2400}>
              $ write game.py --lines 156
            </TypingAnimation>
            <AnimatedSpan delay={3200} className="text-blue-500">
              ✔ 156 satır yazıldı
            </AnimatedSpan>

            <TypingAnimation delay={3600}>
              $ python game.py --test
            </TypingAnimation>
            <AnimatedSpan delay={4200} className="text-green-500">
              ✔ Tüm görseller yüklendi
            </AnimatedSpan>
            <AnimatedSpan delay={4500} className="text-green-500">
              ✔ Fizik motoru tamam
            </AnimatedSpan>
            <AnimatedSpan delay={4800} className="text-green-500">
              ✔ 60 FPS kararlı
            </AnimatedSpan>

            {/* Sahne 2: Veri Analizi */}
            <TypingAnimation delay={5400}>
              $ curl -O satis-2024.csv
            </TypingAnimation>
            <AnimatedSpan delay={6200} className="text-zinc-400">
              12.4 MB indirildi
            </AnimatedSpan>
          </Terminal>
        </div>

        {/* Sağ: Açıklama */}
        <div className="w-full flex-1 space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-medium tracking-wider text-purple-400 uppercase">
              Açık Kaynak
            </p>
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
              <a
                href="https://github.com/agent-infra/sandbox"
                target="_blank"
                rel="noopener noreferrer"
              >
                AIO Sandbox
              </a>
            </h2>
          </div>

          <div className="space-y-4 text-lg text-zinc-400">
            <p>
              Tarayıcı, Kabuk, Dosya, MCP ve VSCode Sunucusunu tek bir Docker
              container&apos;ında birleştiren{" "}
              <a
                href="https://github.com/agent-infra/sandbox"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hepsi Bir Arada Sandbox
              </a>{" "}
              kullanılmasını öneriyoruz.
            </p>
          </div>

          {/* Özellik Etiketleri */}
          <div className="flex flex-wrap gap-3 pt-4">
            <span className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
              İzole
            </span>
            <span className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
              Güvenli
            </span>
            <span className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
              Kalıcı
            </span>
            <span className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
              Bağlanabilir DS
            </span>
            <span className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
              Uzun Süreli
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
