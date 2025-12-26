import type { CollectionConfig } from "payload";

const Founders: CollectionConfig = {
  slug: "founders",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media-founders",
      required: false,
    },
    {
      name: "information",
      type: "textarea",
      required: false,
    },
  ],
};

export default Founders;
