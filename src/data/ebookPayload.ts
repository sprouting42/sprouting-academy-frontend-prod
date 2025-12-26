import { convertGoogleDriveToDirectDownload } from "@/utils/googleDrive";
import { cmsFetch } from "@/utils/ky";

interface MediaEbook {
  id: string;
  url?: string;
  filename?: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface EbookDoc {
  id: string;
  ebookId: string;
  title: string;
  description: string;
  price?: string | number | null;
  imageBadgeText?: string;
  textButton?: string;
  link?: string;
  bulletPoints?: Array<{
    bulletPoint: string;
    id?: string;
  }>;
  category?: "advanced-automation" | "make-for-business";
  isActive: boolean;
  coverImage?: {
    relationTo: "media-ebook";
    value: MediaEbook | string;
  };
  createdAt: string;
  updatedAt: string;
  ebookpage?: number | null;
  downloadUrl?: string | null;
}

interface EbookApiResponse {
  success: boolean;
  data: {
    ebooks: {
      docs: EbookDoc[];
      totalDocs: number;
      totalPages: number;
      page: number;
      limit: number;
      hasNextPage?: boolean;
      hasPrevPage?: boolean;
    };
  };
}

interface BannerDoc {
  id: string;
  alt: string;
  banner?: "ebook" | "course";
  url?: string;
  filename?: string;
  width?: number;
  height?: number;
}

interface BannerApiResponse {
  success: boolean;
  data: {
    banners: {
      docs: BannerDoc[];
      totalDocs: number;
      totalPages: number;
      page: number;
      limit: number;
      hasNextPage?: boolean;
      hasPrevPage?: boolean;
    };
  };
}

export interface EbookBanner {
  src: string;
  alt?: string;
  id: string;
}

export interface EbookPayload {
  id: string;
  ebookId: string;
  title: string;
  description: string;
  price: string;
  imageBadgeText?: string;
  textButton?: string;
  link?: string;
  bulletPoints?: string[];
  category?: "advanced-automation" | "make-for-business";
  coverImage?: {
    src: string;
    alt: string;
    id: string;
  };
  ebookpage: number;
  downloadUrl?: string | null;
}

function isMediaEbook(value: unknown): value is MediaEbook {
  return (
    !!value && typeof value === "object" && "id" in value && "url" in value
  );
}

function getCoverImageData(
  coverImage?: EbookDoc["coverImage"],
): EbookPayload["coverImage"] {
  if (!coverImage) return undefined;

  const { value } = coverImage;

  if (isMediaEbook(value)) {
    return {
      src: value.url || "",
      alt: value.alt || "Ebook cover image",
      id: value.id,
    };
  }

  return undefined;
}

export async function fetchEbookPayload(
  category: "advanced-automation" | "make-for-business",
): Promise<EbookPayload[]> {
  const response = await cmsFetch.get<EbookApiResponse>(
    `routes/ebook?category=${category}`,
  );
  const docs = response.data?.ebooks?.docs || [];

  return docs.map((doc) => ({
    id: doc.id,
    ebookId: doc.ebookId,
    title: doc.title,
    description: doc.description,
    price:
      typeof doc.price === "number" ? doc.price.toString() : doc.price || "",
    imageBadgeText: doc.imageBadgeText,
    textButton: doc.textButton,
    link: doc.link,
    bulletPoints: doc.bulletPoints?.map((bp) => bp.bulletPoint) || [],
    category: doc.category,
    ebookpage: doc.ebookpage || 0,
    downloadUrl: doc.downloadUrl
      ? convertGoogleDriveToDirectDownload(doc.downloadUrl)
      : null,
    coverImage: getCoverImageData(doc.coverImage),
  }));
}

export async function fetchEbookBanner(): Promise<EbookBanner[]> {
  const response = await cmsFetch.get<BannerApiResponse>(
    "routes/banner?banner=ebook",
  );
  const docs = response.data?.banners?.docs || [];

  return docs
    .filter((banner) => banner.url)
    .map((banner) => ({
      src: banner.url || "",
      alt: banner.alt || undefined,
      id: banner.id,
    }));
}

interface SingleEbookApiResponse {
  success: boolean;
  data: EbookDoc;
}

export async function fetchEbookByEbookId(
  ebookId: string,
): Promise<EbookPayload | null> {
  try {
    const response = await cmsFetch.get<SingleEbookApiResponse>(
      `routes/ebook?ebookId=${encodeURIComponent(ebookId)}`,
    );

    if (!response.success || !response.data) {
      return null;
    }

    const doc = response.data;
    return {
      id: doc.id,
      ebookId: doc.ebookId,
      title: doc.title,
      description: doc.description,
      price:
        typeof doc.price === "number" ? doc.price.toString() : doc.price || "",
      imageBadgeText: doc.imageBadgeText,
      textButton: doc.textButton,
      link: doc.link,
      bulletPoints: doc.bulletPoints?.map((bp) => bp.bulletPoint) || [],
      category: doc.category,
      ebookpage: doc.ebookpage || 0,
      downloadUrl: doc.downloadUrl
        ? convertGoogleDriveToDirectDownload(doc.downloadUrl)
        : null,
      coverImage: getCoverImageData(doc.coverImage),
    };
  } catch {
    return null;
  }
}

export async function fetchEbooksByEbookIds(
  ebookIds: string[],
): Promise<EbookPayload[]> {
  const allEbooks = await Promise.all(
    ebookIds.map((ebookId) => fetchEbookByEbookId(ebookId)),
  );

  return allEbooks.filter((ebook): ebook is EbookPayload => ebook !== null);
}
