import { cmsFetch } from "@/utils/ky";

interface PopupDoc {
  id: string;
  url: string;
  alt: string;
  content: string;
  activePopup: boolean;
  filename: string;
  width: number;
  height: number;
}

interface PopupApiResponse {
  data: {
    popups: {
      docs: PopupDoc[];
      totalDocs: number;
      totalPages: number;
      page: number;
      limit: number;
    };
  };
}

export interface PopupImage {
  src: string;
  alt: string;
  id: string;
}

export async function fetchPopup(
  content: "bootcamp" | "course" | "n8n" | "other",
): Promise<PopupImage[]> {
  const response = await cmsFetch.get<PopupApiResponse>(
    `routes/popup?content=${content}`,
  );
  const docs = response.data?.popups?.docs || [];

  return docs.map((doc) => ({
    src: doc.url,
    alt: doc.alt || "Popup image",
    id: doc.id,
  }));
}
