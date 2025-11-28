import { z } from "zod";

export const quotationSchema = z.object({
  companyName: z.string().min(1, "กรุณากรอกชื่อบริษัท/องค์กร"),
  contactPersonName: z.string().min(1, "กรุณากรอกชื่อผู้ติดต่อ"),
  phone: z
    .string()
    .min(1, "กรุณากรอกเบอร์โทรศัพท์")
    .regex(/^[0-9-]+$/, "เบอร์โทรศัพท์ไม่ถูกต้อง"),
  email: z
    .string()
    .min(1, "กรุณากรอกอีเมล")
    .pipe(z.email({ message: "รูปแบบอีเมลไม่ถูกต้อง" })),
  courses: z
    .array(z.string())
    .min(1, "กรุณาเลือกคอร์สที่สนใจอย่างน้อย 1 คอร์ส"),
  numberOfStudents: z
    .string()
    .min(1, "กรุณากรอกจำนวนผู้เรียน")
    .regex(/^\d+/, "จำนวนผู้เรียนต้องเป็นตัวเลข"),
  budget: z.string().optional(),
  additionalDetails: z.string().optional(),
});

export type QuotationFormData = z.infer<typeof quotationSchema>;
