import Image from "next/image";

import { AVATAR_ALT_TEXT } from "@/constants/navigationBar";
import { cn } from "@/utils/cn";

interface UserAvatarProps {
  avatarUrl?: string | null;
  size?: "sm" | "lg" | "xl";
}

const sizeConfig = {
  sm: {
    container: "w-11 h-11",
    placeholder: { width: 28, height: 28, className: "w-7 h-7" },
  },
  lg: {
    container: "w-24 h-24",
    placeholder: { width: 56, height: 56, className: "w-14 h-14" },
  },
  xl: {
    container: "w-42.5 h-42.5",
    placeholder: { width: 85, height: 85, className: "w-21.25 h-21.25" },
  },
};

export const UserAvatar = ({ avatarUrl, size = "sm" }: UserAvatarProps) => {
  const config = sizeConfig[size];

  return (
    <div
      className={cn(
        "bg-background-light flex items-center justify-center rounded-full shrink-0 overflow-hidden aspect-square relative",
        config.container,
        size === "lg" && "shadow-lg",
      )}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={AVATAR_ALT_TEXT}
          fill
          className="object-center object-cover"
        />
      ) : (
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
      )}
    </div>
  );
};
