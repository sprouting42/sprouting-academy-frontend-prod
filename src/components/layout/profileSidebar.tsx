"use client";

import type { IconProps } from "@phosphor-icons/react";
import { CertificateIcon } from "@phosphor-icons/react/dist/csr/Certificate";
import { GearIcon } from "@phosphor-icons/react/dist/csr/Gear";
import { HouseIcon } from "@phosphor-icons/react/dist/csr/House";
import { QuestionIcon } from "@phosphor-icons/react/dist/csr/Question";
import { TagIcon } from "@phosphor-icons/react/dist/csr/Tag";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PagePath } from "@/enum";
import { cn } from "@/utils/cn";

const PROFILE_SIDEBAR_Z_INDEX = 10;

interface MenuItem {
  href: string;
  label: string;
  icon: React.ComponentType<IconProps>;
  disabled?: boolean;
}

const menuItems: MenuItem[] = [
  {
    href: PagePath.PROFILE,
    label: "My Profile",
    icon: HouseIcon,
  },
  {
    href: PagePath.PROFILE_COURSES,
    label: "Registered Courses",
    icon: TagIcon,
    disabled: true,
  },
  {
    href: PagePath.PROFILE_CERTIFICATIONS,
    label: "Certifications",
    icon: CertificateIcon,
    disabled: true,
  },
];

const bottomMenuItems: MenuItem[] = [
  {
    href: PagePath.PROFILE_SETTINGS,
    label: "Setting",
    icon: GearIcon,
    disabled: true,
  },
  {
    href: PagePath.PROFILE_HELP,
    label: "Help",
    icon: QuestionIcon,
    disabled: true,
  },
];

const getIconClassName = (isDisabled: boolean, active: boolean) => {
  return cn(
    "w-9 h-9 transition-colors duration-200",
    isDisabled
      ? "text-foreground/40"
      : active
        ? "text-secondary"
        : "text-foreground",
  );
};

const getTextClassName = (isDisabled: boolean, active: boolean) => {
  return cn(
    "font-prompt font-normal text-xl leading-7.5 transition-colors duration-200",
    isDisabled
      ? "text-foreground/40"
      : active
        ? "text-secondary"
        : "text-foreground",
  );
};

export const ProfileSidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === PagePath.PROFILE) {
      return pathname === PagePath.PROFILE;
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col items-center",
        "w-58.5 py-8",
        "fixed left-0",
        "top-30",
        "bottom-0",
        "overflow-x-hidden overflow-y-auto",
        "min-w-0",
      )}
      style={{
        zIndex: PROFILE_SIDEBAR_Z_INDEX,
      }}
    >
      <div className="flex flex-col h-full items-center justify-between min-w-0 px-2 w-58.5">
        <nav
          className="flex flex-col gap-2 items-center justify-center min-w-0 w-54.5"
          aria-label="Main navigation"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const isRegisteredCourses = item.label === "Registered Courses";
            const isDisabled = item.disabled;

            const content = (
              <div className="flex flex-row gap-4 items-center min-w-0 w-full">
                <div className="flex h-9 items-center justify-center shrink-0 w-9">
                  <Icon
                    className={getIconClassName(isDisabled ?? false, active)}
                    weight={active ? "fill" : "regular"}
                    aria-hidden="true"
                  />
                </div>
                <span className={getTextClassName(isDisabled ?? false, active)}>
                  {item.label}
                </span>
              </div>
            );

            if (isDisabled) {
              return (
                <div
                  key={item.href}
                  className={cn(
                    "flex flex-row items-center",
                    "px-4 py-6 gap-4",
                    "w-54.5 rounded-lg",
                    "min-w-0",
                    isRegisteredCourses ? "h-27" : "h-20.75",
                    "opacity-50 cursor-not-allowed pointer-events-none",
                  )}
                  aria-disabled="true"
                >
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-row items-center",
                  "px-4 py-6 gap-4",
                  "w-54.5 rounded-lg",
                  "min-w-0",
                  isRegisteredCourses ? "h-27" : "h-20.75",
                  "transition-all duration-200",
                  "cursor-pointer",
                  active
                    ? "bg-primary/10 cursor-default"
                    : "hover:bg-foreground/5 active:opacity-80 active:scale-[0.98]",
                )}
                aria-current={active ? "page" : undefined}
              >
                {content}
              </Link>
            );
          })}
        </nav>

        <nav
          className="flex flex-col gap-2 items-center justify-center min-w-0 w-54.5"
          aria-label="Secondary navigation"
        >
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const isDisabled = item.disabled;

            const content = (
              <div className="flex flex-row gap-4 items-center min-w-0 w-full">
                <div className="flex h-9 items-center justify-center shrink-0 w-9">
                  <Icon
                    className={getIconClassName(isDisabled ?? false, active)}
                    weight={active ? "fill" : "regular"}
                    aria-hidden="true"
                  />
                </div>
                <span className={getTextClassName(isDisabled ?? false, active)}>
                  {item.label}
                </span>
              </div>
            );

            if (isDisabled) {
              return (
                <div
                  key={item.href}
                  className={cn(
                    "flex flex-row items-center",
                    "px-4 py-6 gap-4",
                    "w-54.5 h-20.75 rounded-lg",
                    "min-w-0",
                    "opacity-50 cursor-not-allowed pointer-events-none",
                  )}
                  aria-disabled="true"
                >
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-row items-center",
                  "px-4 py-6 gap-4",
                  "w-54.5 h-20.75 rounded-lg",
                  "min-w-0",
                  "transition-all duration-200",
                  "cursor-pointer",
                  active
                    ? "bg-primary/10 cursor-default"
                    : "hover:bg-foreground/5 active:opacity-80 active:scale-[0.98]",
                )}
                aria-current={active ? "page" : undefined}
              >
                {content}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
