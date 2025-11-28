import type { CollectionConfig } from "payload";

const Admin: CollectionConfig = {
  slug: "admin",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};

export default Admin;
