"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { ButtonCart } from "@/components/button/buttonCart";
import { GradientBorderWrapper } from "@/components/common";
import {
  NAV_TRANSITION,
  NAV_VARIANTS,
  NAVIGATION_Z_INDEX,
} from "@/constants/navigationBar";
import { useGetMe, useSignOut } from "@/hooks/useAuth";
import { cn } from "@/utils/cn";

import {
  DesktopUserMenu,
  HamburgerButton,
  isDrawerOpen,
  MobileMenu,
  navigationLinks,
} from "./navigationBar/";
import ThemeSwitcher from "./themeSwitcher";

export const NavigationBar = () => {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useGetMe();
  const signOutMutation = useSignOut();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const drawerOpen = isDrawerOpen();

        if (isOpen || drawerOpen || currentScrollY < 10) {
          setIsVisible(true);
          lastScrollY.current = currentScrollY;
          ticking.current = false;
          return;
        }

        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });

      ticking.current = true;
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleResize = () => {
      if (isDrawerOpen()) {
        setIsVisible(true);
      }

      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <motion.nav
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      variants={NAV_VARIANTS}
      transition={NAV_TRANSITION}
      style={{ zIndex: NAVIGATION_Z_INDEX }}
      className={cn(
        "fixed top-0 left-0 right-0 w-full px-4 py-8 lg:p-8 gap-10 font-prompt",
        isOpen && "bg-background",
        !isOpen && "bg-transparent",
      )}
    >
      <div className="flex flex-row grid-cols-3 items-center justify-between lg:grid w-full">
        <div className="flex gap-3 items-center justify-start">
          <div className="shrink-0">
            <Image
              src="/icons/sprouting-tech-academy-logo.svg"
              alt="Sprouting Tech Academy"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <h3 className="bg-clip-text bg-linear-to-r font-bold from-primary leading-normal lg:text-xl text-sm text-transparent to-secondary">
            Sprouting Tech Academy
          </h3>
        </div>
        <div className="hidden items-center justify-center lg:flex">
          <GradientBorderWrapper>
            <div className="bg-background-light flex items-center justify-center px-6 py-3 rounded-full xl:px-8 xl:py-4">
              <div className="flex flex-row gap-4 items-center xl:gap-8">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="active:scale-95 duration-200 hover:scale-105 hover:text-primary leading-5 text-foreground text-sm transition-all whitespace-nowrap xl:leading-6 xl:text-base"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </GradientBorderWrapper>
        </div>

        <div className="flex gap-4 items-center justify-end lg:gap-8">
          <ThemeSwitcher />
          <div className="hidden lg:flex lg:items-center">
            <DesktopUserMenu
              isMounted={isMounted}
              isUserLoading={isUserLoading}
              user={user}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              signOutMutation={signOutMutation}
              router={router}
            />
          </div>
          <div>
            <ButtonCart />
          </div>
          <HamburgerButton
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
          />
          <MobileMenu
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            isMounted={isMounted}
            isUserLoading={isUserLoading}
            user={user}
            signOutMutation={signOutMutation}
            router={router}
          />
        </div>
      </div>
    </motion.nav>
  );
};
