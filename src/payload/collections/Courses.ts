import type { CollectionConfig } from "payload";

import { validateDateAfter } from "../utils/validateDateAfterStartDate";

const Courses: CollectionConfig = {
  slug: "courses",
  admin: {
    useAsTitle: "coursesTitle",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "coursesTitle",
      type: "text",
      required: true,
    },

    {
      name: "coursesSubtitle",
      type: "text",
      required: true,
    },
    {
      name: "coursesCoverImage",
      type: "upload",
      label: "Courses Cover Image",
      admin: {
        description: "รูปภาพหน้าปกของคอร์ส",
      },
      relationTo: ["media-course", "media-instructors"],
      required: true,
    },
    {
      name: "detailsBulletPoints",
      type: "array",
      required: false,
      fields: [
        {
          name: "bulletPoint",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "normalPrice",
      type: "number",
      required: true,
      label: "Normal Price",
    },
    {
      name: "earlyBirdPrice",
      type: "group",
      label: "Early Bird Price",
      fields: [
        {
          name: "price",
          type: "number",
          required: false,
          label: "Early Bird Price",
        },
        {
          name: "startDate",
          type: "date",
          required: false,
          label: "Early Bird Start Date",
          admin: {
            description: "วันที่เริ่มต้น Early Bird Price",
          },
        },
        {
          name: "endDate",
          type: "date",
          required: false,
          label: "Early Bird End Date",
          admin: {
            description: "วันที่สิ้นสุด Early Bird Price",
          },
          validate: validateDateAfter(
            "startDate",
            "วันที่สิ้นสุด Early Bird Price ต้องอยู่หลังวันที่เริ่มต้น",
          ),
        },
      ],
    },
    {
      name: "coursesDate",
      type: "date",
      admin: {
        description: "งดใช้งานชั่วคราว",
      },
      required: false,
      validate: validateDateAfter(
        "earlyBirdPrice.endDate",
        "วันที่คอร์สต้องอยู่หลังวันที่สิ้นสุด Early Bird Price",
      ),
    },
    {
      name: "coverBadgeText",
      type: "text",
      required: false,
    },
    {
      name: "courseStatus",
      type: "checkbox",
      label: "Active",
      defaultValue: false,
      admin: {
        description: "Check to set the course status to Active",
      },
    },
    {
      name: "courseDateSelector",
      type: "array",
      label: "Course Date สำหรับเลือกวันที่เรียน",
      admin: {
        description: "เพิ่มวันที่เปิดสอน",
      },
      fields: [
        {
          name: "date",
          label: "วันที่เรียน",
          type: "date",
          required: true,
        },
      ],
    },
  ],
};

export default Courses;
