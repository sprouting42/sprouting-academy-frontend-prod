import { Course } from "@/enum/course";

export interface BootcampCardData {
  id: string;
  src: Course;
  alt: string;
  title: string;
  description: string;
  bulletPoints: string[];
  imageBadgeText: string;
  classType: string;
  textButton: string;
  link: string;
}

export const bootcampsData: BootcampCardData[] = [
  {
    id: "basic-html-css-bootcamp",
    src: Course.BASIC_HTML_CSS_BOOTCAMP,
    alt: "Basic HTML & CSS Bootcamp",
    title: "Basic HTML & CSS Bootcamp",
    description:
      "เหมาะสำหรับผู้เริ่มต้นสาย Web Dev และนักศึกษาที่ต้องการ Portfolio แรก",
    bulletPoints: [
      "ระยะเวลา 7-14 วันสามารถสร้าง Landing Page และ Personal Portfolio Website ได้เอง 100% พร้อมเข้าใจ Flexbox & Grid",
    ],
    imageBadgeText: "รับเพียง 10 ที่นั่ง",
    classType: "Online Bootcamp",
    textButton: "ดูรายละเอียด",
    link: "/bootcamps/basic-html",
  },
  {
    id: "java-springboot-bootcamp",
    src: Course.JAVA_SPRINGBOOT_BOOTCAMP,
    alt: "Java Spring Boot Full Stack Developer Bootcamp",
    title: "Java Spring Boot Full Stack Developer Bootcamp",
    description:
      "เหมาะสำหรับผู้ที่อยากเป็น Full Stack Developer สาย Java, นักศึกษาจบใหม่",
    bulletPoints: [
      "ระยะเวลาเรียน 12 สัปดาห์ + ฝึกงาน 12 สัปดาห์",
      "Stack: Java, Spring Boot, React",
      "สามารถสร้าง RESTful API, เชื่อมต่อ React Frontend, Deploy ระบบจริงบน Cloud (Docker/CI/CD)",
    ],
    imageBadgeText: "รับเพียง 10 ที่นั่ง",
    classType: "Online Bootcamp",
    textButton: "ดูรายละเอียด",
    link: "/bootcamps/java-spring-boot",
  },
  {
    id: "c-sharp-bootcamp",
    src: Course.C_SHARP_BOOTCAMP,
    alt: "C# .NET Core Full Stack Developer Bootcamp",
    title: "C# .NET Core Full Stack Developer Bootcamp",
    description:
      "เหมาะสำหรับผู้ที่อยากทำงานในสาย System Dev/องค์กร, ผู้ที่อยากเปลี่ยนสายอาชีพ",
    bulletPoints: [
      "ระยะเวลาเรียน 12 สัปดาห์ + ฝึกงาน 12 สัปดาห์",
      "Stack: C#, .NET Core 8, React",
      "สามารถสร้าง Enterprise Web App ด้วย .NET Core + Entity Framework, เข้าใจระบบ Auth ระดับองค์กร",
    ],
    imageBadgeText: "รับเพียง 10 ที่นั่ง",
    classType: "Online Bootcamp",
    textButton: "ดูรายละเอียด",
    link: "/bootcamps/csharp-net-core",
  },
];
