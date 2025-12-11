"use client";

import { CertificateIcon } from "@phosphor-icons/react/dist/csr/Certificate";
import { GearIcon } from "@phosphor-icons/react/dist/csr/Gear";
import { HouseIcon } from "@phosphor-icons/react/dist/csr/House";
import { QuestionIcon } from "@phosphor-icons/react/dist/csr/Question";
import { TagIcon } from "@phosphor-icons/react/dist/csr/Tag";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { PagePath } from "@/enum";
import { cn } from "@/utils/cn";

export const MobileBottomNav = () => {
  const pathname = usePathname();

  const isProfileSection = pathname?.startsWith("/profile");

  if (!isProfileSection) return null;

  const navItems = [
    {
      href: PagePath.PROFILE,
      label: "Profile",
      icon: HouseIcon,
      exactMatch: true,
    },
    {
      href: PagePath.PROFILE_COURSES,
      label: "Courses",
      icon: TagIcon,
      disabled: true,
    },
    {
      href: PagePath.PROFILE_CERTIFICATIONS,
      label: "Certs",
      icon: CertificateIcon,
      disabled: true,
    },
    {
      href: PagePath.PROFILE_SETTINGS,
      label: "Settings",
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

  return (
    <div className="[html[data-theme='dark']_&]:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3),0_-2px_4px_-1px_rgba(0,0,0,0.2)] backdrop-blur-md bg-background/95 bottom-0 fixed left-0 lg:hidden safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)] w-full z-50">
      <div className="flex h-16 items-center justify-around px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const disabled = item.disabled ?? false;

          const isActive = item.exactMatch
            ? pathname === item.href
            : pathname?.startsWith(item.href);

          if (disabled) {
            return (
              <div
                key={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full gap-1",
                  "opacity-50 cursor-not-allowed pointer-events-none",
                )}
              >
                <Icon
                  size={24}
                  weight="regular"
                  className="mb-0.5 text-foreground/40"
                />
                <span className="font-medium font-prompt leading-tight text-[0.5625rem] text-foreground/40 tracking-wide">
                  {item.label}
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1",
                "active:scale-95 transition-all duration-200",
                "relative",
                isActive
                  ? "text-secondary"
                  : "text-foreground/50 hover:text-foreground/80",
              )}
            >
              <Icon
                size={24}
                weight={isActive ? "fill" : "regular"}
                className="mb-0.5"
              />
              <span className="font-medium font-prompt leading-tight text-[0.5625rem] tracking-wide">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bg-secondary bottom-1 h-1 rounded-full w-1" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
