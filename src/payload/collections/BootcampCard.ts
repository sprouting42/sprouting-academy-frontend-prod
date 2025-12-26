import type { CollectionConfig } from "payload";

const BootcampCard: CollectionConfig = {
  slug: "bootcamp-cards",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "BootcampTitle",
    defaultColumns: ["BootcampTitle", "classType", "imageBadgeText"],
  },
  fields: [
    {
      name: "BootcampImage",
      type: "upload",
      relationTo: "media-bootcamp",
      required: false,
      label: "Bootcamp Cover Image",
    },
    {
      name: "BootcampTitle",
      type: "text",
      required: false,
      label: "Bootcamp Title",
    },
    {
      name: "BootcampDescription",
      type: "text",
      required: false,
      label: "Bootcamp Description",
    },
    {
      name: "BootcampBulletPoints",
      type: "array",
      label: "Bootcamp Bullet Points",
      fields: [
        {
          name: "id",
          type: "text",
          required: true,
          defaultValue: () => crypto.randomUUID(),
          admin: {
            description: "ID ระบุตัวตนของรายการนี้ (สร้างอัตโนมัติเป็น UUID)",
            readOnly: true,
          },
        },
        {
          name: "BootcampBulletText",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "imageBadgeText",
      type: "text",
      required: false,
      label: "Image Badge Text",
    },
    {
      name: "classType",
      type: "text",
      required: false,
      label: "Class Type",
    },
    {
      name: "link",
      type: "relationship",
      relationTo: "bootcamp-page",
      required: true,
      label: "Link",
      admin: {
        description: "เลือก Bootcamp Page ที่ต้องการลิงก์ไป",
      },
    },
    {
      name: "price",
      type: "number",
      required: true,
      label: "Price",
    },
    {
      name: "cardStatus",
      type: "checkbox",
      label: "Show Card & Page",
      defaultValue: false,
      admin: {
        description: "เมื่อเปิดจะแสดงทั้ง Card และ Page",
      },
    },
  ],
};

export default BootcampCard;
