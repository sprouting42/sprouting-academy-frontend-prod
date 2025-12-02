"use client";
import { SparkleIcon } from "@phosphor-icons/react/dist/csr/Sparkle";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { PiYoutubeLogoFill } from "react-icons/pi";
import { TbBrandTwitterFilled } from "react-icons/tb";
import { TfiLinkedin } from "react-icons/tfi";

import { Button } from "@/components/common/button";
import { FooterMenu, PagePath, Social } from "@/enum";

import { Badge } from "../common/badge";

interface SocialLink {
  href: string;
  ariaLabel: string;
  icon: ReactNode;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  heading: string;
  links: FooterLink[];
}

const CTA_TITLE_CLASSES =
  "text-xl leading-relaxed lg:text-3xl lg:leading-loose font-bold lg:font-medium text-center text-foreground";
const FOOTER_SECTION_LINK_CLASSES =
  "text-sm leading-normal font-normal text-foreground hover:text-primary transition-colors";
const BOTTOM_LINK_CLASSES =
  "font-normal leading-relaxed hover:text-primary lg:text-sm text-foreground text-xs transition-colors";
const SOCIAL_LINK_CLASSES =
  "w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors";

const SOCIAL_ICON: Record<
  Social.FACEBOOK | Social.YOUTUBE | Social.TWITTER | Social.LINKEDIN,
  ReactNode
> = {
  [Social.FACEBOOK]: <FaFacebookF size={18} className="text-primary" />,
  [Social.YOUTUBE]: <PiYoutubeLogoFill size={18} className="text-primary" />,
  [Social.TWITTER]: <TbBrandTwitterFilled size={18} className="text-primary" />,
  [Social.LINKEDIN]: <TfiLinkedin size={18} className="text-primary" />,
};

const socialLinks: SocialLink[] = [
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

const footerSections: FooterSection[] = [
  {
    heading: "โปรแกรมการศึกษา",
    links: [
      { label: FooterMenu.COURSE_DETAIL, href: PagePath.COURSES },
      { label: FooterMenu.BOOTCAMP_DETAIL, href: PagePath.BOOTCAMPS },
    ],
  },
  {
    heading: "บริษัท",
    links: [
      { label: FooterMenu.ABOUT_US, href: PagePath.ABOUT_US },
      { label: FooterMenu.INSTRUCTORS, href: PagePath.INSTRUCTORS },
      { label: FooterMenu.CONTACT, href: PagePath.CONTACT },
    ],
  },
  {
    heading: "ช่วยเหลือและกฎหมาย",
    links: [
      { label: FooterMenu.FAQ, href: PagePath.FAQ },
      { label: FooterMenu.PRIVACY_POLICY, href: PagePath.PRIVACY_POLICY },
      { label: FooterMenu.TERMS_OF_SERVICE, href: PagePath.TERMS_OF_SERVICE },
    ],
  },
];

const bottomLinks = [
  { label: FooterMenu.PRIVACY_POLICY, href: PagePath.PRIVACY_POLICY },
  { label: FooterMenu.TERMS_OF_SERVICE, href: PagePath.TERMS_OF_SERVICE },
  { label: FooterMenu.COOKIE_POLICY, href: PagePath.COOKIE_POLICY },
];

export const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const shouldShowCTA =
    !pathname.startsWith(PagePath.COURSES) &&
    !pathname.startsWith(PagePath.BOOTCAMPS);
  return (
    <footer className="flex flex-col font-prompt items-center w-full">
      {shouldShowCTA && (
        <div className="flex flex-col isolate items-center py-16 relative w-full">
          <div className="absolute bg-secondary-alpha-50 blur-3xl h-72 left-[calc(50%-144px)] rounded-full top-64.5 w-72 z-0" />
          <div className="flex flex-col gap-2.5 items-center lg:gap-4 max-w-7xl px-8 relative w-full z-10">
            <Badge
              text="ราคา Early Bird ประหยัดได้กว่า 80%"
              icon={
                <span className="[html[data-theme='dark']_&]:text-foreground text-secondary">
                  <SparkleIcon size={16} color="currentColor" weight="fill" />
                </span>
              }
              variant="transparentPrimary"
              shape="rounded"
              size="sm"
            />
            <h1 className={CTA_TITLE_CLASSES}>
              พร้อมจะยกระดับ อัพสกิลในการทำงานหรือยัง?
            </h1>
            <div className="w-fit">
              <div className="flex flex-col gap-4 md:flex-row">
                <Button
                  text="ดูคอร์ส AI Automation"
                  variant="primaryGradientBorder"
                  size="sm"
                  shape="rounded"
                  onClick={() => router.push(PagePath.COURSES)}
                />
                <Button
                  text="ดูหลักสูตร Bootcamp"
                  variant="secondaryGradientBorder"
                  size="sm"
                  shape="rounded"
                  onClick={() => router.push(PagePath.BOOTCAMPS)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-background-light lg:pt-px lg:px-12 lg:py-0 px-4 py-8 relative w-full z-20">
        <div className="flex flex-col gap-12 items-start lg:px-8 lg:py-12">
          <div className="flex flex-col gap-8 items-start justify-between lg:flex-row lg:gap-8 lg:items-center lg:justify-between w-full">
            <div className="flex flex-col gap-4 items-start lg:w-100 w-full">
              <div className="flex flex-row gap-3 items-center">
                <Image
                  src="/icons/sprouting-tech-academy-logo.svg"
                  alt="Sprouting Tech Academy"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <h1 className="font-bold leading-normal text-lg text-primary">
                  Sprouting Tech Academy
                </h1>
              </div>
              <p className="font-normal leading-relaxed text-foreground text-sm">
                Empowering the next generation of AI professionals with
                world-class education and hands-on training in artificial
                intelligence and machine learning.
              </p>
              <div className="flex flex-row gap-4 items-center">
                {socialLinks.map((social) => (
                  <a
                    key={social.ariaLabel}
                    href={social.href}
                    className={SOCIAL_LINK_CLASSES}
                    aria-label={social.ariaLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8 items-start justify-center lg:flex-row lg:gap-8 lg:justify-start lg:w-auto w-full">
              {footerSections.map((section) => (
                <div
                  key={section.heading}
                  className="flex flex-col gap-4 items-start lg:px-4 lg:w-auto px-0 w-full"
                >
                  <h3 className="font-bold leading-6 text-base text-primary">
                    {section.heading}
                  </h3>
                  <ul className="flex flex-col gap-3 items-start">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className={FOOTER_SECTION_LINK_CLASSES}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-foreground/25 border-t flex flex-col items-start pt-8.25 w-full">
            <div className="flex flex-col gap-2 items-center justify-between lg:flex-row lg:gap-0 w-full">
              <p className="font-normal leading-relaxed lg:text-left lg:text-sm text-center text-foreground text-xs">
                © 2025 Sprouting Tech Academy. All rights reserved.
              </p>
              <div className="flex flex-row gap-4 items-center justify-center lg:gap-6 lg:justify-start">
                {bottomLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={BOTTOM_LINK_CLASSES}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
