"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaFacebookF } from "react-icons/fa6";
import { PiYoutubeLogoFill } from "react-icons/pi";
import { TbBrandTwitterFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";

import { ButtonCart } from "@/components/button/buttonCart";
import {
  Button,
  GradientBorderWrapper,
  NavLink,
  UserAvatar,
} from "@/components/common";
import { MenuDropdown } from "@/components/dropdown";
import {
  AVATAR_ALT_TEXT,
  HAMBURGER_LINE_VARIANTS,
  HAMBURGER_TRANSITION,
  MOBILE_MENU_TOP_OFFSET,
  MOBILE_MENU_TRANSITION,
  MOBILE_MENU_VARIANTS,
  NAV_TRANSITION,
  NAV_VARIANTS,
  NAVIGATION_Z_INDEX,
} from "@/constants/navigationBar";
import { NavigationMenu, PagePath, Social } from "@/enum";
import { useGetMe, useSignOut } from "@/hooks/useAuth";
import { cn } from "@/utils/cn";

import ThemeSwitcher from "./themeSwitcher";

interface NavigationLink {
  href: string;
  label: string;
}

interface SocialLink {
  href: string;
  ariaLabel: string;
  icon: ReactNode;
}

const navigationLinks: NavigationLink[] = [
  { href: PagePath.HOME, label: NavigationMenu.HOME },
  { href: PagePath.COURSES, label: NavigationMenu.COURSES },
  { href: PagePath.BOOTCAMPS, label: NavigationMenu.BOOTCAMP },
];

const SOCIAL_ICON: Record<
  Social.FACEBOOK | Social.YOUTUBE | Social.TWITTER | Social.LINKEDIN,
  ReactNode
> = {
  [Social.FACEBOOK]: <FaFacebookF size={18} className="social-icon-primary" />,
  [Social.YOUTUBE]: (
    <PiYoutubeLogoFill size={18} className="social-icon-primary" />
  ),
  [Social.TWITTER]: (
    <TbBrandTwitterFilled size={18} className="social-icon-primary" />
  ),
  [Social.LINKEDIN]: <TfiLinkedin size={18} className="social-icon-primary" />,
};

const socialLinks: SocialLink[] = [
  {
    href: "#",
    ariaLabel: Social.FACEBOOK,
    icon: SOCIAL_ICON[Social.FACEBOOK],
  },
  {
    href: "#",
    ariaLabel: Social.TWITTER,
    icon: SOCIAL_ICON[Social.TWITTER],
  },
  {
    href: "#",
    ariaLabel: Social.LINKEDIN,
    icon: SOCIAL_ICON[Social.LINKEDIN],
  },
  {
    href: "#",
    ariaLabel: Social.YOUTUBE,
    icon: SOCIAL_ICON[Social.YOUTUBE],
  },
];

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

  const isDrawerOpen = useCallback(() => {
    const drawerElement = document.querySelector(
      '[role="dialog"][aria-modal="true"][data-drawer-open="true"]',
    );
    return !!drawerElement;
  }, []);

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
  }, [isOpen, isDrawerOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handleResize = () => {
      const drawerOpen = isDrawerOpen();
      if (drawerOpen) {
        setIsVisible(true);
      }

      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDrawerOpen, isOpen]);

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
          <h3 className="bg-clip-text bg-linear-to-r font-bold from-primary leading-7.5 lg:text-xl text-sm text-transparent to-secondary">
            Sprouting Tech Academy
          </h3>
        </div>
        <div className="hidden items-center justify-center lg:flex">
          <GradientBorderWrapper>
            <div className="bg-background-light flex items-center justify-center px-8 py-4 rounded-full">
              <div className="flex flex-row gap-8 items-center">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="active:scale-95 duration-200 hover:scale-105 hover:text-primary leading-6 text-base text-foreground transition-all"
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
          <div className="hidden lg:block">
            {!isMounted || isUserLoading ? (
              <GradientBorderWrapper>
                <div className="aspect-square bg-background-light flex h-11 items-center justify-center overflow-hidden relative rounded-full shrink-0 w-11">
                  <div className="animate-pulse bg-foreground/10 h-full rounded-full w-full" />
                </div>
              </GradientBorderWrapper>
            ) : user ? (
              <MenuDropdown
                isOpen={isDropdownOpen}
                onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                onClose={() => setIsDropdownOpen(false)}
                trigger={
                  <GradientBorderWrapper>
                    <Button
                      variant="profileButton"
                      aria-label={AVATAR_ALT_TEXT}
                    >
                      <UserAvatar avatarUrl={user.avatarUrl} size="sm" />
                    </Button>
                  </GradientBorderWrapper>
                }
              >
                <NavLink
                  href={PagePath.PROFILE}
                  text="บัญชีของฉัน"
                  variant="menuItem"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="border-foreground/10 border-t my-2" />
                <Button
                  onClick={() => {
                    signOutMutation.mutate();
                    setIsDropdownOpen(false);
                  }}
                  text={
                    signOutMutation.isPending
                      ? "กำลังออกจากระบบ..."
                      : "ออกจากระบบ"
                  }
                  variant="menuItemDanger"
                  disabled={signOutMutation.isPending}
                />
              </MenuDropdown>
            ) : (
              <Button
                onClick={() => router.push(PagePath.LOGIN)}
                text="เข้าสู่ระบบ"
                variant="primaryGradientBorder"
                size="sm"
                shape="rounded"
              />
            )}
          </div>
          <div>
            <ButtonCart />
          </div>
          <div className="lg:hidden relative">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "w-6 h-6 cursor-pointer relative z-60",
                isOpen
                  ? "flex items-center justify-center"
                  : "flex flex-col justify-center gap-1",
              )}
              whileHover={{ opacity: 0.8 }}
              whileTap={{ opacity: 0.6 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <motion.span
                className={cn(
                  "h-0.75 bg-primary rounded-full block",
                  isOpen &&
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                )}
                variants={HAMBURGER_LINE_VARIANTS.topBottom}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                transition={HAMBURGER_TRANSITION}
              />
              <div
                className={cn(
                  "relative",
                  isOpen && "absolute top-1/2 left-0 -translate-y-1/2 w-full",
                )}
              >
                <motion.span
                  className="bg-primary block h-0.75 rounded-full w-6"
                  variants={HAMBURGER_LINE_VARIANTS.middleTop}
                  initial="closed"
                  animate={isOpen ? "open" : "closed"}
                  transition={HAMBURGER_TRANSITION}
                />
                <motion.span
                  className="absolute bg-primary block h-0.75 left-0 rounded-full top-0 w-6"
                  variants={HAMBURGER_LINE_VARIANTS.middleBottom}
                  initial="closed"
                  animate={isOpen ? "open" : "closed"}
                  transition={HAMBURGER_TRANSITION}
                />
              </div>
              <motion.span
                className={cn(
                  "h-0.75 bg-primary rounded-full block",
                  isOpen &&
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                )}
                variants={HAMBURGER_LINE_VARIANTS.topBottom}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                transition={HAMBURGER_TRANSITION}
              />
            </motion.button>
          </div>
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  className="fixed inset-0 lg:hidden"
                  onClick={() => setIsOpen(false)}
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className={cn(
                    "fixed left-0 w-full h-full",
                    MOBILE_MENU_TOP_OFFSET,
                    "z-50 bg-background lg:hidden",
                  )}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Navigation menu"
                  variants={MOBILE_MENU_VARIANTS}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={MOBILE_MENU_TRANSITION}
                >
                  <div
                    className={cn(
                      "flex flex-col gap-16 px-4 overflow-y-auto pt-24",
                    )}
                  >
                    <div className="flex flex-1 flex-col gap-4 items-center justify-center">
                      {!isMounted || isUserLoading ? (
                        <div className="flex flex-col gap-3 items-center justify-center w-full">
                          <GradientBorderWrapper className="flex items-center justify-center p-1">
                            <div className="aspect-square bg-background-light flex h-24 items-center justify-center overflow-hidden relative rounded-full shadow-lg shrink-0 w-24">
                              <div className="animate-pulse bg-foreground/10 h-full rounded-full w-full" />
                            </div>
                          </GradientBorderWrapper>
                          <div className="animate-pulse bg-foreground/10 h-6 rounded w-32" />
                        </div>
                      ) : user ? (
                        <div className="flex flex-col gap-3 items-center justify-center w-full">
                          <GradientBorderWrapper className="flex items-center justify-center p-1">
                            <UserAvatar avatarUrl={user.avatarUrl} size="lg" />
                          </GradientBorderWrapper>
                          <p className="font-medium font-prompt leading-6 text-base text-foreground">
                            {user.fullName}
                          </p>
                        </div>
                      ) : null}
                      {navigationLinks.map((link) => (
                        <NavLink
                          key={link.href}
                          href={link.href}
                          text={link.label}
                          variant="mobileGradient"
                          onClick={() => setIsOpen(false)}
                        />
                      ))}
                      {isMounted && !isUserLoading && user && (
                        <>
                          <div className="border-foreground/10 border-t my-2 w-full" />
                          <NavLink
                            href={PagePath.PROFILE}
                            text="บัญชีของฉัน"
                            variant="mobileGradient"
                            onClick={() => setIsOpen(false)}
                          />
                          <Button
                            onClick={() => {
                              signOutMutation.mutate();
                              setIsOpen(false);
                            }}
                            text={
                              signOutMutation.isPending
                                ? "กำลังออกจากระบบ..."
                                : "ออกจากระบบ"
                            }
                            variant="errorButton"
                            size="md"
                            shape="rounded"
                            disabled={signOutMutation.isPending}
                            loading={signOutMutation.isPending}
                          />
                        </>
                      )}
                      {isMounted && !isUserLoading && !user && (
                        <Button
                          onClick={() => {
                            router.push(PagePath.LOGIN);
                            setIsOpen(false);
                          }}
                          text="เข้าสู่ระบบ"
                          variant="primaryGradientBorder"
                          size="sm"
                          shape="rounded"
                        />
                      )}
                    </div>

                    <div className="flex gap-4 items-center justify-center mt-auto">
                      {socialLinks.map((social) => (
                        <a
                          key={social.ariaLabel}
                          href={social.href}
                          className="bg-foreground flex h-10 hover:bg-background-light items-center justify-center rounded-full transition-colors w-10"
                          aria-label={social.ariaLabel}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};
