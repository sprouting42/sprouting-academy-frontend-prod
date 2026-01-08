import type { CollectionConfig } from "payload";

const MentorFormSubmission: CollectionConfig = {
  slug: "mentor-form-submissions",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "status", "createdAt"],
    description: "ข้อมูลการสมัครเป็น Mentor",
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

export default MentorFormSubmission;
