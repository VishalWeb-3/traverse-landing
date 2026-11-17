/**
 * SEO JSON-LD Schema Component
 * Renders structured data for search engines
 * Improves SERP rich snippet display and schema validation
 */

import { securityPageSchema, faqSchema, organizationSchema } from "./schema";

export default function SecuritySchemaMarkup() {
  return (
    <>
      {/* Main WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(securityPageSchema),
        }}
        suppressHydrationWarning
      />

      {/* FAQ Schema for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
        suppressHydrationWarning
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
        suppressHydrationWarning
      />
    </>
  );
}
