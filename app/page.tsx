import LandingExperience from "../components/landing/LandingExperience";

const siteUrl = "https://aditautocar.site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "BYD Harmony Cikupa",
      description: "Dealer mobil listrik BYD resmi di Cikupa, Tangerang.",
      inLanguage: "id-ID",
      publisher: { "@id": `${siteUrl}/#dealer` },
    },
    {
      "@type": "AutoDealer",
      "@id": `${siteUrl}/#dealer`,
      url: siteUrl,
      name: "BYD Harmony Cikupa",
      description:
        "Dealer mobil listrik BYD di Cikupa, Tangerang yang menyediakan informasi kendaraan, brosur, dan booking test drive BYD.",
      telephone: "+6285156688232",
      image: `${siteUrl}/assets/header.png`,
      logo: `${siteUrl}/assets/Aditautocar%20Chrome%20Automotive%20Logo.png`,
      priceRange: "Rp 199.000.000 - Rp 719.000.000",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Raya Serang No.Km. 17, Talaga",
        addressLocality: "Cikupa",
        addressRegion: "Banten",
        postalCode: "15710",
        addressCountry: "ID",
      },
      areaServed: ["Cikupa", "Tangerang", "Banten"],
      brand: { "@type": "Brand", name: "BYD" },
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "BYD M6" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "BYD Atto 1" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "BYD Sealion 7" } },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <LandingExperience />
    </>
  );
}
