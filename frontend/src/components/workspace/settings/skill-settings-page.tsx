"use client";

import { ChevronDownIcon, SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Item,
  ItemActions,
  ItemTitle,
  ItemContent,
  ItemDescription,
} from "@/components/ui/item";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/core/i18n/hooks";
import { useEnableSkill, useSkills } from "@/core/skills/hooks";
import type { Skill } from "@/core/skills/type";
import { env } from "@/env";
import { cn } from "@/lib/utils";

import { SettingsSection } from "./settings-section";

// Skill → Grup eşlemesi
const SKILL_GROUP_MAP: Record<string, string> = {
  "deep-research": "research",
  "github-deep-research": "research",
  "find-skills": "research",
  "image-generation": "contentCreation",
  "video-generation": "contentCreation",
  "podcast-generation": "contentCreation",
  "ppt-generation": "contentCreation",
  "data-analysis": "dataAnalysis",
  "chart-visualization": "dataAnalysis",
  "consulting-analysis": "dataAnalysis",
  "frontend-design": "development",
  "web-design-guidelines": "development",
  "vercel-deploy": "development",
  "claude-to-deerflow": "development",
  bootstrap: "system",
  "skill-creator": "system",
  "surprise-me": "system",
};

type GroupKey = "research" | "contentCreation" | "dataAnalysis" | "development" | "system";

const GROUP_ORDER: GroupKey[] = [
  "research",
  "contentCreation",
  "dataAnalysis",
  "development",
  "system",
];

export function SkillSettingsPage({ onClose }: { onClose?: () => void } = {}) {
  const { t } = useI18n();
  const { skills, isLoading, error } = useSkills();
  return (
    <SettingsSection
      title={t.settings.skills.title}
      description={t.settings.skills.description}
    >
      {isLoading ? (
        <div className="text-muted-foreground text-sm">{t.common.loading}</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <SkillSettingsList skills={skills} onClose={onClose} />
      )}
    </SettingsSection>
  );
}

function SkillSettingsList({
  skills,
  onClose,
}: {
  skills: Skill[];
  onClose?: () => void;
}) {
  const { t } = useI18n();
  const router = useRouter();
  const [filter, setFilter] = useState<string>("public");
  const { mutate: enableSkill } = useEnableSkill();
  const filteredSkills = useMemo(
    () => skills.filter((skill) => skill.category === filter),
    [skills, filter],
  );

  // Skill'leri gruplara ayır
  const groupedSkills = useMemo(() => {
    const groups: Record<string, Skill[]> = {};
    for (const group of GROUP_ORDER) {
      groups[group] = [];
    }
    // "other" group for unclassified skills
    groups["other"] = [];

    for (const skill of filteredSkills) {
      const group = SKILL_GROUP_MAP[skill.name] ?? "other";
      if (groups[group]) {
        groups[group]!.push(skill);
      } else {
        groups["other"]!.push(skill);
      }
    }
    return groups;
  }, [filteredSkills]);

  const handleCreateSkill = () => {
    onClose?.();
    router.push("/workspace/chats/new?mode=skill");
  };

  const handleGroupToggle = useCallback(
    (groupSkills: Skill[], enabled: boolean) => {
      for (const skill of groupSkills) {
        if (skill.enabled !== enabled) {
          enableSkill({ skillName: skill.name, enabled });
        }
      }
    },
    [enableSkill],
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <header className="flex justify-between">
        <div className="flex gap-2">
          <Tabs defaultValue="public" onValueChange={setFilter}>
            <TabsList variant="line">
              <TabsTrigger value="public">{t.common.public}</TabsTrigger>
              <TabsTrigger value="custom">{t.common.custom}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div>
          <Button size="sm" onClick={handleCreateSkill}>
            <SparklesIcon className="size-4" />
            {t.settings.skills.createSkill}
          </Button>
        </div>
      </header>
      {filteredSkills.length === 0 && (
        <EmptySkill onCreateSkill={handleCreateSkill} />
      )}
      {filteredSkills.length > 0 && (
        <div className="flex flex-col gap-3">
          {GROUP_ORDER.map((groupKey) => {
            const groupSkills = groupedSkills[groupKey] ?? [];
            if (groupSkills.length === 0) return null;
            const groupLabel =
              t.settings.skills.groups[groupKey as keyof typeof t.settings.skills.groups];
            const enabledCount = groupSkills.filter((s) => s.enabled).length;
            const allEnabled = enabledCount === groupSkills.length;

            return (
              <SkillGroup
                key={groupKey}
                label={groupLabel}
                skills={groupSkills}
                enabledCount={enabledCount}
                allEnabled={allEnabled}
                onGroupToggle={(enabled) =>
                  handleGroupToggle(groupSkills, enabled)
                }
                onSkillToggle={(skillName, enabled) =>
                  enableSkill({ skillName, enabled })
                }
              />
            );
          })}
          {/* "other" grubundaki skill'ler (tanımsız kategori) */}
          {(groupedSkills["other"]?.length ?? 0) > 0 && (
            <SkillGroup
              label="📦 Diğer"
              skills={groupedSkills["other"]!}
              enabledCount={
                groupedSkills["other"]!.filter((s) => s.enabled).length
              }
              allEnabled={groupedSkills["other"]!.every((s) => s.enabled)}
              onGroupToggle={(enabled) =>
                handleGroupToggle(groupedSkills["other"]!, enabled)
              }
              onSkillToggle={(skillName, enabled) =>
                enableSkill({ skillName, enabled })
              }
            />
          )}
        </div>
      )}
    </div>
  );
}

function SkillGroup({
  label,
  skills,
  enabledCount,
  allEnabled,
  onGroupToggle,
  onSkillToggle,
}: {
  label: string;
  skills: Skill[];
  enabledCount: number;
  allEnabled: boolean;
  onGroupToggle: (enabled: boolean) => void;
  onSkillToggle: (skillName: string, enabled: boolean) => void;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(true);
  const isStaticOnly = env.NEXT_PUBLIC_STATIC_WEBSITE_ONLY === "true";

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="bg-muted/30 rounded-lg border">
        <div className="flex items-center justify-between px-4 py-3">
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex flex-1 items-center gap-2 text-left"
            >
              <ChevronDownIcon
                className={cn(
                  "text-muted-foreground size-4 transition-transform duration-200",
                  !open && "-rotate-90",
                )}
              />
              <span className="text-sm font-semibold">{label}</span>
              <span className="text-muted-foreground text-xs">
                {t.settings.skills.enabledCount(enabledCount, skills.length)}
              </span>
            </button>
          </CollapsibleTrigger>
          <Switch
            checked={allEnabled}
            disabled={isStaticOnly}
            onCheckedChange={onGroupToggle}
            aria-label={allEnabled ? t.settings.skills.disableAll : t.settings.skills.enableAll}
          />
        </div>
        <CollapsibleContent>
          <div className="flex flex-col gap-1 px-3 pb-3">
            {skills.map((skill) => (
              <Item className="w-full" variant="outline" key={skill.name}>
                <ItemContent>
                  <ItemTitle>
                    <div className="flex items-center gap-2">{skill.name}</div>
                  </ItemTitle>
                  <ItemDescription className="line-clamp-4">
                    {skill.description}
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Switch
                    checked={skill.enabled}
                    disabled={isStaticOnly}
                    onCheckedChange={(checked) =>
                      onSkillToggle(skill.name, checked)
                    }
                  />
                </ItemActions>
              </Item>
            ))}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

function EmptySkill({ onCreateSkill }: { onCreateSkill: () => void }) {
  const { t } = useI18n();
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SparklesIcon />
        </EmptyMedia>
        <EmptyTitle>{t.settings.skills.emptyTitle}</EmptyTitle>
        <EmptyDescription>
          {t.settings.skills.emptyDescription}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={onCreateSkill}>{t.settings.skills.emptyButton}</Button>
      </EmptyContent>
    </Empty>
  );
}
