import type { ReactNode } from "react";

export interface CourseCardProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  bulletPoints: string[];
  price: string;
  dateBadgeText: string;
  imageBadgeText: string;
  dateStart?: string;
}

export interface CourseDetailProps {
  courseBenefit?: string;
  courseTopics?: ReactNode[];
  caseStudies?: ReactNode[];
  classType?: string;
  totalTime?: string;
  startDate?: string;
  instructorImage?: string;
  instructorName?: string;
  instructorInformation?: string;
}

export interface CourseData extends CourseCardProps, CourseDetailProps {
  id: string;
}

export const courses: CourseData[] = [
  {
    id: "ai-for-sale",
    src: "/courses/ai-for-sale.jpg",
    alt: "AI for Sale Course",
    title: "AI for Sale",
    description:
      "เปลี่ยนงาน Manual ให้เป็นระบบสร้างรายชื่อลูกค้า (Leads) ด้วย Make.com และ AI",
    bulletPoints: [
      "ทำความรู้จัก AI Automation",
      "ตัวอย่าง (Case Studies)",
      "คำศัพท์เทคนิคที่ควรรู้",
      "ใช้งาน Make.com เครื่องมือ AI Automation ที่พึ่งพาโค้ดน้อยที่สุด",
      "ตัวการสร้าง Automation เพื่อส่งข้อมูลข้ามซอฟต์แวร์/โปรแกรม โดยอัตโนมัติ",
      "หารายชื่อลูกค้าจากอินเตอร์เน็ตได้ฟรี ทั้งชื่อ เบอร์โทร และอีเมล",
      "ให้เอไอเขียนจดหมายเฉพาะบุคคลและส่งต่อไปยังรายชื่อลูกค้าที่หาได้",
    ],
    price: "1,000 บาท",
    dateBadgeText: "เรียนวันที่ 8 ธันวาคม 2568",
    imageBadgeText: "รับเพียง 10 ที่นั่ง",
    courseBenefit:
      "สร้างระบบติดตามและแจ้งเตือน Lead อัตโนมัติ, ใช้ AI ช่วยเขียน Email/Proposal ที่เข้าถึงลูกค้าเฉพาะราย, เพิ่มอัตรา Conversion ใน Sales Funnel",
    courseTopics: [
      "เน้นการเชื่อมต่อ CRM (เช่น Salesforce/HubSpot) กับ AI",
      "การสร้าง Lead Scoring อัตโนมัติ",
      "การสร้าง Follow-up Flow",
    ],
    caseStudies: ["Workshop: สร้าง Chatbot ตอบลูกค้าอัตโนมัติ 24 ชม."],
    classType: "Online, Live/Recorded",
    // instructorImage: "/KP.jpg",
    instructorName: "คุณ กษิดิ์พิชญ์ วีระกุล",
    instructorInformation:
      "ได้รับ Certificate จาก Make.com มีประสบการณ์ทำงานในหลายด้าน ทำให้เข้าใจถึง pain point ในงานต่าง ๆ ที่สามารถนำ AI automation มาช่วยให้การลดส่วนของงานที่ต้องทำซ้ำซ้อน ใช้ Make.com ในการสร้าง Flow สำหรับส่งอีเมลแจ้งเตือน, อัปเดตฐานข้อมูลลูกค้า และสร้างรายงานประจำสัปดาห์อัตโนมัติ",
  },
  {
    id: "ai-for-marketing",
    src: "/courses/ai-for-marketing.jpg",
    alt: "AI for Marketing Course",
    title: "AI for Marketing",
    description:
      "เลิกโพสต์เองทุกวัน สร้างเครื่องจักรคอนเทนต์และจัดการลีดด้วย Make.com + AI อื่นๆ",
    bulletPoints: [
      "ทำความรู้จัก AI Automation",
      "ตัวอย่าง (Case Studies)",
      "คำศัพท์เทคนิคที่ควรรู้",
      "ใช้งาน Make.com เครื่องมือ AI Automation ที่พึ่งพาโค้ดน้อยที่สุด",
      "ตัวการสร้าง Automation เพื่อส่งข้อมูลข้ามซอฟต์แวร์/โปรแกรม โดยอัตโนมัติ",
      "สร้างคอนเทนต์สำหรับทุกแพลตฟอร์ม โดยอัตโนมัติด้วย AI",
      "ให้เอไอเขียนจดหมายเฉพาะบุคคลและส่งต่อไปยังรายชื่อลูกค้าที่หาได้",
    ],
    price: "1,000 บาท",
    dateBadgeText: "เรียนวันที่ 10 ธันวาคม 2568",
    imageBadgeText: "รับเพียง 10 ที่นั่ง",
    courseBenefit:
      "สร้างแคมเปญการตลาดอัตโนมัติครบวงจร, ใช้ AI ช่วยสร้าง Content (Text/Image) จำนวนมากอย่างรวดเร็ว, วิเคราะห์ผลลัพธ์แคมเปญและปรับปรุงอัตโนมัติ",
    courseTopics: [
      "เน้นการเชื่อมต่อเครื่องมือ MarTech (เช่น Meta Ads, Mailchimp) กับ AI",
      "การใช้ AI Prompting สำหรับ Copywriting",
      "การสร้าง Funnel Automation",
    ],
    caseStudies: ["Workshop: สร้าง Chatbot ตอบลูกค้าอัตโนมัติ 24 ชม."],
    classType: "Online, Live/Recorded",
    // instructorImage: "/KP.jpg",
    instructorName: "คุณ กษิดิ์พิชญ์ วีระกุล",
    instructorInformation:
      "ได้รับ Certificate จาก Make.com มีประสบการณ์ทำงานในหลายด้าน ทำให้เข้าใจถึง pain point ในงานต่าง ๆ ที่สามารถนำ AI automation มาช่วยให้การลดส่วนของงานที่ต้องทำซ้ำซ้อน ใช้ Make.com ในการสร้าง Flow สำหรับส่งอีเมลแจ้งเตือน, อัปเดตฐานข้อมูลลูกค้า และสร้างรายงานประจำสัปดาห์อัตโนมัติ",
  },
  {
    id: "ai-for-hr",
    src: "/courses/ai-for-hr.jpg",
    alt: "AI for HR Course",
    title: "AI for HR",
    description:
      "ลดงานเอกสาร 80% สร้างระบบ HR อัจฉริยะ ตั้งแต่รับสมัครจรถึงทำสัญญาจ้างด้วย Make.com",
    bulletPoints: [
      "ทำความรู้จัก AI Automation",
      "ตัวอย่าง (Case Studies)",
      "คำศัพท์เทคนิคที่ควรรู้",
      "ใช้งาน Make.com เครื่องมือ AI Automation ที่พึ่งพาโค้ดน้อยที่สุด",
      "ตัวการสร้าง Automation เพื่อส่งข้อมูลข้ามซอฟต์แวร์/โปรแกรม โดยอัตโนมัติ",
      "สแกนผู้สมัคร คัดกรองใบสมัครจาก 200 คนให้เหลือเฉพาะผู้เข้าเกณฑ์และควรเรียกสัมภาษณ์",
      "นัดสัมภาษณ์อัตโนมัติด้วยระบบอัตโนมัติ พร้อมเตรียมคำถามให้คุณจาก CV ของผู้สมัคร",
    ],
    price: "1,000 บาท",
    dateBadgeText: "เรียนวันที่ 12 ธันวาคม 2568",
    imageBadgeText: "รับเพียง 10 ที่นั่ง",
    courseBenefit:
      "ลดเวลางาน Manual ของ HR (เช่น การคัดกรอง Resume) ได้ 50% ขึ้นไป, สร้างระบบ Onboarding/Training อัตโนมัติ, ปรับปรุงประสบการณ์พนักงานด้วย Chatbot HR",
    courseTopics: [
      "เน้นการเชื่อมต่อ ATS (Applicant Tracking System)",
      "การใช้ AI สรุป/คัดกรอง Resume",
      "การสร้าง Flow การแจ้งเตือน/ติดตามงานเอกสาร HR",
    ],
    caseStudies: ["Workshop: สร้าง Chatbot ตอบลูกค้าอัตโนมัติ 24 ชม."],
    classType: "Online, Live/Recorded",
    // instructorImage: "/KP.jpg",
    instructorName: "คุณ กษิดิ์พิชญ์ วีระกุล",
    instructorInformation:
      "ได้รับ Certificate จาก Make.com มีประสบการณ์ทำงานในหลายด้าน ทำให้เข้าใจถึง pain point ในงานต่าง ๆ ที่สามารถนำ AI automation มาช่วยให้การลดส่วนของงานที่ต้องทำซ้ำซ้อน ใช้ Make.com ในการสร้าง Flow สำหรับส่งอีเมลแจ้งเตือน, อัปเดตฐานข้อมูลลูกค้า และสร้างรายงานประจำสัปดาห์อัตโนมัติ",
  },
  {
    id: "n8n-ai-automation-1",
    src: "/courses/basic-ai-automation.jpg",
    alt: "n8n AI Automation Course",
    title: "n8n AI Automation",
    description:
      "ลดงานเอกสาร 80% สร้างระบบ HR อัจฉริยะ ตั้งแต่รับสมัครจรถึงทำสัญญาจ้างด้วย Make.com",
    bulletPoints: [
      "ทำความรู้จัก AI Automation",
      "ตัวอย่าง (Case Studies)",
      "คำศัพท์เทคนิคที่ควรรู้",
      "ออกแบบและสร้าง Workflow Marketing ได้ด้วยตัวเอง",
      "สร้าง Flow จริงที่ใช้งานได้ เช่น Content Calendar Automation, AI Caption Generator, และ Lead Tracker",
    ],
    price: "1,000 บาท",
    dateBadgeText: "เรียนวันที่ 14 ธันวาคม 2568",
    imageBadgeText: "รับเพียง 10 ที่นั่ง",
    courseBenefit:
      "ให้ n8n ช่วยทำงานด้าน Content Marketing เช่น การคิดแคปชั่น ตั้งเวลาโพสต์",
    courseTopics: [
      "พื้นฐานการทำ Automation ด้วย n8n",
      "ออกแบบและสร้าง Workflow Marketing ได้ด้วยตัวเอง",
      "สร้าง Flow จริงที่ใช้งานได้ เช่น Content Calendar Automation, AI Caption Generator, และ Lead Tracke",
    ],
    caseStudies: ["Workshop: สร้าง Chatbot ตอบลูกค้าอัตโนมัติ 24 ชม."],
    classType: "Online, Live/Recorded",
    // instructorImage: "/KP.jpg",
    instructorName: "คุณ พิณทร์วรันญ์ มิลินทจินดา",
    // instructorInformation:
    //   "ได้รับ Certificate จาก Make.com มีประสบการณ์ทำงานในหลายด้าน ทำให้เข้าใจถึง pain point ในงานต่าง ๆ ที่สามารถนำ AI automation มาช่วยให้การลดส่วนของงานที่ต้องทำซ้ำซ้อน ใช้ Make.com ในการสร้าง Flow สำหรับส่งอีเมลแจ้งเตือน, อัปเดตฐานข้อมูลลูกค้า และสร้างรายงานประจำสัปดาห์อัตโนมัติ",
  },
  {
    id: "n8n-ai-automation-2",
    src: "/courses/basic-ai-automation.jpg",
    alt: "n8n AI Automation Course",
    title: "n8n AI Automation",
    description:
      "ใช้งาน n8n สร้าง Flow ได้ เข้าใจ Workflow Automation สร้าง Flow ง่ายๆ พร้อมต่อยอดไปสู่ Flow ขั้นสูงหรือเชื่อมต่อ AI ได้ในอนาคต",
    bulletPoints: [
      "ทำความรู้จัก AI Automation",
      "ตัวอย่าง (Case Studies)",
      "คำศัพท์เทคนิคที่ควรรู้",
      "ออกแบบและสร้าง Workflow Marketing ได้ด้วยตัวเอง",
      "สร้าง Flow จริงที่ใช้งานได้ เช่น Content Calendar Automation, AI Caption Generator, และ Lead Tracker",
    ],
    price: "1,000 บาท",
    dateBadgeText: "เรียนวันที่ 15 ธันวาคม 2568",
    imageBadgeText: "รับเพียง 10 ที่นั่ง",
    courseBenefit:
      "ให้ n8n ช่วยทำงานด้าน Content Marketing เช่น การคิดแคปชั่น ตั้งเวลาโพสต์",
    courseTopics: [
      "พื้นฐานการทำ Automation ด้วย n8n",
      "ออกแบบและสร้าง Workflow Marketing ได้ด้วยตัวเอง",
      "สร้าง Flow จริงที่ใช้งานได้ เช่น Content Calendar Automation, AI Caption Generator, และ Lead Tracke",
    ],
    caseStudies: ["Workshop: สร้าง Chatbot ตอบลูกค้าอัตโนมัติ 24 ชม."],
    classType: "Online, Live/Recorded",
    // instructorImage: "/KP.jpg",
    instructorName: "คุณ พิณทร์วรันญ์ มิลินทจินดา",
    // instructorInformation:
    //   "ได้รับ Certificate จาก Make.com มีประสบการณ์ทำงานในหลายด้าน ทำให้เข้าใจถึง pain point ในงานต่าง ๆ ที่สามารถนำ AI automation มาช่วยให้การลดส่วนของงานที่ต้องทำซ้ำซ้อน ใช้ Make.com ในการสร้าง Flow สำหรับส่งอีเมลแจ้งเตือน, อัปเดตฐานข้อมูลลูกค้า และสร้างรายงานประจำสัปดาห์อัตโนมัติ",
  },
];
