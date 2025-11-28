import type { CollectionConfig } from "payload";

const MediaCourse: CollectionConfig = {
  slug: "media-course",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};

export default MediaCourse;
