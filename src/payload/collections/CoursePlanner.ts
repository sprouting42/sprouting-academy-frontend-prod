import type { CollectionConfig } from "payload";

const CoursePlanner: CollectionConfig = {
  slug: "course-planner",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "ชื่อผู้วางแผนหลักสูตร",
      required: true,
      admin: {
        description: "ชื่อของผู้วางแผนหลักสูตร",
      },
    },
    {
      name: "role",
      type: "text",
      label: "ตำแหน่ง / บทบาท",
      required: false,
      admin: {
        description: "คำอธิบายของผู้วางแผนหลักสูตร",
      },
    },
    {
      name: "info",
      type: "text",
      label: "ข้อมูลเพิ่มเติม",
      required: false,
      admin: {
        description: "ข้อมูลของผู้วางแผนหลักสูตร",
      },
    },
    {
      name: "profileImage",
      type: "upload",
      label: "Profile Image",
      required: false,
      relationTo: ["media-bootcamp"],
    },
  ],
};

export default CoursePlanner;
