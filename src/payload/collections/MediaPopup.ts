import type { CollectionConfig } from "payload";

const MediaPopup: CollectionConfig = {
  slug: "media-popup",
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
      type: "row",
      fields: [
        {
          name: "content",
          type: "select",
          required: true,
          defaultValue: "other",
          options: [
            { label: "n8n", value: "n8n" },
            { label: "bootcamp", value: "bootcamp" },
            { label: "course", value: "course" },
            { label: "other", value: "other" },
          ],
        },
      ],
    },
    {
      name: "activePopup",
      label: "Active Popup",
      type: "checkbox",
      defaultValue: false,
    },
  ],
  upload: true,
};

export default MediaPopup;
