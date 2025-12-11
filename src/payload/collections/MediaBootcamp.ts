import type { CollectionConfig } from "payload";

const MediaBootcamp: CollectionConfig = {
  slug: "media-bootcamp",
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

export default MediaBootcamp;
