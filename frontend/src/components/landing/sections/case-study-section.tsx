import Link from "next/link";

import { Card } from "@/components/ui/card";
import { pathOfThread } from "@/core/threads/utils";
import { cn } from "@/lib/utils";

import { Section } from "../section";

export function CaseStudySection({ className }: { className?: string }) {
  const caseStudies = [
    {
      threadId: "7cfa5f8f-a2f8-47ad-acbd-da7137baf990",
      title: "2026 Ajan Trendlerini ve Fırsatlarını Tahmin Et",
      description:
        "2026 yılında ajan teknolojisi trendlerini ve fırsatlarını öngören bir Derinlemesine Araştırma raporu ile web sayfası oluşturun.",
    },
    {
      threadId: "4f3e55ee-f853-43db-bfb3-7d1a411f03cb",
      title: '"Gurur ve Önyargı" Romanına Dayalı Video Oluştur',
      description:
        '"Gurur ve Önyargı" romanından belirli bir sahneyi arayın, ardından sahnelere dayalı bir video ve referans görseli oluşturun.',
    },
    {
      threadId: "21cfea46-34bd-4aa6-9e1f-3009452fbeb9",
      title: "Doraemon MOE Mimarisini Açıklıyor",
      description:
        "Yapay zekaya ilgi duyan gençlere MOE mimarisini açıklayan bir Doraemon çizgi roman şeridi oluşturun.",
    },
    {
      threadId: "ad76c455-5bf9-4335-8517-fc03834ab828",
      title: "Titanic Veri Setinin Keşifsel Analizi",
      description:
        "Titanic veri setini keşfedin ve hayatta kalma oranlarını etkileyen temel faktörleri görselleştirmeler ve içgörülerle belirleyin.",
    },
    {
      threadId: "d3e5adaf-084c-4dd5-9d29-94f1d6bccd98",
      title: "Y Combinator Videosunu İzle ve Derinlemesine Araştır",
      description:
        "Verilen Y Combinator YouTube videosunu izleyin ve YC'nin teknik startup kurucularına ipuçları hakkında derinlemesine araştırma yapın.",
    },
    {
      threadId: "3823e443-4e2b-4679-b496-a9506eae462b",
      title: "Dr. Fei Fei Li'nin Podcast'lerini Topla ve Özetle",
      description:
        "Dr. Fei Fei Li'nin son 6 aydaki tüm podcast katılımlarını toplayın, ardından kapsamlı bir rapor halinde özetleyin.",
    },
  ];
  return (
    <Section
      className={className}
      title="Örnek Çalışmalar"
      subtitle="DeerFlow'un gerçek dünyada nasıl kullanıldığını görün"
    >
      <div className="container-md mt-8 grid grid-cols-1 gap-4 px-20 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((caseStudy) => (
          <Link
            key={caseStudy.title}
            href={pathOfThread(caseStudy.threadId) + "?mock=true"}
            target="_blank"
          >
            <Card className="group/card relative h-64 overflow-hidden">
              <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-300 group-hover/card:scale-110 group-hover/card:brightness-90"
                style={{
                  backgroundImage: `url(/images/${caseStudy.threadId}.jpg)`,
                }}
              ></div>
              <div
                className={cn(
                  "flex h-full w-full translate-y-[calc(100%-60px)] flex-col items-center",
                  "transition-all duration-300",
                  "group-hover/card:translate-y-[calc(100%-128px)]",
                )}
              >
                <div
                  className="flex w-full flex-col p-4"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="flex h-14 items-center text-xl font-bold text-shadow-black">
                      {caseStudy.title}
                    </h3>
                    <p className="box-shadow-black overflow-hidden text-sm text-white/85 text-shadow-black">
                      {caseStudy.description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
