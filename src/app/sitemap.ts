import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
import { categories, products } from "@/data/seeds";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE.url}/servicios`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE.url}/categoria/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE.url}/producto/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...base, ...categoryUrls, ...productUrls];
}
