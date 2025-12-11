import type { CollectionConfig } from "payload";

const MediaEbook: CollectionConfig = {
  slug: "media-ebook",
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

export default MediaEbook;
