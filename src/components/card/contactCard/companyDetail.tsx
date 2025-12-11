import React from "react";

import { Card } from "@/components/common/card";
import { socialLinks } from "@/constants/socialLinks";

const SOCIAL_LINK_CLASSES =
  "w-11 h-11 rounded-full [html[data-theme='light']_&]:bg-[#ffffff] [html[data-theme='dark']_&]:bg-[#2E2E2E] flex items-center justify-center [html[data-theme='dark']_&]:hover:bg-foreground/20 [html[data-theme='dark']_&]:transition-colors";

export default function CompanyDetail() {
  return (
    <div>
      <Card
        variant="gradientDarkToLight"
        cardContent={
          <div className="bg-gradient-to-b from-base-200 p-6 rounded-2xl to-background">
            <h3 className="font-semibold mb-8 text-[1.375rem] text-center text-primary">
              ข้อมูลบริษัท
            </h3>
            <p className="font-normal mb-3 text-base">
              ที่อยู่: 309/137 โกลเด้น วัลเลย์, ศรีราชา, ชลบุรี 20110
            </p>
            <p className="font-normal mb-3 text-base">
              อีเมล: sproutingacademy@gmail.com
            </p>
            <p className="font-normal text-base">เบอร์โทรศัพท์: 033138804</p>

            <div className="flex flex-row gap-4 items-center justify-center py-8">
              {socialLinks.map((social) => (
                <div
                  key={social.ariaLabel}
                  className="[html[data-theme='dark']_&]:bg-gradient-to-b [html[data-theme='dark']_&]:from-[#333333] [html[data-theme='dark']_&]:to-[#242424] [html[data-theme='light']_&]:bg-[#ffffff] [html[data-theme='light']_&]:hover:shadow-lg [html[data-theme='light']_&]:hover:shadow-secondary/50 [html[data-theme='light']_&]:shadow-md duration-300 flex h-12 items-center justify-center rounded-full transition-shadow w-12"
                >
                  <a
                    href={social.href}
                    className={SOCIAL_LINK_CLASSES}
                    aria-label={social.ariaLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                </div>
              ))}
            </div>

            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3884.958536200954!2d100.95853531117154!3d13.165014387114876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102b72111677785%3A0x922c6cfaad27117d!2z4Lia4Lij4Li04Lip4Lix4LiXIOC4l-C4o-C4tOC4peC5gOC4peC4teC5iOC4ouC4meC4quC5jCDguYDguJfguKPguJQg4LiI4Liz4LiB4Lix4LiU!5e0!3m2!1sth!2sth!4v1764775425155!5m2!1sth!2sth"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full md:h-[31.25rem] rounded-xl w-full"
              />
            </div>
          </div>
        }
      />
    </div>
  );
}
