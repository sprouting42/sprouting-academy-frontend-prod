import type { CollectionConfig } from "payload";

const Instructors: CollectionConfig = {
  slug: "instructors",
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
      relationTo: "media-instructors",
      required: false,
    },
    {
      name: "information",
      type: "textarea",
      required: false,
    },
  ],
};

export default Instructors;
