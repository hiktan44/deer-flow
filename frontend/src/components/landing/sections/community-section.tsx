"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";

import { Section } from "../section";

export function CommunitySection() {
  return (
    <Section
      title={
        <AuroraText colors={["#60A5FA", "#A5FA60", "#A560FA"]}>
          Topluluğa Katıl
        </AuroraText>
      }
      subtitle="DeerFlow'un geleceğini şekillendirmek için harika fikirlerle katkıda bulunun. İşbirliği yapın, yenilik getirin ve etki yaratın."
    >
      <div className="flex justify-center">
        <Button className="text-xl" size="lg" asChild>
          <Link href="https://github.com/bytedance/deer-flow" target="_blank">
            <GitHubLogoIcon />
            Şimdi Katkıda Bulun
          </Link>
        </Button>
      </div>
    </Section>
  );
}
