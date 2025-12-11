import { z } from "zod";

export const profileEditSchema = z.object({
  fullName: z.string().min(1, "กรุณากรอกชื่อ-นามสกุล"),
  nickname: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9-]+$/.test(val), "เบอร์โทรศัพท์ไม่ถูกต้อง"),
  email: z.string().optional(),
  avatarUrl: z.url().optional().or(z.literal("")),
});

export type ProfileEditFormData = z.infer<typeof profileEditSchema>;
