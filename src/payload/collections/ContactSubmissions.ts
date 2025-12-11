import type { CollectionConfig } from "payload";

const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "company", "status", "createdAt"],
    description: "ข้อมูลการติดต่อจากลูกค้า",
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      label: "ชื่อ",
      type: "text",
      required: true,
    },
    {
      name: "company",
      label: "บริษัท",
      type: "text",
    },
    {
      name: "email",
      label: "อีเมล",
      type: "email",
      required: true,
    },
    {
      name: "message",
      label: "ข้อความ",
      type: "textarea",
      required: true,
    },
    {
      name: "status",
      label: "สถานะ",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "รอดำเนินการ", value: "pending" },
        { label: "ติดต่อแล้ว", value: "contacted" },
        { label: "เสร็จสิ้น", value: "completed" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "notes",
      label: "บันทึกจากแอดมิน",
      type: "textarea",
      admin: {
        position: "sidebar",
        description: "บันทึกสำหรับการติดตาม",
      },
    },
  ],
  timestamps: true,
};

export default ContactSubmissions;
