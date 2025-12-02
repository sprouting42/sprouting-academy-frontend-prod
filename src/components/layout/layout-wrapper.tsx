"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { Footer, NavigationBar } from "@/components/layout";

interface LayoutWrapperProps {
  children: ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <>
      {!isLoginPage && <NavigationBar />}
      <div
        className={
          isLoginPage
            ? "flex items-center justify-center min-h-screen lg:pt-32 lg:px-8 pt-28 px-4 py-4"
            : "lg:pt-32 lg:px-8 pt-28 px-4 pb-16 "
        }
      >
        {children}
      </div>
      {!isLoginPage && <Footer />}
    </>
  );
}
