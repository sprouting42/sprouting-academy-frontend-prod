import type { CollectionConfig } from "payload";

const MediaInstructors: CollectionConfig = {
  slug: "media-instructors",
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

export default MediaInstructors;
