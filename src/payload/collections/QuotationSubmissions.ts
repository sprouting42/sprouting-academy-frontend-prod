import type { CollectionConfig } from "payload";

const QuotationSubmissions: CollectionConfig = {
  slug: "quotation-submissions",
  admin: {
    useAsTitle: "companyName",
    defaultColumns: [
      "companyName",
      "contactPersonName",
      "email",
      "status",
      "createdAt",
    ],
    description: "ข้อมูลการขอใบเสนอราคาจากลูกค้า",
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "companyName",
      label: "ชื่อบริษัท/องค์กร",
      type: "text",
      required: true,
    },
    {
      name: "contactPersonName",
      label: "ชื่อผู้ติดต่อ",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      label: "เบอร์โทรศัพท์",
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
      name: "courses",
      label: "คอร์สที่สนใจ",
      type: "array",
      required: true,
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: "courseId",
          label: "คอร์ส",
          type: "relationship",
          relationTo: "courses",
          required: true,
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: "numberOfStudents",
      label: "จำนวนผู้เรียนโดยประมาณ",
      type: "text",
      required: true,
    },
    {
      name: "budget",
      label: "งบประมาณโดยประมาณ",
      type: "text",
    },
    {
      name: "additionalDetails",
      label: "รายละเอียดเพิ่มเติม",
      type: "textarea",
    },
    {
      name: "status",
      label: "สถานะ",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "รอดำเนินการ", value: "pending" },
        { label: "ติดต่อแล้ว", value: "contacted" },
        { label: "ส่งใบเสนอราคาแล้ว", value: "quoted" },
        { label: "เสร็จสิ้น", value: "completed" },
        { label: "ยกเลิก", value: "cancelled" },
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

export default QuotationSubmissions;
