"use client";

import { useCallback, useMemo } from "react";
import { IconType } from "react-icons";
import { PiBookOpen, PiVideoCamera } from "react-icons/pi";

import { Button } from "@/components/common/button";
import { cn } from "@/utils/cn";

export type LibraryTab = "video" | "ebook";

export interface TabData {
  id: LibraryTab;
  label: string;
  count: number;
  icon: IconType;
}

interface LibraryTabsProps {
  activeTab: LibraryTab;
  onTabChange: (tab: LibraryTab) => void;
  tabData?: TabData[];
  videoCount?: number;
  ebookCount?: number;
  className?: string;
}

const DEFAULT_TAB_VIDEO: TabData = {
  id: "video",
  label: "วิดีโอ",
  count: 0,
  icon: PiVideoCamera,
};

const DEFAULT_TAB_EBOOK: TabData = {
  id: "ebook",
  label: "อีบุ๊ค",
  count: 0,
  icon: PiBookOpen,
};

export const LibraryTabs = ({
  activeTab,
  onTabChange,
  tabData,
  videoCount = 0,
  ebookCount = 0,
  className,
}: LibraryTabsProps) => {
  const defaultTabs = useMemo<TabData[]>(
    () => [
      { ...DEFAULT_TAB_VIDEO, count: videoCount },
      { ...DEFAULT_TAB_EBOOK, count: ebookCount },
    ],
    [videoCount, ebookCount],
  );

  const tabs = tabData ?? defaultTabs;

  const isValidActiveTab = useMemo(
    () => tabs.some((tab) => tab.id === activeTab),
    [tabs, activeTab],
  );
  const currentActiveTab = useMemo(
    () => (isValidActiveTab ? activeTab : (tabs[0]?.id ?? activeTab)),
    [isValidActiveTab, activeTab, tabs],
  );

  const handleTabClick = useCallback(
    (tabId: LibraryTab) => {
      onTabChange(tabId);
    },
    [onTabChange],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, tabId: LibraryTab) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleTabClick(tabId);
      }
    },
    [handleTabClick],
  );

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("flex w-full gap-3", className)}
      role="tablist"
      aria-label="Library tabs"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentActiveTab === tab.id;

        return (
          <Button
            key={tab.id}
            variant="tabButton"
            onClick={() => handleTabClick(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={cn(
              isActive
                ? "bg-foreground/5 border-foreground/25"
                : "border-foreground/25",
            )}
          >
            <Icon
              size={22}
              className={cn(
                "shrink-0",
                isActive ? "text-foreground" : "text-foreground/70",
              )}
              aria-hidden="true"
            />

            <span
              className={cn(
                "font-prompt text-base leading-5 font-normal",
                isActive ? "text-foreground" : "text-foreground/70",
              )}
            >
              {tab.label}
            </span>

            <div
              className={cn(
                "flex items-center justify-center px-2.5 py-1 rounded-full bg-foreground/5 min-w-7.5 h-6",
              )}
              aria-label={`${tab.label} count: ${tab.count}`}
            >
              <span
                className={cn(
                  "font-prompt text-base leading-4 font-normal text-center",
                  isActive ? "text-foreground" : "text-foreground/70",
                )}
              >
                {tab.count}
              </span>
            </div>
          </Button>
        );
      })}
    </div>
  );
};
