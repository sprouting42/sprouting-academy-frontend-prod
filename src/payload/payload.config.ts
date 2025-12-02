import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import Admin from "./collections/Admin.ts";
import CourseDetail from "./collections/CourseDetail.ts";
import Courses from "./collections/Courses.ts";
import Instructors from "./collections/Instructors.ts";
import MediaBanner from "./collections/MediaBanner.ts";
import MediaCourse from "./collections/MediaCourse.ts";
import MediaInstructors from "./collections/MediaInstructors.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Admin.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Admin,
    Courses,
    CourseDetail,
    Instructors,
    MediaCourse,
    MediaInstructors,
    MediaBanner,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    },
    schemaName: "payload",
    migrationDir: path.resolve(dirname, "migrations"),
    idType: "uuid",
  }),

  sharp,
  plugins: [
    s3Storage({
      collections: {
        "media-instructors": { prefix: "instructors" },
        "media-course": { prefix: "courses" },
        "media-banner": { prefix: "banner" },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        region: process.env.S3_REGION || "",
        endpoint: process.env.S3_ENDPOINT,
      },
    }),
  ],
  maxDepth: 2,
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
  ].filter(Boolean),
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
  ].filter(Boolean),
});
