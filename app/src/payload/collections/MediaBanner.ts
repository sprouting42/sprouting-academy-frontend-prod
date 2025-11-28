import type { CollectionConfig } from "payload";

const MediaBanner: CollectionConfig = {
  slug: "media-banner",
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

export default MediaBanner;
