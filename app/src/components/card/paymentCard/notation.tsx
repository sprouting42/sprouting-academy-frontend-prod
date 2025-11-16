import { cn } from "@/utils/cn";

import { NotationProps } from "./types";

export const Notation = ({
  notationText,
  notationClassName,
}: NotationProps) => {
  return (
    <div className={cn("px-4 py-2 rounded-full text-sm", notationClassName)}>
      {notationText}
    </div>
  );
};
