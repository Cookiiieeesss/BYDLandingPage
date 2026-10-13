import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aditautocar.site"),
  title: {
    default: "BYD Harmony Cikupa | Dealer Mobil Listrik BYD Tangerang",
    template: "%s | BYD Harmony Cikupa",
  },
  description:
    "Dealer mobil listrik BYD resmi di Cikupa, Tangerang. Temukan BYD M6, BYD Atto 1, dan BYD Sealion 7, lihat brosur, jadwalkan test drive, dan konsultasikan trade in mobil Anda.",
  keywords: [
    "BYD Harmony Cikupa",
    "dealer BYD Tangerang",
    "dealer mobil listrik Cikupa",
    "mobil listrik BYD Indonesia",
    "BYD M6 Tangerang",
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
  alternates: { languages: { "id-ID": "/" } },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/assets/cropped-BYD-Cibubur-Logo.png", type: "image/png" }],
    shortcut: ["/assets/cropped-BYD-Cibubur-Logo.png"],
    apple: [{ url: "/assets/cropped-BYD-Cibubur-Logo.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "BYD Harmony Cikupa | Dealer Mobil Listrik BYD Tangerang",
    description:
      "Lihat BYD M6, BYD Atto 1, dan BYD Sealion 7, lalu konsultasikan test drive dan trade in mobil di BYD Harmony Cikupa, Tangerang.",
    siteName: "BYD Harmony Cikupa",
    images: [{ url: "/assets/header.png", width: 1920, height: 1080, alt: "BYD M6 di BYD Harmony Cikupa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BYD Harmony Cikupa | Dealer Mobil Listrik BYD Tangerang",
    description:
      "Temukan BYD M6, BYD Atto 1, dan BYD Sealion 7. Booking test drive atau konsultasikan trade in mobil di Cikupa, Tangerang.",
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
