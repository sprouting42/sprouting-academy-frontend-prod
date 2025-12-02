"use client";

import dynamic from "next/dynamic";

import type { DarkVeilProps } from "./darkVeil.tsx";

export const DarkVeilClient = dynamic<DarkVeilProps>(
  () =>
    import("./darkVeil.tsx").then((mod) => ({
      default: mod.DarkVeil,
    })),
  {
    ssr: false,
    loading: () => <div className="bg-background h-full w-full" />,
  },
);
