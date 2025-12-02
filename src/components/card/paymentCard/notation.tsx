import { Badge } from "@/components/common/badge";
import { cn } from "@/utils/cn";

import { NotationProps } from "./types";

export const Notation = ({
  notationText,
  notationClassName,
}: NotationProps) => {
  const parts = notationText.split(":");
  const subtitle = parts.length > 1 ? `${parts[0]}:` : "";
  const text =
    parts.length > 1 ? parts.slice(1).join(":").trim() : notationText;

  return (
    <Badge
      variant="transparentSecondary"
      size="sm"
      shape="rounded"
      subtitle={subtitle}
      text={text}
      className={cn("w-full", notationClassName)}
    />
  );
};
