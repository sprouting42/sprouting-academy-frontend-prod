import type { CollectionConfig } from "payload";

const BootcampPage: CollectionConfig = {
  slug: "bootcamp-page",
  admin: {
    useAsTitle: "slug",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      //slug text
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          "URL slug สำหรับ bootcamp นี้ (เช่น: basic-html, java-spring-boot)",
      },
    },
    {
      //hero group
      name: "hero",
      type: "group",
      label: "Hero Section",
      admin: {
        description:
          "ส่วนหัวของหน้า bootcamp ที่แสดงรูปภาพ, หัวข้อ, คำอธิบาย และปุ่มต่างๆ",
      },
      fields: [
        {
          name: "bootcampCoverImage",
          type: "upload",
          label: "Bootcamp Cover Image",
          required: true,
          relationTo: ["media-bootcamp"],
        },
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description: "หัวข้อหลักของ bootcamp",
          },
        },
        {
          name: "description",
          type: "text",
          required: true,
          admin: {
            description: "คำอธิบายสั้นๆ ของ bootcamp",
          },
        },
        {
          name: "buttonItems",
          type: "array",
          required: true,
          minRows: 1,
          admin: {
            description:
              "รายการปุ่มที่แสดงในส่วน hero (เช่น: ปุ่มลงทะเบียน, ปุ่มดูรายละเอียด)",
          },
          fields: [
            {
              name: "id",
              type: "text",
              required: true,
              defaultValue: () => crypto.randomUUID(),
              admin: {
                description:
                  "ID ระบุตัวตนของรายการนี้ (สร้างอัตโนมัติเป็น UUID)",
                readOnly: true,
              },
            },
            {
              name: "text",
              type: "text",
              required: true,
              admin: {
                description: "ข้อความที่แสดงบนปุ่ม",
              },
            },
            {
              name: "link",
              type: "text",
              required: true,
              admin: {
                description:
                  "URL หรือ path ที่ปุ่มจะลิงก์ไป (เช่น: /courses, /register)",
              },
            },
          ],
        },
      ],
    },
    {
      //ทำไมต้องเรียน
      name: "whyStudy",
      type: "group",
      label: "ทำไมต้องเรียน",
      required: false,
      admin: {
        description: "ส่วนที่อธิบายว่าทำไมต้องเรียน bootcamp นี้ (optional)",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: false,
          admin: {
            description: "หัวข้อของส่วนนี้ (เช่น: ทำไมต้องเรียน)",
          },
        },
        {
          name: "bulletPoints",
          type: "array",
          required: false,
          minRows: 1,
          admin: {
            description: "รายการทำไมต้องเรียน bootcamp นี้",
          },
          fields: [
            {
              name: "id",
              type: "text",
              required: true,
              defaultValue: () => crypto.randomUUID(),
              admin: {
                description:
                  "ID ระบุตัวตนของรายการนี้ (สร้างอัตโนมัติเป็น UUID)",
                readOnly: true,
              },
            },
            {
              name: "item",
              type: "text",
              required: false,
              admin: {
                description: "รายการ (รองรับ markdown เช่น **bold**)",
              },
            },
          ],
        },
      ],
    },
    {
      //พื้นฐานสู่สายเทค
      name: "designedFor",
      type: "group",
      label: "Bootcamp ถูกออกแบบให้",
      required: false,
      admin: {
        description:
          "ส่วนที่อธิบายว่า bootcamp ถูกออกแบบมาเพื่ออะไร (optional)",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: false,
          admin: {
            description:
              "หัวข้อของส่วนนี้ (เช่น: Bootcamp ของ Sprouting Tech ถูกออกแบบให้)",
          },
        },
        {
          name: "bulletPoints",
          type: "array",
          required: false,
          minRows: 1,
          admin: {
            description: "รายการจุดประสงค์ของการออกแบบ bootcamp",
          },
          fields: [
            {
              name: "id",
              type: "text",
              required: true,
              defaultValue: () => crypto.randomUUID(),
              admin: {
                description:
                  "ID ระบุตัวตนของรายการนี้ (สร้างอัตโนมัติเป็น UUID)",
                readOnly: true,
              },
            },
            {
              name: "item",
              type: "text",
              required: false,
              admin: {
                description: "รายการ (รองรับ markdown เช่น **bold**)",
              },
            },
          ],
        },
      ],
    },
    {
      //สิ่งที่ต้องมีก่อนเรียน
      name: "prerequirements",
      type: "group",
      label: "สิ่งที่ต้องมีก่อนเรียน",
      required: false,
      admin: {
        description:
          "ส่วนที่ระบุข้อกำหนดหรือสิ่งที่ผู้เรียนต้องมีก่อนเริ่มเรียน (optional)",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: false,
          admin: {
            description: "หัวข้อของส่วนนี้ (เช่น: สิ่งที่ต้องมีก่อนเรียน)",
          },
        },
        {
          name: "bulletPoints",
          type: "array",
          required: false,
          minRows: 1,
          admin: {
            description: "รายการข้อกำหนดหรือสิ่งที่ต้องมีก่อนเรียน",
          },
          fields: [
            {
              name: "id",
              type: "text",
              required: true,
              defaultValue: () => crypto.randomUUID(),
              admin: {
                description:
                  "ID ระบุตัวตนของรายการนี้ (สร้างอัตโนมัติเป็น UUID)",
                readOnly: true,
              },
            },
            {
              name: "item",
              type: "text",
              required: false,
              admin: {
                description:
                  "รายละเอียดของข้อกำหนด (เช่น: รู้พื้นฐาน HTML/CSS)",
              },
            },
          ],
        },
      ],
    },
    {
      //คุณจะได้อะไรจาก Bootcamp นี้
      name: "bootcampBenefits",
      type: "group",
      label: "คุณจะได้อะไรจาก Bootcamp นี้",
      required: false,
      admin: {
        description:
          "ส่วนที่แสดงรายละเอียดประโยชน์และสิ่งที่ผู้เรียนจะได้รับจาก bootcamp แบ่งเป็นหมวดหมู่ (optional)",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description:
              "หัวข้อหลักของส่วนนี้ (เช่น: คุณจะได้อะไรจาก Bootcamp นี้?)",
          },
        },
        {
          name: "subtitle",
          type: "text",
          required: true,
          admin: {
            description:
              "หัวข้อย่อยหรือคำอธิบายเพิ่มเติม (เช่น: Skills ที่ตลาดต้องการที่สุดครบทุกด้าน)",
          },
        },
        {
          name: "items",
          type: "array",
          required: true,
          minRows: 1,
          admin: {
            description: "รายการหมวดหมู่ของประโยชน์ที่ผู้เรียนจะได้รับ",
          },
          fields: [
            {
              name: "id",
              type: "text",
              required: true,
              defaultValue: () => crypto.randomUUID(),
              admin: {
                description:
                  "Unique ID สำหรับ benefit นี้ (สร้างอัตโนมัติเป็น UUID)",
                readOnly: true,
              },
            },
            {
              name: "title",
              type: "text",
              required: true,
              admin: {
                description:
                  "หัวข้อของ benefit หมวดหมู่นี้ (เช่น: สร้างระบบหลังบ้านที่มั่นคงด้วย Java)",
              },
            },
            {
              name: "items",
              type: "array",
              required: true,
              minRows: 1,
              admin: {
                description: "รายการรายละเอียดของ benefit ในหมวดหมู่นี้",
              },
              fields: [
                {
                  name: "item",
                  type: "text",
                  required: true,
                  admin: {
                    description:
                      "รายละเอียดของ benefit (เช่น: เขียน Java มาตรฐานบริษัทใหญ่)",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      //เหมาะสำหรับใคร
      name: "suitableFor",
      type: "group",
      label: "เหมาะสำหรับ",
      admin: {
        description: "ส่วนที่ระบุว่า bootcamp นี้เหมาะสำหรับใครบ้าง",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description: "หัวข้อของส่วนนี้ (เช่น: เหมาะสำหรับ)",
          },
        },
        {
          name: "items",
          type: "array",
          required: true,
          minRows: 1,
          admin: {
            description: "รายการกลุ่มเป้าหมายที่เหมาะกับ bootcamp นี้",
          },
          fields: [
            {
              name: "id",
              type: "text",
              required: true,
              defaultValue: () => crypto.randomUUID(),
              admin: {
                description:
                  "ID ระบุตัวตนของรายการนี้ (สร้างอัตโนมัติเป็น UUID)",
                readOnly: true,
              },
            },
            {
              name: "item",
              type: "text",
              required: true,
              admin: {
                description:
                  "รายละเอียดของกลุ่มเป้าหมาย (เช่น: ผู้เริ่มต้นสาย Web Dev)",
              },
            },
          ],
        },
      ],
    },
    {
      //ผลลัพธ์
      name: "outcomes",
      type: "group",
      label: "ผลลัพธ์",
      admin: {
        description:
          "ส่วนที่ระบุผลลัพธ์หรือสิ่งที่ผู้เรียนจะได้รับหลังจากจบ bootcamp",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description: "หัวข้อของส่วนนี้ (เช่น: ผลลัพธ์)",
          },
        },
        {
          name: "items",
          type: "array",
          required: true,
          minRows: 1,
          admin: {
            description: "รายการผลลัพธ์ที่ผู้เรียนจะได้รับ",
          },
          fields: [
            {
              name: "id",
              type: "text",
              required: true,
              defaultValue: () => crypto.randomUUID(),
              admin: {
                description:
                  "ID ระบุตัวตนของรายการนี้ (สร้างอัตโนมัติเป็น UUID)",
                readOnly: true,
              },
            },
            {
              name: "item",
              type: "text",
              required: true,
              admin: {
                description:
                  "รายละเอียดของผลลัพธ์ (เช่น: เข้าใจโครงสร้าง HTML5)",
              },
            },
          ],
        },
      ],
    },
    {
      //courseOutline group
      name: "courseOutline",
      type: "array",
      required: false,
      minRows: 1,
      label: "Phases / ระยะเวลา",
      admin: {
        description:
          "รายการ phases หรือช่วงเวลาของ bootcamp พร้อมหัวข้อที่เรียนในแต่ละ phase",
      },

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
          name: "phase",
          type: "text",
          required: true,
          admin: {
            description:
              "ชื่อ phase หรือช่วงเวลา (เช่น: Phase 1: Foundation, วันที่ 1-3)",
          },
        },
        {
          name: "topic",
          type: "text",
          required: true,
          admin: {
            description: "หัวข้อหรือเนื้อหาของ phase นี้",
          },
        },
      ],
    },
    {
      //toolstack group
      name: "toolStack",
      type: "group",
      label: "Tools & Stack",
      admin: {
        description: "ส่วนที่แสดงเครื่องมือและเทคโนโลยีที่ใช้ใน bootcamp นี้",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description:
              "หัวข้อของส่วนนี้ (เช่น: Tools & Stack ที่จะได้ใช้จริง)",
          },
        },
        {
          name: "stackImages",
          type: "array",
          required: true,
          minRows: 1,
          admin: {
            description: "รายการ logo หรือ icon ของเครื่องมือและเทคโนโลยี",
          },
          fields: [
            {
              name: "id",
              type: "text",
              required: true,
              defaultValue: () => crypto.randomUUID(),
              admin: {
                description:
                  "ID ระบุตัวตนของรายการนี้ (สร้างอัตโนมัติเป็น UUID)",
                readOnly: true,
              },
            },
            {
              name: "src",
              type: "upload",
              required: true,
              relationTo: ["media-bootcamp"],
              admin: {
                description: "Path ของ logo หรือ icon",
              },
            },
          ],
        },
      ],
    },
    {
      //ผู้วางแผนหลักสูตร
      name: "coursePlanner",
      type: "relationship",
      relationTo: "course-planner",
      hasMany: true,
      label: "ผู้วางแผนหลักสูตร",
      required: false,
      admin: {
        description:
          "เลือกผู้วางแผนหลักสูตรสำหรับ bootcamp นี้ (เลือกได้หลายคน)",
      },
    },
  ],
};

export default BootcampPage;
