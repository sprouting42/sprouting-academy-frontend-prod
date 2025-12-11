"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { Footer, NavigationBar } from "@/components/layout";
import { MobileBottomNav } from "@/components/layout/mobileBottomNav";
import { cn } from "@/utils/cn";

interface LayoutWrapperProps {
  children: ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isProfilePage = pathname?.startsWith("/profile");

  return (
    <>
      {!isLoginPage && <NavigationBar />}
      <div
        className={
          isLoginPage
            ? "flex items-center justify-center min-h-screen lg:pt-32 lg:px-8 pt-28 px-4 py-4"
            : cn(
                "lg:pt-32 lg:px-8 pt-28 px-4",
                isProfilePage ? "pb-24 lg:pb-16" : "pb-16",
              )
        }
      >
        {children}
      </div>

      <MobileBottomNav />

      {!isLoginPage && !isProfilePage && <Footer />}
    </>
  );
}
