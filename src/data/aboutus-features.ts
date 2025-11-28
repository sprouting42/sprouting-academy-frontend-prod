export interface AboutUsFeature {
  id: string;
  iconSrc: string;
  iconAlt: string;
  title: string;
  subtitle: string;
  description: string;
}

export const aboutUsFeatures: AboutUsFeature[] = [
  {
    id: "real-world-practicality",
    iconSrc: "/icons/gear.svg",
    iconAlt: "Real-World Practicality",
    title: "Real-World Practicality",
    subtitle: "เน้นปฏิบัติจริง",
    description:
      "เราไม่สอนแค่ท่องจำ แต่เน้น Workshop ที่จำลองระบบงานจริงจากบริษัทชั้นนำ เพื่อให้คุณคุ้นเคยกับการแก้ปัญหาหน้างาน",
  },
  {
    id: "mentorship-support",
    iconSrc: "/icons/group44.svg",
    iconAlt: "Mentorship & Support",
    title: "Mentorship & Support",
    subtitle: "ดูแลเหมือนทีมเดียวกัน",
    description:
      "การเรียนรู้เทคโนโลยีอาจยากและท้อแท้ เราจึงมีระบบ Mentorship ที่ดูแลใกล้ชิด คอย Code Review และให้คำแนะนำเหมือนรุ่นพี่ดูแลรุ่นน้อง",
  },
  {
    id: "future-proof-skills",
    iconSrc: "/icons/group46.svg",
    iconAlt: "Future-Proof Skills",
    title: "Future-Proof Skills",
    subtitle: "ทักษะแห่งอนาคต",
    description:
      "หลักสูตรของเราอัปเดตตลอดเวลา ทั้ง AI Automation ล่าสุด และ Web Stack (Java Spring Boot / .NET Core) ที่เป็นที่ต้องการสูงสุดในตลาด Enterprise",
  },
];
