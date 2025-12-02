"use client";
import { useRouter } from "next/navigation";

import {
  Button,
  GradientBorderWrapper,
  NavLink,
  UserAvatar,
} from "@/components/common";
import { MenuDropdown } from "@/components/dropdown";
import { AVATAR_ALT_TEXT } from "@/constants/navigationBar";
import { PagePath } from "@/enum";
import { useSignOut } from "@/hooks/useAuth";

interface DesktopUserMenuProps {
  isMounted: boolean;
  isUserLoading: boolean;
  user: { avatarUrl?: string | null; fullName?: string } | null | undefined;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  signOutMutation: ReturnType<typeof useSignOut>;
  router: ReturnType<typeof useRouter>;
}

export const DesktopUserMenu = ({
  isMounted,
  isUserLoading,
  user,
  isDropdownOpen,
  setIsDropdownOpen,
  signOutMutation,
  router,
}: DesktopUserMenuProps) => {
  if (!isMounted || isUserLoading) {
    return (
      <GradientBorderWrapper>
        <div className="aspect-square bg-background-light flex h-11 items-center justify-center overflow-hidden relative rounded-full shrink-0 w-11">
          <div className="animate-pulse bg-foreground/10 h-full rounded-full w-full" />
        </div>
      </GradientBorderWrapper>
    );
  }

  if (user) {
    return (
      <MenuDropdown
        isOpen={isDropdownOpen}
        onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
        onClose={() => setIsDropdownOpen(false)}
        trigger={
          <GradientBorderWrapper>
            <Button variant="profileButton" aria-label={AVATAR_ALT_TEXT}>
              <UserAvatar avatarUrl={user.avatarUrl} size="sm" />
            </Button>
          </GradientBorderWrapper>
        }
      >
        <NavLink
          // href={PagePath.PROFILE}
          href=""
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
          text={signOutMutation.isPending ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}
          variant="menuItemDanger"
          disabled={signOutMutation.isPending}
        />
      </MenuDropdown>
    );
  }

  return (
    <Button
      onClick={() => router.push(PagePath.LOGIN)}
      text="เข้าสู่ระบบ"
      variant="primaryGradientBorder"
      size="sm"
      shape="rounded"
    />
  );
};
