import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import Admin from "./collections/Admin.ts";
import BootcampCard from "./collections/BootcampCard.ts";
import BootcampPage from "./collections/BootcampPage.ts";
import ContactSubmissions from "./collections/ContactSubmissions.ts";
import CourseDetail from "./collections/CourseDetail.ts";
import CoursePlanner from "./collections/CoursePlanner.ts";
import Courses from "./collections/Courses.ts";
import Ebook from "./collections/EbookPayload.ts";
import Instructors from "./collections/Instructors.ts";
import MediaBanner from "./collections/MediaBanner.ts";
import MediaBootcamp from "./collections/MediaBootcamp.ts";
import MediaCourse from "./collections/MediaCourse.ts";
import MediaEbook from "./collections/MediaEbook.ts";
import MediaInstructors from "./collections/MediaInstructors.ts";
import MediaPopup from "./collections/MediaPopup.ts";
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
    BootcampCard,
    BootcampPage,
    ContactSubmissions,
    Courses,
    CourseDetail,
    Instructors,
    CoursePlanner,
    MediaCourse,
    MediaInstructors,
    MediaBanner,
    MediaBootcamp,
    MediaPopup,
    Ebook,
    MediaEbook,
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
      connectionTimeoutMillis: 20000,
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
        "media-bootcamp": { prefix: "bootcamp" },
        "media-popup": { prefix: "popup" },
        "media-ebook": { prefix: "ebook" },
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
