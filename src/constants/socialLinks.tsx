import type { ReactNode } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { PiYoutubeLogoFill } from "react-icons/pi";
import { TbBrandTwitterFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";

import { Social, SocialPath } from "@/enum";

export interface SocialLink {
  href: string;
  ariaLabel: string;
  icon: ReactNode;
}

export const createSocialIcon = (
  iconClassName: string = "text-secondary",
): Record<
  Social.FACEBOOK | Social.YOUTUBE | Social.TWITTER | Social.LINKEDIN,
  ReactNode
> => ({
  [Social.FACEBOOK]: <FaFacebookF size={18} className={iconClassName} />,
  [Social.YOUTUBE]: <PiYoutubeLogoFill size={18} className={iconClassName} />,
  [Social.TWITTER]: (
    <TbBrandTwitterFilled size={18} className={iconClassName} />
  ),
  [Social.LINKEDIN]: <TfiLinkedin size={18} className={iconClassName} />,
});

export const SOCIAL_ICON = createSocialIcon();

export const createSocialLinks = (iconClassName?: string): SocialLink[] => {
  const icons = iconClassName ? createSocialIcon(iconClassName) : SOCIAL_ICON;
  return [
    {
      href: SocialPath.FACEBOOK,
      ariaLabel: Social.FACEBOOK,
      icon: icons[Social.FACEBOOK],
    },
    {
      href: "#",
      ariaLabel: Social.TWITTER,
      icon: icons[Social.TWITTER],
    },
    {
      href: "#",
      ariaLabel: Social.LINKEDIN,
      icon: icons[Social.LINKEDIN],
    },
    {
      href: "#",
      ariaLabel: Social.YOUTUBE,
      icon: icons[Social.YOUTUBE],
    },
  ];
};

export const socialLinks = createSocialLinks();
