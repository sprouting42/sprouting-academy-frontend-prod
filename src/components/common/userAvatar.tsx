import Image from "next/image";

import { AVATAR_ALT_TEXT } from "@/constants/navigationBar";
import { cn } from "@/utils/cn";

interface UserAvatarProps {
  avatarUrl?: string | null;
  size?: "sm" | "lg" | "xl" | "2xl";
  className?: string;
  priority?: boolean;
}

const sizeConfig = {
  sm: {
    container: "w-11 h-11",
    placeholder: { width: 20, height: 20, className: "w-5 h-5" },
    sizes: "44px",
  },
  md: {
    container: "w-24 h-24",
    placeholder: { width: 40, height: 40, className: "w-10 h-10" },
    sizes: "96px",
  },
  lg: {
    container: "w-42.5 h-42.5",
    placeholder: { width: 68, height: 68, className: "w-17 h-17" },
    sizes: "170px",
  },
  xl: {
    container: "w-45 h-45",
    placeholder: { width: 90, height: 90, className: "w-22.5 h-22.5" },
    sizes: "180px",
  },
  "2xl": {
    container: "w-48 h-48",
    placeholder: {
      width: 96,
      height: 96,
      className: "w-12 h-12 md:w-24 md:h-24",
    },
    sizes: "(max-width: 768px) 96px, 192px",
  },
};

export const UserAvatar = ({
  avatarUrl,
  size = "sm",
  className,
  priority = false,
}: UserAvatarProps) => {
  const config = sizeConfig[size];

  return (
    <div
      className={cn(
        "bg-background flex items-center justify-center rounded-full shrink-0 overflow-hidden aspect-square relative",
        config.container,
        size === "lg" && "shadow-lg",
        className,
      )}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={AVATAR_ALT_TEXT}
          fill
          sizes={config.sizes}
          priority={priority}
          className="object-center object-cover"
        />
      ) : (
        <div className="absolute flex inset-0 items-center justify-center">
          <Image
            src="/icons/user.svg"
            alt={AVATAR_ALT_TEXT}
            width={config.placeholder.width}
            height={config.placeholder.height}
            className={cn(
              "object-contain shrink-0",
              config.placeholder.className,
            )}
          />
        </div>
      )}
    </div>
  );
};
