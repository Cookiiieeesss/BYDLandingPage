import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aditautocar.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl.replace(/\/$/, "")}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
