import { getSiteUrl } from "@/lib/site";

const DESCRIPTION =
  "Structured research atlas for Navi Mumbai real estate—location dossiers, sector theses, and property inventory context for informed comparison.";

export function SiteJsonLd() {
  const url = getSiteUrl();

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Grix",
    url,
    description: DESCRIPTION,
    areaServed: {
      "@type": "City",
      name: "Navi Mumbai",
      containedInPlace: { "@type": "AdministrativeArea", name: "Maharashtra" },
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Grix",
    url,
    description: DESCRIPTION,
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", name: "The Grix", url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
