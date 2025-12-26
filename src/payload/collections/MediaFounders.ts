import type { CollectionConfig } from "payload";

const MediaFounders: CollectionConfig = {
  slug: "media-founders",
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

export default MediaFounders;
