import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { vehicleSeo } from "../../../lib/vehicle-seo";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aditautocar.site").replace(/\/$/, "");
const phone = "62881011026986";
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return vehicleSeo.map((vehicle) => ({ slug: vehicle.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = vehicleSeo.find((item) => item.slug === slug);
  if (!vehicle) return { robots: { index: false, follow: false } };
  const url = siteUrl + "/mobil-byd/" + vehicle.slug;
  return {
    title: { absolute: vehicle.title },
    description: vehicle.description,
    alternates: { canonical: url },
    openGraph: { title: vehicle.title, description: vehicle.description, url, type: "website", images: vehicle.image ? [vehicle.image] : [] },
    twitter: { card: "summary_large_image", title: vehicle.title, description: vehicle.description, images: vehicle.image ? [vehicle.image] : [] },
  };
}
export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const vehicle = vehicleSeo.find((item) => item.slug === slug);
  if (!vehicle) notFound();
  const url = siteUrl + "/mobil-byd/" + vehicle.slug;
  const message = encodeURIComponent("Halo Adit, saya tertarik " + vehicle.name + ". Mohon info harga OTR, promo, varian dan test drive bila tersedia.");
  const wa = "https://wa.me/" + phone + "?text=" + message;
  const structuredData = {
    "@context": "https://schema.org", "@type": "Car",
    name: vehicle.name, description: vehicle.intro, model: vehicle.name,
    brand: { "@type": "Brand", name: "BYD" }, url,
    image: vehicle.image ? siteUrl + vehicle.image : undefined,
  };
  return (
    <main className="min-h-screen bg-[#f5f4f0] text-[#11151a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="border-b border-black/10 bg-white px-5 py-5 sm:px-8">
        <nav aria-label="Navigasi" className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="font-bold">BYD Harmony Cikupa</a>
          <a href="/#models" className="text-sm underline underline-offset-4">← Semua model</a>
        </nav>
      </header>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#9e7622]">{vehicle.category} · Cikupa Tangerang</p>
          <h1 className="text-5xl font-bold tracking-tight">{vehicle.name} Tangerang</h1>
          <p className="mt-6 leading-8 text-[#515963]">{vehicle.intro}</p>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full bg-[#11151a] px-6 py-4 text-sm font-semibold text-white">Konsultasi WhatsApp Adit ↗</a>
          <p className="mt-3 text-xs text-[#626a72]">Adit · 0881011026986 · Konfirmasi harga, promo dan ketersediaan sebelum membeli.</p>
        </div>
        <div className="relative min-h-[290px] rounded-3xl bg-[#e7e4de] sm:min-h-[380px]">
          {vehicle.image ? <Image src={vehicle.image} alt={"Ilustrasi " + vehicle.name + "; warna dan tipe dapat berbeda"} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-6" /> :
            <div className="flex min-h-[290px] flex-col items-center justify-center gap-4 p-8 text-center"><strong className="text-3xl">BYD M6 DM</strong><p className="text-sm">Foto dan varian resmi perlu dikonfirmasi lebih lanjut.</p></div>}
        </div>
      </section>
      <section className="bg-white px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">Informasi penting {vehicle.name}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">{vehicle.highlights.map((item) => <li key={item} className="rounded-2xl border border-black/10 bg-[#f5f4f0] p-6">{item}</li>)}</ul>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <h2 className="text-3xl font-bold">Pertanyaan umum tentang {vehicle.name}</h2>
        <div className="mt-8 space-y-4">{vehicle.faqs.map((faq) => <article key={faq.question} className="rounded-2xl border border-black/10 bg-white p-6"><h3 className="font-semibold">{faq.question}</h3><p className="mt-3 text-sm leading-7 text-[#515963]">{faq.answer}</p></article>)}</div>
        <div className="mt-10 flex flex-wrap gap-4"><a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#11151a] px-6 py-3 text-sm font-semibold text-white">Chat Adit · 0881011026986</a><a href="/#test-drive" className="py-3 text-sm font-semibold underline">Formulir test drive</a></div>
      </section>
    </main>
  );
}
