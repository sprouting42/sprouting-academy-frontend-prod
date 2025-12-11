"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  Button,
  GradientBorderWrapper,
  NavLink,
  UserAvatar,
} from "@/components/common";
import {
  MOBILE_MENU_TOP_OFFSET,
  MOBILE_MENU_TRANSITION,
  MOBILE_MENU_VARIANTS,
} from "@/constants/navigationBar";
import { PagePath } from "@/enum";
import { useSignOut } from "@/hooks/useAuth";
import { cn } from "@/utils/cn";

import { navigationLinks, socialLinks } from "./navigationData";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isMounted: boolean;
  isUserLoading: boolean;
  user: { avatarUrl?: string | null; fullName?: string } | null | undefined;
  signOutMutation: ReturnType<typeof useSignOut>;
  router: ReturnType<typeof useRouter>;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  isMounted,
  isUserLoading,
  user,
  signOutMutation,
  router,
}: MobileMenuProps) => {
  const renderUserSection = () => {
    if (!isMounted || isUserLoading) {
      return (
        <div className="flex flex-col gap-3 items-center justify-center w-full">
          <GradientBorderWrapper className="flex items-center justify-center p-1">
            <div className="aspect-square bg-background-light flex h-24 items-center justify-center overflow-hidden relative rounded-full shadow-lg shrink-0 w-24">
              <div className="animate-pulse bg-foreground/10 h-full rounded-full w-full" />
            </div>
          </GradientBorderWrapper>
          <div className="animate-pulse bg-foreground/10 h-6 rounded w-32" />
        </div>
      );
    }

    if (user) {
      return (
        <div className="flex flex-col gap-3 items-center justify-center w-full">
          <GradientBorderWrapper className="flex items-center justify-center p-1">
            <UserAvatar avatarUrl={user.avatarUrl} size="lg" />
          </GradientBorderWrapper>
          <p className="font-medium font-prompt leading-6 text-base text-foreground">
            {user.fullName}
          </p>
        </div>
      );
    }

    return null;
  };

  const renderAuthActions = () => {
    if (!isMounted || isUserLoading) {
      return null;
    }

    if (user) {
      return (
        <>
          <div className="border-foreground/10 border-t my-2 w-full" />
          <NavLink
            href={PagePath.PROFILE}
            text="บัญชีของฉัน"
            variant="mobileGradient"
            onClick={onClose}
          />
          <Button
            onClick={() => {
              signOutMutation.mutate();
              onClose();
            }}
            text={
              signOutMutation.isPending ? "กำลังออกจากระบบ..." : "ออกจากระบบ"
            }
            variant="errorButton"
            size="md"
            shape="rounded"
            disabled={signOutMutation.isPending}
            loading={signOutMutation.isPending}
          />
        </>
      );
    }

    return (
      <Button
        onClick={() => {
          router.push(PagePath.LOGIN);
          onClose();
        }}
        text="เข้าสู่ระบบ"
        variant="primaryGradientBorder"
        size="sm"
        shape="rounded"
      />
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 lg:hidden"
            onClick={onClose}
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
              "z-50 bg-background lg:hidden overflow-y-auto",
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
                "flex flex-col gap-16 px-4 min-h-full lg:pt-24 pb-8",
              )}
            >
              <div className="flex flex-1 flex-col gap-4 items-center justify-center">
                {renderUserSection()}
                {navigationLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    text={link.label}
                    variant="mobileGradient"
                    onClick={onClose}
                  />
                ))}
                {renderAuthActions()}
              </div>

              <div className="flex gap-4 items-center justify-center mt-auto">
                {socialLinks.map((social) => (
                  <a
                    key={social.ariaLabel}
                    href={social.href}
                    className="[html[data-theme='light']_&]:border [html[data-theme='light']_&]:border-background-light flex h-10 hover:bg-background-light items-center justify-center rounded-full social-icon-bg transition-colors w-10"
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
  );
};
