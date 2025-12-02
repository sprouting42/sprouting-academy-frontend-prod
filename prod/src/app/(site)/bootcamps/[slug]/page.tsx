import { notFound } from "next/navigation";

import { getBootcampBySlug } from "@/data";

import { BootcampContent } from "./bootcampContent";

interface BootcampPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BootcampPage({ params }: BootcampPageProps) {
  const { slug } = await params;
  const bootcamp = getBootcampBySlug(slug);

  if (!bootcamp) {
    notFound();
  }

  return <BootcampContent bootcamp={bootcamp} />;
}
