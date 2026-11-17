import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoRoute, findInfoPage, infoMetadata, infoRoutePages } from "../info-route";

export function generateStaticParams() {
  // /security has its own route (metadata + JSON-LD), so it is not generated here.
  return infoRoutePages.filter(({ slug }) => slug !== "security").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return infoMetadata(slug);
}

export default async function InfoPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findInfoPage(slug);
  if (!page || slug === "security") notFound();
  return <InfoRoute page={page} />;
}
