import { SITE } from "@/lib/seo";

export default function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE.url,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}/logo.svg`,
    telephone: `+${SITE.whatsapp}`,
    priceRange: "$$",
    address: SITE.branches.map((b) => ({
      "@type": "PostalAddress",
      streetAddress: b.address.split(",")[0]?.trim(),
      addressLocality: "Paraná",
      addressRegion: "Entre Ríos",
      addressCountry: "AR",
    })),
    geo: SITE.branches.map((b) => ({
      "@type": "GeoCoordinates",
      latitude: b.lat,
      longitude: b.lng,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: SITE.hours.open,
        closes: SITE.hours.close,
      },
    ],
    areaServed: SITE.cities.map((city) => ({
      "@type": "City",
      name: city,
    })),
    sameAs: [SITE.social.instagram, SITE.social.facebook],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
