import type { ReactNode } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { PiYoutubeLogoFill } from "react-icons/pi";
import { TbBrandTwitterFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";

import { NavigationMenu, PagePath, Social } from "@/enum";

export interface NavigationLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  ariaLabel: string;
  icon: ReactNode;
}

export const navigationLinks: NavigationLink[] = [
  { href: PagePath.HOME, label: NavigationMenu.HOME },
  { href: PagePath.COURSES, label: NavigationMenu.COURSES },
  { href: PagePath.BOOTCAMPS, label: NavigationMenu.BOOTCAMP },
  { href: PagePath.EBOOK, label: NavigationMenu.EBOOK },
  { href: PagePath.INSTRUCTORS, label: NavigationMenu.INSTRUCTORS },
  { href: PagePath.CONTACT, label: NavigationMenu.CONTACT },
  { href: PagePath.ABOUT_US, label: NavigationMenu.ABOUT_US },
];

export const SOCIAL_ICON: Record<
  Social.FACEBOOK | Social.YOUTUBE | Social.TWITTER | Social.LINKEDIN,
  ReactNode
> = {
  [Social.FACEBOOK]: <FaFacebookF size={18} className="social-icon-primary" />,
  [Social.YOUTUBE]: (
    <PiYoutubeLogoFill size={18} className="social-icon-primary" />
  ),
  [Social.TWITTER]: (
    <TbBrandTwitterFilled size={18} className="social-icon-primary" />
  ),
  [Social.LINKEDIN]: <TfiLinkedin size={18} className="social-icon-primary" />,
};

export const socialLinks: SocialLink[] = [
  {
    href: "#",
    ariaLabel: Social.FACEBOOK,
    icon: SOCIAL_ICON[Social.FACEBOOK],
  },
  {
    href: "#",
    ariaLabel: Social.TWITTER,
    icon: SOCIAL_ICON[Social.TWITTER],
  },
  {
    href: "#",
    ariaLabel: Social.LINKEDIN,
    icon: SOCIAL_ICON[Social.LINKEDIN],
  },
  {
    href: "#",
    ariaLabel: Social.YOUTUBE,
    icon: SOCIAL_ICON[Social.YOUTUBE],
  },
];
