import { SITE } from "@/lib/seo";

export type ProductJsonLdInput = {
  name: string;
  description: string;
  image: string;
  price: number;
  url: string;
  sku?: string;
  brand?: string;
  availability?: "InStock" | "OutOfStock";
};

export default function ProductJsonLd({ product }: { product: ProductJsonLdInput }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand ?? SITE.shortName },
    offers: {
      "@type": "Offer",
      url: product.url,
      priceCurrency: "ARS",
      price: product.price,
      availability: `https://schema.org/${product.availability ?? "InStock"}`,
      seller: { "@type": "Organization", name: SITE.name },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
