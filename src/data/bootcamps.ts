import { TechStackLogo, TechStackName } from "@/enum";

export interface BootcampData {
  slug: string;
  hero: {
    imageSrc: string;
    title: string;
    description: string;
    buttonItems: Array<{ id: string; text: string; link: string }>;
    className?: string;
  };
  suitableFor: {
    title: string;
    items: string[];
  };
  outcomes: {
    title: string;
    items: string[];
  };
  phases: Array<{
    phase: string;
    topic: string;
  }>;
  toolStack: {
    title: string;
    stackImages: Array<{
      src: string;
      alt: string;
    }>;
  };
  tableTitle?: string;
  whyStudy?: {
    title: string;
    items: string[];
  };
  designedFor?: {
    title: string;
    items: string[];
  };
  prerequisites?: {
    title: string;
    items: string[];
  };
  bootcampBenefits?: {
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      items: string[];
    }>;
  };
}

export const bootcamps: BootcampData[] = [
  {
    slug: "basic-html",
    hero: {
      imageSrc: "/basic-html-hero-img.png",
      title: "Basic HTML & CSS Bootcamp",
      description:
        "พื้นฐานสำคัญสู่สาย Web Developer เรียน 7-14 วัน สร้าง Personal Portfolio Website ได้ทันที",
      buttonItems: [
        {
          id: "1",
          text: "ลงทะเบียนรุ่นถัดไป",
          link: "https://form.jotform.com/253230682479058",
        },
      ],
      className:
        "object-cover  sm:object-center md:object-center lg:object-[0%_] rounded-lg",
    },
    suitableFor: {
      title: "เหมาะสำหรับ",
      items: [
        "ผู้เริ่มต้นสาย Web Dev ที่ ไม่มีพื้นฐานมาก่อน",
        "ผู้ที่เตรียมตัวเข้าสู่ Bootcamp ขั้นสูง (Java Spring Boot หรือ .NET Full Stack)",
        "ใช้ VS Code + GitHub ได้อย่างมืออาชีพ พร้อม Deploy เว็บขึ้นออนไลน์จริง",
        "นักเรียน / นักศึกษาที่อยากสร้าง Portfolio เว็บไซต์แรกของตัวเอง",
      ],
    },
    outcomes: {
      title: "ผลลัพธ์",
      items: [
        "เข้าใจโครงสร้าง HTML5 และหลักการจัด layout ด้วย CSS อย่างสมบูรณ์",
        "สามารถสร้างหน้าเว็บที่ Responsive 100% ได้ด้วย Flexbox & Grid",
        "ใช้ VS Code + GitHub ได้อย่างมืออาชีพ พร้อม Deploy เว็บขึ้นออนไลน์จริง",
        "สร้าง Landing Page หรือ Personal Portfolio Site ได้เอง 100%",
      ],
    },
    tableTitle: "วัน",
    phases: [
      {
        phase: "วันที่ 1-3",
        topic:
          "HTML & Structure: แนะนำ Web, ติดตั้ง VS Code, HTML Tags และ Semantic Tags",
      },
      {
        phase: "วันที่ 4-5",
        topic: "CSS Basic: Selectors, Colors, Fonts, Box Model, Layout",
      },
      {
        phase: "วันที่ 6-7",
        topic: "Flexbox & Grid: Flexbox Mastery และ Grid Layout",
      },
      {
        phase: "วันที่ 8-11",
        topic:
          "Advanced CSS & Responsive: Typography, Position, Z-index, CSS Variables, Media Query",
      },
      {
        phase: "วันที่ 12-14",
        topic: "Deployment & Project: Deploy Web, พื้นฐาน Git, สรุปองค์ความรู้",
      },
    ],
    toolStack: {
      title: "Tools & Stack ที่จะได้ใช้จริง",
      stackImages: [
        { src: TechStackLogo.VSCODE, alt: TechStackName.VSCODE },
        { src: TechStackLogo.GITHUB, alt: TechStackName.GITHUB },
        { src: TechStackLogo.FIGMA, alt: TechStackName.FIGMA },
      ],
    },
    whyStudy: {
      title: "พื้นฐานสู่สายงาน Tech",
      items: [
        "**The Foundation:** HTML & CSS คือ จุดเริ่มต้นที่ขาดไม่ได้ สําหรับทุกสายงาน IT (Frontend, Backend, Full-Stack, UX/UI, AI Automation)",
        "**Speed & Intensity:** 10 วันเต็ม (เช้าทฤษฎี/บ่าย Workshop) เพื่อให้เก่งเร็วที่สุด",
        "**Smart Start:** พร้อมต่อยอดทันทีไปยัง Full-Stack Java หรือ C# .NET Bootcamp",
      ],
    },
    prerequisites: {
      title: "สิ่งที่ต้องมีก่อนเรียน",
      items: [
        "ไม่จําเป็นต้องมีพื้นฐานใดๆ ทั้งสิ้น",
        "คอมพิวเตอร์ Windows/Mac พร้อมอินเทอร์เน็ต",
        "พร้อมเรียนเต็มวัน และลงมือทําจริง",
      ],
    },
  },
  {
    slug: "java-spring-boot",
    hero: {
      imageSrc: "/java-bootcamp-hero-img.png",
      title: "Java Spring Boot Full Stack Developer Bootcamp",
      description:
        "เรียน 12 สัปดาห์ พร้อมฝึกงานจริง 12 สัปดาห์ สร้างระบบจริงสู่ Portfolio สมัครงาน",
      buttonItems: [
        {
          id: "1",
          text: "ลงทะเบียนรุ่นถัดไป",
          link: "https://form.jotform.com/253230682479058",
        },
      ],
      className: "object-cover sm:object-center md:object-[0%_16%] rounded-lg",
    },
    suitableFor: {
      title: "เหมาะสำหรับ",
      items: [
        "ผู้เรียนที่ผ่านคอร์ส HTML/CSS หรือมีพื้นฐานการเขียนโปรแกรมแล้ว",
        "ผู้ที่ต้องการเปลี่ยนสายอาชีพเป็น Full Stack Developer สาย Java โดยเฉพาะ",
        "นักศึกษาจบใหม่ หรือผู้ที่ต้องการ Portfolio และประสบการณ์ฝึกงานที่จับต้องได้",
      ],
    },
    outcomes: {
      title: "ผลลัพธ์",
      items: [
        "เขียนระบบ Backend ด้วย Spring Boot ได้อย่างมืออาชีพ",
        "สร้าง RESTful API และเชื่อมต่อ React Frontend ได้อย่างสมบูรณ์",
        "ใช้ Git/GitHub, Docker, และ CI/CD Pipeline พร้อม Deploy ระบบจริงบน Cloud",
        "มี Full Stack Portfolio (Mini SaaS App) พร้อมสมัครงานทันที",
      ],
    },
    tableTitle: "Phase",
    phases: [
      {
        phase: "Phase 1: Foundation",
        topic: "(สัปดาห์ 1-2) พื้นฐาน Java, OOP, Spring Boot",
      },
      {
        phase: "Phase 2: Backend Development",
        topic: "(สัปดาห์ 3-6) RESTful API, Database, Security",
      },
      {
        phase: "Phase 3: Frontend Development",
        topic: "(สัปดาห์ 7-9) React, State Management",
      },
      {
        phase: "Phase 4: DevOps",
        topic: "(สัปดาห์ 10-11) Docker, CI/CD, Deployment",
      },
      {
        phase: "Phase 5: Final Project",
        topic: "(สัปดาห์ 12) Final Sprint & Presentation",
      },
    ],
    toolStack: {
      title: "Tools & Stack ที่จะได้ใช้จริง",
      stackImages: [
        { src: TechStackLogo.JAVA, alt: TechStackName.JAVA },
        { src: TechStackLogo.SPRING_BOOT, alt: TechStackName.SPRING_BOOT },
        { src: TechStackLogo.REACT, alt: TechStackName.REACT },
        { src: TechStackLogo.MYSQL, alt: TechStackName.MYSQL },
        { src: TechStackLogo.DOCKER, alt: TechStackName.DOCKER },
        { src: TechStackLogo.GIT, alt: TechStackName.GIT },
        { src: TechStackLogo.Intellij, alt: TechStackName.Intellij },
        { src: TechStackLogo.VSCODE, alt: TechStackName.VSCODE },
      ],
    },
    whyStudy: {
      title: "ทำไมต้องเรียน Bootcamp นี้?",
      items: [
        "**Java + Spring Boot** คือเทคโนโลยีหลักที่บริษัทใหญ่เลือกใช้ (ธนาคาร, โรงพยาบาล, ประกัน, Logistics, FinTech)",
        "**React** คือเทคโนโลยี Frontend ที่ครองตลาดโลก",
        '**Git, Docker, CI/CD** คือทักษะ DevOps ที่บริษัทจริงต้องใช้ แต่ Bootcamp อื่นส่วนใหญ่ "ไม่สอน"',
      ],
    },
    designedFor: {
      title: "Bootcamp ของ Sprouting Tech ถูกออกแบบให้",
      items: [
        "**3 เดือนเรียนหนักแบบมืออาชีพ** (Full-Day Intensive)",
        "**3 เดือนฝึกงานจริง** กับโปรเจคระดับบริษัท",
        "ได้ใบจบ Bootcamp + **ใบผ่านงานจริง**",
        "มีโค้ชช่วย **Resume + Mock Interview** แบบเข้มข้น",
      ],
    },
    prerequisites: {
      title: "สิ่งที่ต้องมีก่อนเรียน",
      items: [
        "รู้พื้นฐาน HTML/CSS",
        "รู้จักโครงสร้างเว็บเบื้องต้น",
        "ใช้ Git/GitHub ขั้นพื้นฐานได้",
        "มีพื้นฐาน Programming เล็กน้อย",
      ],
    },
    bootcampBenefits: {
      title: "คุณจะได้อะไรจาก Bootcamp นี้?",
      subtitle: "Skills ที่ตลาดต้องการที่สุดครบทุกด้าน",
      items: [
        {
          id: "backend-development",
          title: "สร้างระบบหลังบ้านที่มั่นคงด้วย Java และ Spring Boot",
          items: [
            "เขียน Java มาตรฐานบริษัทใหญ่",
            "พัฒนา Backend ด้วย Spring Boot แบบเต็มระบบ",
            "เขียนและออกแบบ REST API แบบมืออาชีพ",
            "ออกแบบ Database + ORM + JPA/Hibernate",
          ],
        },
        {
          id: "frontend-development",
          title: "พัฒนาส่วนหน้าเว็บด้วย React และเชื่อมต่อกับ Backend",
          items: [
            "ทำ Frontend ด้วย React แบบทันสมัย",
            "ต่อ Frontend + Backend ให้สมบูรณ์",
          ],
        },
        {
          id: "deployment-production",
          title: "ทักษะด้าน Deployment และเครื่องมือที่บริษัทใหญ่ใช้จริง",
          items: [
            "ใช้ Git, GitHub Workflow แบบนักพัฒนา",
            "สร้าง Docker Image + Run Container",
            "ตั้งค่า CI/CD พร้อม Deploy จริง",
            "จัดการแอปบน Cloud",
          ],
        },
        {
          id: "real-world-experience",
          title: "Real-World Experience",
          items: [
            "ฝึกงานจริง 3 เดือน กับบริษัทในเครือ",
            'ได้ทำโปรเจคที่ "มีผู้ใช้จริง"',
            "ได้ใบรับรองผ่านงาน (Experience Letter)",
          ],
        },
        {
          id: "career-ready",
          title: "Career Ready 100%",
          items: [
            "สร้าง Portfolio ระดับสมัครงานได้",
            "ช่วยปรับ Resume ให้โดดเด่น",
            "ฝึกตอบคำถามสัมภาษณ์แบบเข้มข้น (Mock Interview)",
            "เทคนิคใช้ LinkedIn หาโอกาสงาน",
            "การเตรียมตัวสำหรับงาน Remote และบริษัทต่างประเทศ",
          ],
        },
        {
          id: "full-day-bootcamp",
          title: "Full-Day Bootcamp 3 เดือนเต็ม",
          items: [
            "เช้า = ทฤษฎีแบบลงลึก",
            "บ่าย = Workshop ทำจริงจนคล่อง",
            "สอนสด มีโค้ชช่วยดูการทำงานแบบใกล้ชิด",
            "การบ้าน + Weekly Project + Final Project",
          ],
        },
      ],
    },
  },
  {
    slug: "csharp-net-core",
    hero: {
      imageSrc: "/net-bootcamp-hero-img.png",
      title: "C# .NET Core Full Stack Developer Bootcamp",
      description:
        "หลักสูตร 12 สัปดาห์ พร้อมฝึกงานจริง 12 สัปดาห์ สร้าง Enterprise Web App ด้วย .NET Core และ React",
      buttonItems: [
        {
          id: "1",
          text: "ลงทะเบียนรุ่นถัดไป",
          link: "https://form.jotform.com/253230682479058",
        },
      ],
      className:
        "object-cover  sm:object-center md:object-center lg:object-[0%_10%] rounded-lg",
    },
    suitableFor: {
      title: "เหมาะสำหรับ",
      items: [
        "ผู้ที่ต้องการเข้าทำงานในสาย Full Stack Dev / System Dev ในองค์กร ที่ใช้ .NET",
        "ผู้เปลี่ยนสายจาก non-tech มาสาย IT ที่ต้องการ Portfolio ที่หนักแน่น",
        "ผู้ที่ผ่านพื้นฐาน HTML/CSS แล้ว และต้องการฝึกงานจริงเพื่อสร้างประสบการณ์",
      ],
    },
    outcomes: {
      title: "ผลลัพธ์",
      items: [
        "เขียนระบบ Backend ด้วย .NET Core และจัดการฐานข้อมูลด้วย Entity Framework ได้",
        "เข้าใจระบบ Authentication, Role-based Access Control และการสร้าง JWT API",
        "ใช้ Git/GitHub, Docker, และ CI/CD Pipeline (Azure DevOps / GitHub Actions) ได้จริง",
        "มีโปรเจกต์ Enterprise Web App Portfolio พร้อมสมัครงานในบริษัทขนาดใหญ่",
      ],
    },
    tableTitle: "Phase",
    phases: [
      {
        phase: "Phase 1: Foundation",
        topic: "(สัปดาห์ 1-2) พื้นฐาน C#, OOP, .NET Core & Simple API",
      },
      {
        phase: "Phase 2: Backend Development",
        topic:
          "(สัปดาห์ 3-6) Entity Framework, CRUD API, Authentication (JWT, Identity), Advanced .NET Core",
      },
      {
        phase: "Phase 3: Frontend Development",
        topic: "(สัปดาห์ 7-9) React, Fetch API, State Management & Integration",
      },
      {
        phase: "Phase 4: DevOps & Development",
        topic:
          "(สัปดาห์ 10-11) Git Workflow, Docker, CI/CD (GitHub Actions / Azure DevOps)",
      },
      {
        phase: "Phase 5: Final Project",
        topic: "(สัปดาห์ 12) Final Sprint & Presentation (Enterprise Web App)",
      },
    ],
    toolStack: {
      title: "Tools & Stack ที่จะได้ใช้จริง",
      stackImages: [
        { src: TechStackLogo.VSCODE, alt: TechStackName.VSCODE },
        { src: TechStackLogo.C_SHARP, alt: TechStackName.C_SHARP },
        { src: TechStackLogo.POSTGRESQL, alt: TechStackName.POSTGRESQL },
        { src: TechStackLogo.REACT, alt: TechStackName.REACT },
        { src: TechStackLogo.DOCKER, alt: TechStackName.DOCKER },
        { src: TechStackLogo.AZURE, alt: TechStackName.AZURE },
        { src: TechStackLogo.AWS, alt: TechStackName.AWS },
      ],
    },
    whyStudy: {
      title: "ทำไมต้องเรียน Bootcamp นี้?",
      items: [
        "**.NET Core:** เทคโนโลยีที่บริษัทขนาดใหญ่เลือกใช้เพื่อสร้างระบบสำคัญที่ต้องการความเสถียรสูง",
        "**หลักสูตรจริงจัง:** Bootcamp C# .NET ของ Sprouting Tech คือหลักสูตรแบบ Full-Day Intensive + Internship 3 เดือน ที่จริงจังที่สุด",
      ],
    },
    designedFor: {
      title: "Bootcamp ของ Sprouting Tech ถูกออกแบบให้",
      items: [
        "**3 เดือนเรียนหนักแบบมืออาชีพ** (Full-Day Intensive)",
        "**3 เดือนฝึกงานจริง** กับโปรเจคระดับบริษัท",
        "ได้ใบจบ Bootcamp + **ใบผ่านงานจริง**",
        "มีโค้ชช่วย **Resume + Mock Interview** แบบเข้มข้น",
      ],
    },
    prerequisites: {
      title: "สิ่งที่ต้องมีก่อนเรียน",
      items: [
        "รู้พื้นฐาน HTML/CSS",
        "รู้จักโครงสร้างเว็บเบื้องต้น",
        "ใช้ Git/GitHub ขั้นพื้นฐานได้",
        "มีพื้นฐาน Programming เล็กน้อย",
      ],
    },
    bootcampBenefits: {
      title: "คุณจะได้อะไรจาก Bootcamp นี้?",
      subtitle: "Skills ที่ตลาดต้องการที่สุดครบทุกด้าน",
      items: [
        {
          id: "backend-development",
          title:
            "สร้างระบบหลังบ้านที่มั่นคงและมีประสิทธิภาพสูงด้วย C# และ .NET Core",
          items: [
            "เขียน C# แบบมืออาชีพ และประยุกต์ใช้หลักการ Object-Oriented Programming (OOP) ขั้นสูง",
            "พัฒนา Backend ด้วย .NET Core (หรือ .NET ล่าสุด) และออกแบบ REST API ตามมาตรฐานองค์กร",
            "การจัดการฐานข้อมูล SQL และใช้ Entity Framework Core (EF Core) เพื่อทำ Object-Relational Mapping",
          ],
        },
        {
          id: "frontend-development",
          title: "สร้างส่วนหน้าเว็บที่ทันสมัยและตอบโจทย์ผู้ใช้ด้วย React",
          items: [
            "เขียน Frontend ด้วย React (Component-Based Architecture) และการจัดการ State/Props",
            "การเชื่อมต่อระบบ Frontend (React) กับ Backend API (.NET) ให้สมบูรณ์ และการใช้ Library ช่วยในการออกแบบ UI",
          ],
        },
        {
          id: "deployment-production",
          title:
            "ทักษะด้าน Deployment และเครื่องมือที่ใช้ในการทำงานระดับ Production",
          items: [
            "ใช้ Git และ GitHub Workflow ตามแบบ Developer มือโปร",
            "เข้าใจ Docker, สร้าง Docker Image สำหรับแอปพลิเคชัน .NET และ React",
            "CI/CD และ Deploy ระบบขึ้น Cloud แบบ Production Ready",
          ],
        },
        {
          id: "real-world-experience",
          title: "Real-World Experience",
          items: [
            "ฝึกงานจริง 3 เดือน ในโปรเจคระดับองค์กร",
            "ได้ใบผ่านงาน (Experience Letter) ที่ใช้สมัครงานได้จริง",
            'ได้ทำระบบที่ "มีคนใช้จริง" ไม่ใช่แค่เว็บเล่น ๆ',
          ],
        },
        {
          id: "career-ready",
          title: "Career Ready เต็มรูปแบบ",
          items: [
            "สร้าง Portfolio ระดับสมัครงาน",
            "ช่วยทำ Resume ให้โดดเด่น",
            "Mock Interview แบบเข้มข้น",
            "เตรียมตัวสัมภาษณ์ทั้งไทยและต่างประเทศ",
            "รู้วิธีวางตัวและหาโอกาสงานบน Linkedin",
          ],
        },
        {
          id: "full-day-bootcamp",
          title: "Full-Day Bootcamp ตลอด 3 เดือน",
          items: [
            "เช้า = ทฤษฎีแบบลงลึก",
            "บ่าย = Workshop ทำจริง",
            "Project รายสัปดาห์",
            "Mini Full-Stack Projects",
            "Final Enterprise Project",
          ],
        },
      ],
    },
  },
];

// Helper function to get bootcamp by slug
export function getBootcampBySlug(slug: string): BootcampData | undefined {
  return bootcamps.find((bootcamp) => bootcamp.slug === slug);
}
