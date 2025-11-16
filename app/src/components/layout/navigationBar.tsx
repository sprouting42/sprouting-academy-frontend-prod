"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { PiYoutubeLogoFill } from "react-icons/pi";
import { TbBrandTwitterFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";

import { Button } from "@/components/common/button";
import { NavigationMenu, PagePath, Social } from "@/enum";
import { cn } from "@/utils/cn";

import { ButtonCart } from "../button/buttonCart";

interface GradientBorderWrapperProps {
  children: React.ReactNode;
  className?: string;
}

interface NavigationLink {
  href: string;
  label: string;
}

interface SocialLink {
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
}

const navVariants = {
  visible: { y: 0 },
  hidden: { y: "-100%" },
};

const navTransition = {
  duration: 0.3,
  ease: "easeInOut" as const,
};

const hamburgerLineVariants = {
  topBottom: {
    closed: { width: "100%" },
    open: { width: "0%" },
  },
  middleTop: {
    closed: { rotate: 0 },
    open: { rotate: 45 },
  },
  middleBottom: {
    closed: { rotate: 0 },
    open: { rotate: -45 },
  },
};

const hamburgerTransition = {
  duration: 0.25,
  ease: "easeInOut" as const,
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    y: -20,
  },
  open: {
    opacity: 1,
    y: 0,
  },
};

const mobileMenuTransition = {
  duration: 0.3,
  ease: "easeInOut" as const,
};

const navigationLinks: NavigationLink[] = [
  { href: PagePath.HOME, label: NavigationMenu.HOME },
  { href: PagePath.COURSES, label: NavigationMenu.COURSES },
];

const SOCIAL_ICON: Record<
  Social.FACEBOOK | Social.YOUTUBE | Social.TWITTER | Social.LINKEDIN,
  React.ReactNode
> = {
  [Social.FACEBOOK]: (
    <FaFacebookF size={18} style={{ color: "var(--primary)" }} />
  ),
  [Social.YOUTUBE]: (
    <PiYoutubeLogoFill size={18} style={{ color: "var(--primary)" }} />
  ),
  [Social.TWITTER]: (
    <TbBrandTwitterFilled size={18} style={{ color: "var(--primary)" }} />
  ),
  [Social.LINKEDIN]: (
    <TfiLinkedin size={18} style={{ color: "var(--primary)" }} />
  ),
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

const mobileLinkBaseClasses = [
  "text-[22px] leading-8.25",
  "text-transparent bg-clip-text",
  "transition-all duration-200",
  "cursor-pointer",
];

const GradientBorderWrapper = ({
  children,
  className,
}: GradientBorderWrapperProps) => {
  return (
    <div
      className={cn(
        "p-0.5 rounded-full bg-linear-to-r from-primary to-secondary",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const NavigationBar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

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
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDrawerOpen]);

  return (
    <motion.nav
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      variants={navVariants}
      transition={navTransition}
      className={cn(
        "fixed top-0 left-0 right-0 w-full px-4 py-8 lg:p-8 gap-10 font-prompt",
        "z-9999",
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
        {/* <div className="hidden items-center justify-center lg:flex">
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
          <div className="hidden lg:block">
            <Button
              onClick={() => router.push(PagePath.LOGIN)}
              text="เข้าสู่ระบบ"
              variant="primaryGradientBorder"
              size="sm"
              shape="rounded"
            />
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
                variants={hamburgerLineVariants.topBottom}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                transition={hamburgerTransition}
              />
              <div
                className={cn(
                  "relative",
                  isOpen && "absolute top-1/2 left-0 -translate-y-1/2 w-full",
                )}
              >
                <motion.span
                  className="bg-primary block h-0.75 rounded-full w-6"
                  variants={hamburgerLineVariants.middleTop}
                  initial="closed"
                  animate={isOpen ? "open" : "closed"}
                  transition={hamburgerTransition}
                />
                <motion.span
                  className="absolute bg-primary block h-0.75 left-0 rounded-full top-0 w-6"
                  variants={hamburgerLineVariants.middleBottom}
                  initial="closed"
                  animate={isOpen ? "open" : "closed"}
                  transition={hamburgerTransition}
                />
              </div>
              <motion.span
                className={cn(
                  "h-0.75 bg-primary rounded-full block",
                  isOpen &&
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                )}
                variants={hamburgerLineVariants.topBottom}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                transition={hamburgerTransition}
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
                    "fixed left-0 w-full h-full top-28",
                    "z-50 bg-background lg:hidden",
                  )}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Navigation menu"
                  variants={mobileMenuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={mobileMenuTransition}
                >
                  <div
                    className={cn(
                      "flex flex-col gap-16 px-4 overflow-y-auto pt-24",
                    )}
                  >
                    <div className="flex flex-1 flex-col gap-4 items-center justify-center">
                      {navigationLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            ...mobileLinkBaseClasses,
                            "hover:opacity-80 hover:scale-105",
                            "active:opacity-60 active:scale-95",
                          )}
                          style={{
                            backgroundImage:
                              "linear-gradient(to right, var(--primary), var(--secondary))",
                          }}
                          onClick={() => setIsOpen(false)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundImage =
                              "linear-gradient(to right, var(--secondary), var(--primary))";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundImage =
                              "linear-gradient(to right, var(--primary), var(--secondary))";
                          }}
                        >
                          {link.label}
                        </Link>
                      ))}
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
        </div> */}
      </div>
    </motion.nav>
  );
};
