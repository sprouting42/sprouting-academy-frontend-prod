import type { CollectionConfig } from "payload";

import type { CourseDetail } from "../payload-types";
import { validatePositiveNumber } from "../utils/validatePositiveNumber";
import { validateUniqueRelationship } from "../utils/validateUniqueRelationship";

const CourseDetail: CollectionConfig = {
  slug: "course-detail",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "courses",
      type: "relationship",
      relationTo: "courses",
      required: true,
      hasMany: true,
      validate: validateUniqueRelationship({
        collection: "course-detail",
        field: "courses",
        displayCollection: "courses",
        displayField: "coursesTitle",
        errorMessage: (names) =>
          `Course "${names}" มี Course Detail อยู่แล้ว กรุณาเลือก Course อื่น`,
      }),
    },
    {
      name: "titleText",
      type: "text",
      required: false,
    },
    {
      name: "courseBenefit",
      type: "textarea",
      required: false,
    },
    {
      name: "courseTopics",
      type: "array",
      required: false,
      fields: [
        {
          name: "topic",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "caseStudies",
      type: "array",
      required: false,
      fields: [
        {
          name: "caseStudy",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "classType",
      type: "text",
      required: false,
    },
    {
      name: "totalClass",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: {
        description: "จำนวนครั้งในการเรียน",
      },
      validate: validatePositiveNumber(
        "จำนวนครั้งในการเรียนต้องเป็นค่าบวกเท่านั้น",
      ),
    },
    {
      name: "totalTimesCourse",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: {
        description: "เวลารวมของคอร์ส คิดเป็นชั่วโมง",
      },
      validate: validatePositiveNumber("เวลารวมของคอร์สต้องเป็นค่าบวกเท่านั้น"),
    },
    {
      name: "instructor",
      type: "relationship",
      relationTo: "instructors",
      required: false,
    },
  ],
};

export default CourseDetail;
