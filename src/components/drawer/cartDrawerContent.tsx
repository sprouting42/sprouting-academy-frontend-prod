"use client";

import React from "react";

export const SectionHeader = ({
  icon,
  title,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
}) => (
  <div className="flex gap-2 items-center pb-4">
    {icon}
    <h2 className="font-prompt font-semibold text-foreground text-lg">
      {title}
    </h2>
    <span className="font-prompt text-foreground/60 text-sm">({count})</span>
  </div>
);
