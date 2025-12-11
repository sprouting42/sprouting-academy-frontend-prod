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
    {
      name: "banner",
      type: "select",
      required: false,
      options: [
        { label: "E-book", value: "ebook" },
        { label: "Course", value: "course" },
      ],
    },
  ],
  upload: true,
};

export default MediaBanner;
