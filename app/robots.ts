import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/admin/", "/dashboard/staff/"],
    },
    sitemap: "https://businessflow.app/sitemap.xml",
  };
}
