import type { SocialLink } from "@/constants/socialLinks";
import { createSocialLinks } from "@/constants/socialLinks";
import { NavigationMenu, PagePath } from "@/enum";

export interface NavigationLink {
  href: string;
  label: string;
}

export { type SocialLink };

export const socialLinks = createSocialLinks("social-icon-primary");

export const navigationLinks: NavigationLink[] = [
  { href: PagePath.HOME, label: NavigationMenu.HOME },
  { href: PagePath.COURSES, label: NavigationMenu.COURSES },
  { href: PagePath.BOOTCAMPS, label: NavigationMenu.BOOTCAMP },
  { href: PagePath.EBOOK, label: NavigationMenu.EBOOK },
  { href: PagePath.INSTRUCTORS, label: NavigationMenu.INSTRUCTORS },
  { href: PagePath.CONTACT, label: NavigationMenu.CONTACT },
  { href: PagePath.ABOUT_US, label: NavigationMenu.ABOUT_US },
];
