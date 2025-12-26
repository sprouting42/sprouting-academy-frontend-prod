import { PagePath } from "@/enum";

export const homeHeroContent = {
  title: "อัปสกิลแห่งอนาคต",
  subTitle: ["abc", "efg", "xyx"],
  buttonItems: [
    {
      id: "ai-automation",
      text: "ดูคอร์สทั้งหมด",
      link: PagePath.COURSES,
    },
    {
      id: "bootcamp",
      text: "ดูคอร์ส Bootcamp",
      link: PagePath.BOOTCAMPS,
    },
    {
      id: "quotation",
      text: "ขอใบเสนอราคาองค์กร",
      link: PagePath.QUOTATION,
    },
  ],
};
