import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aditautocar.site"),
  title: {
    default: "Dealer BYD Cikupa Tangerang | Promo & Test Drive Adit",
    template: "%s | BYD Harmony Cikupa",
  },
  description:
    "Cari mobil BYD di Cikupa Tangerang? Konsultasi harga OTR, promo, simulasi kredit, trade-in dan booking test drive bersama Adit di BYD Harmony Cikupa.",
  keywords: [
    "BYD Harmony Cikupa",
    "dealer BYD Tangerang",
    "dealer mobil listrik Cikupa",
    "mobil listrik BYD Indonesia",
    "BYD M6 Tangerang",
    "BYD M6 DM Tangerang",
    "promo BYD Cikupa",
    "harga BYD Tangerang",
    "Adit Auto Car",
    "BYD Atto 1 Tangerang",
    "BYD Sealion 7 Tangerang",
    "test drive BYD",
    "kredit mobil listrik BYD",
    "trade in mobil BYD",
    "tukar tambah mobil Tangerang",
  ],
  authors: [{ name: "BYD Harmony Cikupa" }],
  creator: "BYD Harmony Cikupa",
  publisher: "BYD Harmony Cikupa",
  category: "Automotive",
  alternates: { canonical: "/", languages: { "id-ID": "/" } },
  robots: { index: true, follow: true },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: [{ url: "/assets/Aditautocar Chrome Automotive Logo.png", type: "image/png" }],
    shortcut: ["/assets/Aditautocar Chrome Automotive Logo.png"],
    apple: [{ url: "/assets/Aditautocar Chrome Automotive Logo.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "Dealer BYD Cikupa Tangerang | Promo & Test Drive Adit",
    description:
      "Konsultasi BYD M6, ATTO 1, Sealion 7 dan M6 DM. Cek harga, promo, trade-in dan booking test drive BYD di Cikupa Tangerang bersama Adit.",
    siteName: "BYD Harmony Cikupa",
    images: [{ url: "/assets/header.png", width: 1920, height: 1080, alt: "BYD M6 di BYD Harmony Cikupa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dealer BYD Cikupa Tangerang | Promo & Test Drive Adit",
    description:
      "Cari harga dan promo BYD Cikupa Tangerang? Konsultasi dengan Adit, simulasi kredit, trade-in dan booking test drive.",
    images: ["/assets/header.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
