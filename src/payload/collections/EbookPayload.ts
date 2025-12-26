import type { CollectionConfig } from "payload";

const Ebook: CollectionConfig = {
  slug: "ebooks",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "ebookId",
      type: "text",
      required: true,
      unique: true,
      label: "Ebook ID",
      admin: {
        description: "ID ที่ใช้ระบุ ebook (เช่น ebook-advanced-n8n)",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      label: "Cover Image",
      admin: {
        description: "รูปภาพหน้าปกของ ebook",
      },
      relationTo: ["media-ebook"],
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
      label: "Title",
      admin: {
        description: "ชื่อของ ebook",
      },
    },
    {
      name: "description",
      type: "text",
      required: true,
      label: "Description",
      admin: {
        description: "คำอธิบายเกี่ยวกับ ebook",
      },
    },
    {
      name: "price",
      type: "number",
      required: false,
      label: "Price",
      admin: {
        description: "ราคาของ ebook",
      },
    },
    {
      name: "imageBadgeText",
      type: "text",
      required: false,
      label: "Image Badge Text",
      admin: {
        description: "ข้อความที่แสดงบน badge ของรูปภาพ (เช่น n8n, Make)",
      },
    },
    {
      name: "textButton",
      type: "text",
      required: false,
      label: "Button Text",
      admin: {
        description: "ข้อความบนปุ่ม (เช่น สั่งซื้อ)",
      },
      defaultValue: "สั่งซื้อ",
    },
    {
      name: "link",
      type: "text",
      required: false,
      label: "Link",
      admin: {
        description: "ลิงก์ไปยังหน้าสั่งซื้อ",
      },
    },
    {
      name: "bulletPoints",
      type: "array",
      required: false,
      label: "Bullet Points",
      admin: {
        description: "optional",
      },
      fields: [
        {
          name: "bulletPoint",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "ebookpage",
      type: "number",
      required: false,
      label: "Ebook Page",
      admin: {
        description: "จำนวนหน้าของ ebook",
      },
    },
    {
      name: "downloadUrl",
      type: "text",
      required: false,
      label: "Download URL",
      admin: {
        description:
          "ลิงก์ดาวน์โหลด ebook จาก Google Drive หรือแหล่งอื่น\n" +
          "สำหรับ Google Drive:\n" +
          "1. ตั้งค่าไฟล์เป็น 'Anyone with the link' (ไม่ใช่ restrict)\n" +
          "2. ใส่ share link (https://drive.google.com/file/d/FILE_ID/view?usp=sharing)\n" +
          "3. ระบบจะแปลงเป็น direct download link อัตโนมัติ",
      },
    },
    {
      name: "category",
      type: "select",
      required: false,
      label: "Category",
      options: [
        { label: "Advanced Automation", value: "advanced-automation" },
        { label: "Make for Business", value: "make-for-business" },
      ],
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Active",
      defaultValue: true,
      admin: {
        description: "Check to set the ebook status to Active",
      },
    },
  ],
};

export default Ebook;
