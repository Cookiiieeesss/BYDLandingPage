import type { MetadataRoute } from "next";
import { vehicleSeo } from "../lib/vehicle-seo";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aditautocar.site").replace(/\/$/, "");
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl + "/", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...vehicleSeo.map((vehicle) => ({
      url: siteUrl + "/mobil-byd/" + vehicle.slug,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
