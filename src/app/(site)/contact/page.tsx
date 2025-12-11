import React from "react";

import CompanyDetail from "@/components/card/contactCard/companyDetail";
import ContactForm from "@/components/card/contactCard/contactForm";

export default function ContactPage() {
  return (
    <div className="md:px-28 px-4">
      <h1 className="bg-clip-text bg-gradient-to-r font-bold font-prompt from-primary md:text-[1.75rem] mt-48 text-[1.375rem] text-transparent to-secondary w-fit">
        มีคำถาม? เราพร้อมให้คำตอบ
      </h1>
      <p className="font-normal font-prompt mb-16 md:text-[1.375rem] md:w-1/2 mt-4 text-base w-full">
        ไม่ว่าคุณจะลังเลเรื่องการเลือกคอร์ส, สงสัยเกี่ยวกับ Bootcamp,
        หรือต้องการโซลูชันสำหรับองค์กร ทีมงาน Sprouting Tech พร้อมดูแลคุณ
      </p>

      <CompanyDetail />

      <h3 className="[html[data-theme='dark']_&]:text-secondary [html[data-theme='light']_&]:text-primary font-medium font-prompt mb-6 md:text-[1.375rem] mt-16 text-base">
        กรอกแบบฟอร์มด้านล่างเพื่อเริ่มต้นการพูดคุยกับทีมผู้เชี่ยวชาญของเรา
      </h3>

      <ContactForm />
    </div>
  );
}
