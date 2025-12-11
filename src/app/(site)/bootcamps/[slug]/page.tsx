import { notFound } from "next/navigation";

import { fetchBootcampBySlug } from "@/data/bootcampsPayload";

import { BootcampPayloadContent } from "./bootcampPayloadContent";

interface BootcampPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BootcampPage({ params }: BootcampPageProps) {
  const { slug } = await params;
  const bootcamp = await fetchBootcampBySlug(slug);

  if (!bootcamp) {
    notFound();
  }

  return <BootcampPayloadContent bootcamp={bootcamp} />;
}
