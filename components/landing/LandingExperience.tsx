"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const WA_NUMBER = "62881011026986";

const models = [
  { name: "BYD M6", type: "MPV listrik keluarga", price: 383000000, variants: [{ name: "Standard 7-Seater", price: 383000000 }, { name: "Superior 7-Seater", price: 423000000 }, { name: "Superior Captain 6-Seater", price: 433000000 }], brochure: "https://drive.google.com/file/d/1xJEeb6ZPQv5EjurjPLbR9rWY1oB4WSD9/view", download: false, tags: ["6–7 penumpang", "V2L", "Kabin fleksibel"] },
  { name: "BYD Atto 1", type: "City car listrik", price: 199000000, priceLabel: "Mulai dari", variants: [{ name: "Standard Standard Range", price: 199000000 }, { name: "Dynamic Standard Range", price: 205000000 }, { name: "Premium Long Range", price: 245000000 }], brochure: "https://drive.google.com/file/d/1UDrRgmqml1dF16OYdTQB3wEN4xhuSCvO/view", download: false, tags: ["Ringkas di kota", "Blade Battery", "Teknologi modern"] },
  { name: "BYD Sealion 7", type: "SUV listrik premium", price: 629000000, variants: [{ name: "Premium (RWD)", price: 629000000 }, { name: "Performance (AWD)", price: 719000000 }], brochure: "/assets/BROCHURE_SEALION7.pdf", download: true, tags: ["SUV premium", "Jarak tempuh jauh", "Performa AWD"] },
];

const m6Colors = [
  { name: "Crystal White", swatch: "#f4f4f1" },
  { name: "Quartz Blue", swatch: "#526f88" },
  { name: "Cosmos Black", swatch: "#15181c" },
  { name: "Harbour Grey", swatch: "#73787d" },
];

const atto1Colors = [
  { name: "Apricity White", swatch: "#f4f4f1" },
  { name: "Cosmos Black", swatch: "#15181c" },
  { name: "Sprout Green", swatch: "#b6c83d" },
];

const sealion7Colors = [
  { name: "Cosmos Black", swatch: "#15181c" },
  { name: "Aurora White", swatch: "#f4f4f1" },
  { name: "Atlantis Grey", swatch: "#6f767c" },
  { name: "Shark Grey · Performance", swatch: "#454d55" },
];

const features = [
  ["01", "Dual Mode", "Teknologi DM (Dual Mode) adalah inovasi intelijen BYD yang dirancang untuk menggabungkan efisiensi energi dan pengalaman berkendara yang lebih nyaman."],
  ["02", "Efisiensi energi", "BYD DM dikembangkan dengan fokus pada efisiensi energi terbaik, sehingga membantu perjalanan terasa lebih hemat dan terukur untuk penggunaan sehari-hari."],
  ["03", "Performa bertenaga", "Sistem DM menghadirkan karakter berkendara yang responsif dan bertenaga, tetap diarahkan untuk memberikan pengalaman yang nyaman."],
  ["04", "Kenyamanan berkendara", "Perpaduan kecerdasan teknologi dan pengelolaan energi BYD membantu menciptakan perjalanan yang lebih halus, tenang, dan percaya diri."],
];

const testimonials = [
  ["Senyap, halus, dan biaya harian terasa jauh lebih ringan. Penjelasan test drive-nya juga sangat jelas.", "Pelanggan BYD, Tangerang"],
  ["Kabin BYD M6 lega untuk keluarga, sementara proses konsultasi dan simulasi cicilannya transparan.", "Pelanggan BYD, Serang"],
  ["Dari booking sampai mencoba kendaraan, semuanya terasa personal dan tidak memaksa.", "Pelanggan BYD, Jakarta Barat"],
];

const rupiah = (value: number) => `Rp ${Math.round(value).toLocaleString("id-ID")}`;

export default function LandingExperience() {
  const root = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modelId, setModelId] = useState(0);
  const [testimonial, setTestimonial] = useState(0);
  const [variantSelections, setVariantSelections] = useState<Record<string, number>>({ "BYD M6": 0, "BYD Atto 1": 0 });
  const model = models[modelId];

  useEffect(() => {
    if (!root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>(".reveal");
      if (reduced) {
        gsap.set(revealItems, { clearProps: "all" });
        return;
      }

      const lenis = new Lenis({ autoRaf: false, duration: 1.1, smoothWheel: true, wheelMultiplier: 0.9 });
      lenisRef.current = lenis;
      const raf = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);

      const heroIntro = gsap.timeline({ defaults: { ease: "power4.out" } });
      heroIntro.fromTo(".hero-copy > *", { autoAlpha: 0, y: 34, filter: "blur(10px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .85, stagger: .12 });
      heroIntro.fromTo(".hero-stats", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .8 }, "-=.35");
      gsap.to(".hero-backdrop", { yPercent: 10, scale: 1.06, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 } });
      gsap.to(".hero-grid", { yPercent: -16, xPercent: 4, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".hero-glow", { xPercent: 12, yPercent: -8, scale: 1.15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.4 } });
      gsap.to(".hero-depth-left", { yPercent: -18, rotateZ: 8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.1 } });
      gsap.to(".hero-scanline", { xPercent: 200, duration: 3.2, repeat: -1, ease: "power1.inOut", delay: 1.2 });

      revealItems.forEach((element, index) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 38, filter: "blur(8px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, delay: (index % 4) * 0.05, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 86%", once: true } });
      });

      return () => {
        lenisRef.current = null;
        lenis.destroy();
        gsap.ticker.remove(raf);
      };
    }, root);
    return () => context.revert();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setTestimonial((current) => (current + 1) % testimonials.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const enableSealionDownload = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href="/assets/BROCHURE_SEALION7.pdf"]');
      if (!link) return;
      link.download = "BROCHURE_SEALION7.pdf";
      link.removeAttribute("target");
    };

    document.addEventListener("click", enableSealionDownload);
    return () => document.removeEventListener("click", enableSealionDownload);
  }, []);

  useEffect(() => {
    const select = document.querySelector<HTMLSelectElement>('select[name="model"]');
    if (!select) return;

    ["BYD Seal", "BYD M6 DM", "BYD ATTO 3", "BYD DOLPHIN"].forEach((modelName) => {
      const exists = Array.from(select.options).some((option) => option.value === modelName);
      if (!exists) select.add(new Option(modelName, modelName));
    });
  }, []);

  const bookTestDrive = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Halo, saya ingin booking test drive BYD.",
      `Nama: ${data.get("name")}`,
      `WhatsApp: ${data.get("phone")}`,
      `Model: ${data.get("model")}`,
      `Tanggal: ${data.get("date")}`,
      `Jam: ${data.get("time")}`,
    ].join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const requestTradeIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Halo, saya ingin konsultasi trade in mobil di BYD Harmony Cikupa.",
      `Nama: ${data.get("tradeName")}`,
      `WhatsApp: ${data.get("tradePhone")}`,
      `Mobil saat ini: ${data.get("tradeCar")}`,
      `Tahun: ${data.get("tradeYear")}`,
      `Perkiraan kilometer: ${data.get("tradeMileage")}`,
      `BYD yang diminati: ${data.get("tradeInterest")}`,
    ].join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    setMenuOpen(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    } else if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: -84,
        duration: 1.35,
        easing: (value) => 1 - Math.pow(1 - value, 4),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.history.replaceState(null, "", href);
  };

  return (
    <main ref={root} className="min-h-screen overflow-hidden bg-[#f5f4f0]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
          <a href="#home" aria-label="BYD Harmony Cikupa" className="shrink-0"><Image src="/assets/byd-logo.png" alt="BYD" width={88} height={32} priority className="h-8 w-auto object-contain brightness-0" /></a>
          <button className="rounded-full border border-black/10 p-2 lg:hidden" aria-label="Buka menu" onClick={() => setMenuOpen((open) => !open)}><span className="block h-4 w-5 border-y-2 border-black" /></button>
          <div className={`${menuOpen ? "flex" : "hidden"} absolute left-4 right-4 top-20 flex-col gap-1 rounded-2xl border border-black/10 bg-white p-3 shadow-2xl lg:static lg:flex lg:flex-row lg:items-center lg:gap-2 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}>
            {[['Beranda', '#home'], ['Kendaraan', '#models'], ['Teknologi', '#features'], ['Trade In', '#trade-in'], ['Test Drive', '#test-drive'], ['Kontak', '#contact']].map(([item, href]) => <a key={item} href={href} onClick={(event) => scrollToSection(event, href)} className="rounded-full px-4 py-2 text-sm font-medium text-[#42464d] transition hover:bg-black hover:text-white">{item}</a>)}
          </div>
          <a href="#test-drive" onClick={(event) => scrollToSection(event, "#test-drive")} className="hidden whitespace-nowrap rounded-full bg-[#11151a] px-5 py-3 text-xs font-semibold !text-white transition hover:-translate-y-0.5 hover:bg-[#d8a92f] hover:!text-black sm:block">Booking Test Drive</a>
        </div>
      </nav>

      <section id="home" className="hero noise relative isolate flex min-h-[720px] items-end overflow-hidden bg-[#e9e7e0] pt-28 sm:min-h-[850px] lg:min-h-screen">
        <Image src="/assets/header.png" alt="BYD M6 di tepi laut" fill priority sizes="100vw" className="hero-backdrop absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-95" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(245,244,240,.97)_0%,rgba(245,244,240,.9)_28%,rgba(245,244,240,.22)_68%,rgba(245,244,240,.05)_100%)]" />
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="hero-glow pointer-events-none absolute -right-32 top-12 -z-10 h-[28rem] w-[28rem] rounded-full" aria-hidden="true" />
        <div className="hero-scanline pointer-events-none absolute left-0 right-0 top-[34%] -z-10" aria-hidden="true" />
        <div className="hero-depth-scene" aria-hidden="true">
          <div className="hero-depth-object hero-depth-left">
            <div className="hero-prism hero-prism-one" />
            <div className="hero-prism hero-prism-two" />
            <div className="hero-prism hero-prism-three" />
            <span className="hero-depth-label">ELECTRIC<br />MOTION</span>
          </div>
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-8 px-5 pb-14 sm:px-8 lg:grid-cols-1 lg:px-14 lg:pb-20">
          <div className="hero-copy max-w-[680px]">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/55 px-4 py-2 text-[10px] font-semibold uppercase tracking-[.2em] text-[#555c65] backdrop-blur-md"><span className="h-2 w-2 rounded-full bg-[#d8a92f]" /> Dealer Resmi BYD · Cikupa</div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[.24em] text-[#a2781d]">BYD M6 · Mobil Listrik MPV Keluarga</p>
            <h1 className="mb-7 max-w-[12ch] text-balance text-[clamp(2.8rem,9vw,8.4rem)] font-semibold leading-[.98] tracking-[-.08em] text-[#101318] sm:mb-9"><span className="whitespace-nowrap">Dealer BYD</span> Cikupa <span className="whitespace-nowrap text-[#ba8d24]">Tangerang.</span></h1>
            <p className="max-w-[500px] text-pretty text-base leading-8 text-[#505963] sm:text-lg">Nikmati kabin luas, teknologi pintar, dan pengalaman berkendara listrik yang tenang bersama BYD M6 untuk kebutuhan keluarga di Tangerang dan sekitarnya.</p>
            <div className="flex flex-wrap gap-3"><a href="#test-drive" className="whitespace-nowrap rounded-full bg-[#11151a] px-6 py-4 text-sm font-semibold !text-white shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:bg-[#d8a92f] hover:!text-black">Booking test drive <span className="ml-2">↗</span></a><a href="#models" className="whitespace-nowrap rounded-full border border-black/20 bg-white/45 px-6 py-4 text-sm font-semibold text-[#11151a] backdrop-blur transition hover:-translate-y-1 hover:bg-white">Jelajahi model</a></div>
          </div>
        </div>
        <div className="hero-stats relative z-10 mx-5 mb-5 grid w-[calc(100%-2.5rem)] max-w-[920px] grid-cols-2 overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#0e1217]/90 text-white shadow-[0_24px_70px_rgba(14,18,23,.28)] backdrop-blur-2xl sm:mx-8 sm:mb-8 sm:w-[calc(100%-4rem)] sm:grid-cols-4 lg:mb-10 lg:ml-auto lg:mr-14 lg:w-[min(100%,920px)]"><Stat value="3" label="Model unggulan" /><Stat value="1" label="Konsultasi personal" /><Stat value="8" label="Garansi baterai hingga (tahun)*" /><Stat value="1" label="Kontak WhatsApp Adit" /></div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-[#11151a] py-4 text-white"><div className="marquee-track flex w-max animate-[marquee_32s_linear_infinite] items-center gap-8 text-xs font-medium tracking-[.08em] text-white/80">{["TEST DRIVE GRATIS", "GARANSI RESMI BYD", "CICILAN TRANSPARAN", "TANPA BBM", "SERVIS DEALER RESMI", "RAMAH LINGKUNGAN", "TEST DRIVE GRATIS", "GARANSI RESMI BYD"].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-8">{item}<b className="text-[#e8b94d]">✦</b></span>)}</div></div>

      <section id="features" className="relative bg-[#f5f4f0] px-5 py-24 sm:px-8 lg:px-14 lg:py-36"><div className="mx-auto max-w-[1440px]"><div className="mb-14 max-w-4xl reveal"><p className="mb-4 text-xs font-semibold uppercase tracking-[.25em] text-[#a2781d]">Teknologi BYD DM</p><h2 className="text-balance text-4xl font-semibold leading-[1] tracking-[-.06em] sm:text-6xl">Energi cerdas untuk perjalanan yang lebih nyaman.</h2><p className="mt-6 max-w-2xl leading-7 text-[#6e747d]">Teknologi DM (Dual Mode) merupakan inovasi intelijen BYD yang dirancang untuk menghadirkan efisiensi energi terbaik sekaligus performa berkendara yang lebih nyaman dan bertenaga. Pelajari prinsip utamanya sebelum memilih mobil BYD untuk kebutuhan Anda.</p><a href="https://www.byd.com/id/byd-dm-technology" target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-semibold text-[#11151a] underline decoration-[#d8a92f] decoration-2 underline-offset-4 transition hover:text-[#a2781d]">Baca sumber resmi BYD DM Technology ↗</a></div><div className="grid overflow-hidden rounded-[2rem] border border-black/10 bg-white sm:grid-cols-2 lg:grid-cols-4">{features.map(([number, title, text]) => <article key={number} className="m6-feature reveal border-b border-black/10 p-7 last:border-0 sm:nth-[3]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-0"><div className="mb-16 flex h-10 w-10 items-center justify-center rounded-full bg-[#11151a] text-xs font-semibold text-white">{number}</div><h3 className="text-lg font-semibold tracking-[-.03em]">{title}</h3><p className="mt-3 text-sm leading-7 text-[#6e747d]">{text}</p></article>)}</div></div></section>

      <section id="models" className="bg-[#11151a] px-5 py-24 text-white sm:px-8 lg:px-14 lg:py-36"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end reveal"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[.25em] text-[#e8b94d]">Model Mobil Listrik BYD</p><h2 className="text-4xl font-semibold tracking-[-.06em] sm:text-6xl">Pilih mobil listrik BYD sesuai kebutuhan Anda.</h2></div><p className="max-w-md text-sm leading-7 text-white/60">Bandingkan BYD M6, BYD ATTO 1, dan Sealion 7. Temukan spesifikasi, simulasi kredit, dan test drive. Tertarik plug-in hybrid? Pelajari juga BYD M6 DM.</p></div><p className="mt-5 text-sm text-white/70">Mencari mobil plug-in hybrid? <a href="/mobil-byd/m6-dm" className="font-semibold text-[#e8b94d] underline underline-offset-4">Kenali BYD M6 DM (PHEV) ↗</a></p><div className="mt-14 grid gap-5 lg:grid-cols-3">{models.map((item, index) => { const isM6 = index === 0; const isAtto1 = index === 1; const isSealion7 = index === 2; const selectedVariantIndex = variantSelections[item.name] ?? 0; const selectedVariant = item.variants?.[selectedVariantIndex]; return <article key={item.name} className="card premium-hover reveal group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[.06] p-4 transition hover:-translate-y-2 hover:border-[#e8b94d]/50 hover:bg-white/[.1]"><div className="relative flex h-56 items-end justify-center overflow-hidden rounded-[1.15rem] bg-gradient-to-br from-white/10 to-transparent"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(232,185,77,.2),transparent_50%)]" />{isM6 ? <Image src="/assets/Khaki.png" alt={`${item.name} warna Harbour Grey`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="relative object-contain p-3 transition duration-500 group-hover:scale-105" /> : isAtto1 ? <Image src="/assets/atto1.png" alt={item.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="relative object-contain p-3 transition duration-500 group-hover:scale-105" /> : isSealion7 ? <Image src="/assets/sealion7.png" alt="BYD Sealion 7 SUV listrik" fill sizes="(max-width: 1024px) 100vw, 33vw" className="relative object-contain p-3 transition duration-500 group-hover:scale-105" /> : <div className="relative h-32 w-72 rounded-[45%] bg-gradient-to-br from-[#f6f6f3] via-[#bfc4c7] to-[#454b51] shadow-[0_30px_35px_rgba(0,0,0,.35)] transition duration-500 group-hover:scale-105"><div className="absolute left-[18%] right-[17%] top-[-23%] h-20 rounded-t-[60%] rounded-b-xl bg-[#20252b]" /><div className="absolute bottom-[-17px] left-[16%] h-10 w-10 rounded-full border-8 border-[#11151a] bg-[#92999d]" /><div className="absolute bottom-[-17px] right-[16%] h-10 w-10 rounded-full border-8 border-[#11151a] bg-[#92999d]" /></div>}</div>{(isM6 || isAtto1 || isSealion7) && <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 px-3 py-3"><div className="flex items-center justify-between gap-3"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/50">Pilihan warna</p><span className="text-[10px] text-white/50">Tersedia di Indonesia</span></div><div className="mt-3 grid grid-cols-2 gap-2">{(isM6 ? m6Colors : isAtto1 ? atto1Colors : sealion7Colors).map((color) => <span key={color.name} className="flex items-center gap-2 text-[10px] text-white/70"><span aria-hidden="true" className="h-4 w-4 shrink-0 rounded-full border border-white/40" style={{ backgroundColor: color.swatch }} />{color.name}</span>)}</div></div>}<div className="flex flex-1 flex-col p-4"><p className="text-xs uppercase tracking-[.2em] text-[#e8b94d]">{item.type}</p><h3 className="mt-2 text-2xl font-semibold tracking-[-.04em]">{item.name}</h3><a href={`/mobil-byd/${index === 0 ? "m6" : index === 1 ? "atto-1" : "sealion-7"}`} className="mt-2 inline-block text-xs font-semibold text-[#e8b94d] underline underline-offset-4">Detail & FAQ ↗</a>{item.variants && <label className="mt-4 grid gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-white/50">Pilih tipe<select value={selectedVariantIndex} onChange={(event) => setVariantSelections((current) => ({ ...current, [item.name]: Number(event.target.value) }))} className="w-full rounded-xl border border-white/15 bg-[#171c22] px-3 py-2 text-xs font-medium normal-case tracking-normal text-white outline-none focus:border-[#e8b94d]">{item.variants.map((variant, variantIndex) => <option key={variant.name} value={variantIndex}>{variant.name} - {rupiah(variant.price)}</option>)}</select></label>}<div className="my-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-white/60">{tag}</span>)}</div><p className="text-sm text-white/50">{selectedVariant ? "Harga tipe terpilih" : item.priceLabel ?? "Estimasi mulai"}</p><strong className="mt-1 block text-xl">{rupiah(selectedVariant?.price ?? item.price)}</strong><div className={`mt-auto grid gap-2 ${item.brochure ? "grid-cols-2" : "grid-cols-1"}`}><button onClick={() => { setModelId(models.indexOf(item)); document.getElementById("test-drive")?.scrollIntoView({ behavior: "smooth" }); }} className="min-w-0 rounded-full bg-white px-3 py-3 text-xs font-semibold text-[#11151a] transition hover:bg-[#e8b94d] sm:px-4 sm:text-sm">Jadwalkan test drive ↗</button>{item.brochure && <a href={item.brochure} target="_blank" rel="noreferrer" className="min-w-0 rounded-full border border-white/20 px-3 py-3 text-center text-xs font-semibold text-white transition hover:border-[#e8b94d] hover:text-[#e8b94d] sm:px-4 sm:text-sm">Lihat brosur ↗</a>}</div></div></article>; })}</div></div></section>

      <section id="trade-in" className="relative overflow-hidden bg-[#e8e4d9] px-5 py-24 sm:px-8 lg:px-14 lg:py-36"><div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr]"><div className="reveal"><p className="mb-4 text-xs font-semibold uppercase tracking-[.25em] text-[#a2781d]">Trade In Mobil BYD</p><h2 className="text-balance text-5xl font-semibold leading-[.95] tracking-[-.07em] sm:text-7xl">Tukar mobil lama, <span className="text-[#ba8d24]">mulai perjalanan baru.</span></h2><p className="mt-7 max-w-md leading-8 text-[#626a72]">Konsultasikan mobil lama Anda untuk mendapatkan estimasi trade in sebagai bagian dari rencana pembelian BYD M6, BYD Atto 1, atau BYD Seal di BYD Harmony Cikupa.</p><div className="trade-step-grid mt-9 grid max-w-md gap-3 sm:grid-cols-3"><div className="trade-step rounded-2xl border border-black/10 bg-white/55 p-4"><strong className="block text-lg">01</strong><span className="mt-2 block text-xs leading-5 text-[#626a72]">Isi data kendaraan</span></div><div className="trade-step rounded-2xl border border-black/10 bg-white/55 p-4"><strong className="block text-lg">02</strong><span className="mt-2 block text-xs leading-5 text-[#626a72]">Tim melakukan review</span></div><div className="trade-step rounded-2xl border border-black/10 bg-white/55 p-4"><strong className="block text-lg">03</strong><span className="mt-2 block text-xs leading-5 text-[#626a72]">Dapatkan konsultasi</span></div></div></div><form onSubmit={requestTradeIn} className="reveal grid gap-4 rounded-[2rem] border border-black/10 bg-white/65 p-6 shadow-2xl shadow-black/5 backdrop-blur-xl sm:grid-cols-2 sm:p-8"><Field label="Nama lengkap" name="tradeName" placeholder="Nama Anda" /><Field label="Nomor WhatsApp" name="tradePhone" placeholder="08xx-xxxx-xxxx" type="tel" /><Field label="Merek dan model mobil" name="tradeCar" placeholder="Contoh: MPV keluarga 2021" /><Field label="Tahun kendaraan" name="tradeYear" placeholder="Contoh: 2021" type="number" /><Field label="Perkiraan kilometer" name="tradeMileage" placeholder="Contoh: 45.000 km" /><label className="grid gap-2 text-xs font-medium text-[#555c65]">Mobil BYD yang diminati<select name="tradeInterest" defaultValue="BYD M6" className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#c59c37]"><option>BYD M6</option><option>BYD Atto 1</option><option>BYD Seal</option><option>Belum menentukan</option></select></label><button className="rounded-xl bg-[#11151a] px-5 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#d8a92f] hover:text-black sm:col-span-2">Konsultasikan Trade In via WhatsApp ↗</button><p className="text-xs leading-5 text-[#737a82] sm:col-span-2">Estimasi awal bersifat indikatif. Nilai akhir mengikuti pemeriksaan kendaraan, kelengkapan dokumen, kondisi, dan kebijakan partner pembiayaan atau dealer.</p></form></div></section>

      <section className="bg-white px-5 py-24 sm:px-8 lg:px-14 lg:py-36"><div className="mx-auto max-w-[1000px] text-center reveal"><p className="mb-4 text-xs font-semibold uppercase tracking-[.25em] text-[#a2781d]">Testimoni Pelanggan BYD</p><h2 className="text-4xl font-semibold tracking-[-.06em] sm:text-6xl">Pengalaman pelanggan BYD Harmony Cikupa</h2><div className="mt-12 min-h-[230px]"><p className="text-balance text-2xl leading-relaxed tracking-[-.03em] text-[#252a30] sm:text-4xl">“{testimonials[testimonial][0]}”</p><p className="mt-7 text-sm text-[#6e747d]">{testimonials[testimonial][1]}</p></div><div className="mt-8 flex justify-center gap-2">{testimonials.map((_, index) => <button key={index} aria-label={`Testimoni ${index + 1}`} onClick={() => setTestimonial(index)} className={`h-1.5 rounded-full transition-all ${testimonial === index ? "w-12 bg-[#11151a]" : "w-6 bg-black/15"}`} />)}</div></div></section>

      <section id="test-drive" className="relative overflow-hidden bg-[#e8e4d9] px-5 py-24 sm:px-8 lg:px-14 lg:py-36"><div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr]"><div className="reveal"><p className="mb-4 text-xs font-semibold uppercase tracking-[.25em] text-[#a2781d]">Booking Test Drive BYD</p><h2 className="text-balance text-5xl font-semibold leading-[.95] tracking-[-.07em] sm:text-7xl">Jadwalkan test drive mobil listrik BYD</h2><p className="mt-7 max-w-md leading-8 text-[#626a72]">Isi formulir booking test drive BYD dan tim kami akan membantu menyiapkan jadwal yang sesuai untuk Anda di BYD Harmony Cikupa, Tangerang.</p></div><form onSubmit={bookTestDrive} className="reveal grid gap-4 rounded-[2rem] border border-black/10 bg-white/65 p-6 shadow-2xl shadow-black/5 backdrop-blur-xl sm:grid-cols-2 sm:p-8"><Field label="Nama lengkap" name="name" placeholder="Nama Anda" /><Field label="Nomor WhatsApp" name="phone" placeholder="08xx-xxxx-xxxx" type="tel" /><label className="grid gap-2 text-xs font-medium text-[#555c65]">Model<select name="model" defaultValue={model.name} className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#c59c37]"><option>BYD M6</option><option>BYD Atto 1</option><option>BYD Seal</option></select></label><label className="grid gap-2 text-xs font-medium text-[#555c65]">Tanggal<input name="date" type="date" required className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#c59c37]" /></label><label className="grid gap-2 text-xs font-medium text-[#555c65]">Jam<select name="time" className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#c59c37]"><option>10:00</option><option>13:00</option><option>15:00</option></select></label><button className="rounded-xl bg-[#11151a] px-5 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#d8a92f] hover:text-black sm:col-span-2">Kirim booking via WhatsApp ↗</button></form></div></section>

                  <footer id="contact" className="bg-[#0d1014] px-5 py-16 text-white sm:px-8 lg:px-14"><div className="mx-auto max-w-[1440px] border-b border-white/10 pb-12"><p className="text-xs font-semibold uppercase tracking-[.25em] text-[#e8b94d]">Bangun kehadiran digital yang lebih kuat</p><h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-[-.04em] sm:text-5xl">Mau membuat landing page atau website yang bukan hanya terlihat menarik, tetapi juga membantu bisnis tumbuh?</h2><p className="mt-5 max-w-3xl text-sm leading-7 text-white/60">Bangun identitas digital yang kuat, hadirkan pengalaman pelanggan yang lebih baik, dan gunakan teknologi untuk menjangkau lebih banyak peluang. Yuk cek <a href="https://www.ruangpusat.com" target="_blank" rel="noreferrer" className="font-semibold text-[#e8b94d] underline decoration-[#e8b94d] decoration-2 underline-offset-4 transition hover:text-[#f5d477]">www.ruangpusat.com</a> dan wujudkan website yang siap bekerja untuk bisnis Anda.</p></div><div className="mx-auto grid max-w-[1440px] gap-12 pt-12 md:grid-cols-[1.2fr_.8fr_.8fr]"><div><Image src="/assets/byd-logo.png" alt="BYD" width={88} height={32} className="h-8 w-auto brightness-0 invert" /><p className="mt-5 max-w-sm text-sm leading-7 text-white/50">BYD Harmony Cikupa adalah dealer mobil listrik BYD di Tangerang yang membantu Anda memilih BYD M6, BYD Atto 1, atau BYD Seal sesuai kebutuhan keluarga dan bisnis.</p></div><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#e8b94d]">Dealer</p><p className="mt-5 text-sm leading-7 text-white/60">Jl. Raya Serang No.Km. 17, Talaga, Cikupa, Tangerang, Banten 15710</p><a href="https://www.google.com/maps/search/?api=1&query=BYD+Harmony+Cikupa" target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm underline underline-offset-4">Buka Google Maps ↗</a></div><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#e8b94d]">Hubungi</p><a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className="mt-5 block text-sm text-white/70">WhatsApp Adit: 0881011026986</a><a href="mailto:rfqy.adtyaa@gmail.com" className="mt-3 block text-sm text-white/70">rfqy.adtyaa@gmail.com</a></div></div><div className="mx-auto mt-14 max-w-[1440px] border-t border-white/10 pt-6 text-xs text-white/35">© 2026 BYD Harmony Cikupa. Halaman ini dikelola oleh sales consultant dealer.</div></footer>
      <a href={`https://wa.me/${WA_NUMBER}?text=Halo%2C%20saya%20tertarik%20dengan%20mobil%20BYD`} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 rounded-full bg-white px-5 py-3 text-xs font-semibold text-[#11151a] shadow-2xl transition hover:-translate-y-1 hover:bg-[#e8b94d]">Chat WhatsApp</a>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  const target = Number(value.split("/")[0]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => setCount(target));
      return () => window.cancelAnimationFrame(frame);
    }

    const startedAt = performance.now();
    const duration = 900;
    let frame = 0;
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [target]);

  const displayValue = value.includes("/") ? `${count}/7` : count.toLocaleString("id-ID");
  return <div className="hero-stat border-r border-white/10 px-5 py-5 sm:px-8 lg:px-10"><strong className="block text-2xl font-semibold leading-none tracking-[-.05em] sm:text-3xl" aria-label={value}>{displayValue}</strong><span className="mt-3 block text-[10px] leading-[1.45] uppercase tracking-[.12em] text-white/50 sm:text-xs">{label}</span></div>;
}

function Field({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder: string; type?: string }) {
  return <label className="grid gap-2 text-xs font-medium text-[#555c65]">{label}<input name={name} type={type} required placeholder={placeholder} className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-[#c59c37]" /></label>;
}
