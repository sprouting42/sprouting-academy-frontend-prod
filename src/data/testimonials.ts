export interface TestimonialData {
  id: string;
  testimonialText: string;
  testimonialName: string;
  testimonialPosition: string;
  testimonialImage: string;
  testimonialRating: number;
}

export const testimonials: TestimonialData[] = [
  {
    id: "natthakit-saetan",
    testimonialText:
      "เนื้อหาออกแบบมาให้คนที่ไม่เคยเขียนโค้ดเข้าใจได้ง่าย สามารถนำไปสร้างระบบ Workflow อัตโนมัติได้จริง ๆ 🤩",
    testimonialName: "Passawit Rungpichayanukul",
    testimonialPosition: "Student",
    testimonialImage: "/avartar.png",
    testimonialRating: 5,
  },
  {
    id: "arisa-kaewsuan",
    testimonialText:
      "ก่อนเรียนคิดว่า AI Automation เป็นเรื่องยุ่งยากและซับซ้อนมากแต่พอมาเรียนคอร์สนี้แล้ว รู้สึกเข้าใจง่าย ทำให้คุณสามารถเข้าใจ AI Automation มากขึ้นว่ามันคืออะไรและจะเอามาใช้กับงานจริงได้ยังไง",
    testimonialName: "Arisa Kaewsuan",
    testimonialPosition: "Product Manager",
    testimonialImage: "/avartar.png",
    testimonialRating: 5,
  },
  {
    id: "phichaya-kinggate",
    testimonialText:
      "ลงเรียนเพราะต้องการ ลดงาน Routine และตอนนี้ก็มีระบบอัตโนมัติทำงานแทนได้แล้ว สามารถสร้าง Workflow บน Make.com ให้ AI ทำงานได้ชาญฉลาดสุด ๆ ทั้ง คิด Content, เจนรูป และจัดการ โพสต์ลงเพจได้ทุกวัน รู้สึกคุ้มค่ามากๆ",
    testimonialName: "Phichaya Kinggate",
    testimonialPosition: "Marketing",
    testimonialImage: "/avartar.png",
    testimonialRating: 5,
  },
];
