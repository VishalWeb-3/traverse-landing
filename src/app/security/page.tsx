import { notFound } from "next/navigation";
import { InfoRoute, findInfoPage } from "../info-route";
import SecuritySchemaMarkup from "./SecuritySchemaMarkup";

// Metadata lives in ./layout.tsx and structured data in SecuritySchemaMarkup, both carried over from the original site.
export default function SecurityPage() {
  const page = findInfoPage("security");
  if (!page) notFound();
  return <><SecuritySchemaMarkup /><InfoRoute page={page} /></>;
}
