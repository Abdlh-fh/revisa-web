import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import collabImg from "@/assets/collab-illustration.jpg";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ريفيزا — سندك رقم واحد في البكالوريا" },
      {
        name: "description",
        content:
          "منصة ريفيزا: كل ما يحتاجه تلميذ البكالوريا من محتوى تعليمي، تحديات، كويزات وامتحانات — حصرياً على تلغرام.",
      },
      { property: "og:title", content: "ريفيزا — سندك رقم واحد في البكالوريا" },
      {
        property: "og:description",
        content:
          "كل ما يحتاجه تلميذ البكالوريا من محتوى تعليمي، تحديات، كويزات وامتحانات — حصرياً على تلغرام.",
      },
    ],
  }),
  component: Home,
});

const TELEGRAM_LOGO =
  "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@develop/icons/telegram.svg";

function Home() {
  const { t, dir } = useI18n();
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            setTimeout(() => el.classList.add("in"), i * 90);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 },
    );
    revealRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <main dir={dir} className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <h1
            className="mx-auto text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-latin)" }}
          >
            Revisa{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#4b8bff 0%,#045eff 60%,#a9c7ff 100%)",
              }}
            >
              Smartly,
            </span>
            <br className="hidden sm:block" /> Succeed{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#4b8bff 0%,#045eff 60%,#a9c7ff 100%)",
              }}
            >
              Confidently.
            </span>
          </h1>

          {/* MISSION */}
          <div className="mt-20">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
              {t("mission.title")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {t("mission.body")}
            </p>
            <div className="mt-10 flex justify-center">
              <button className="group inline-flex items-center gap-2 rounded-full brand-gradient brand-glow px-7 py-3.5 text-sm font-bold text-white transition hover:brightness-110">
                {t("hero.cta")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ILLUSTRATION with fade to black */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <img
              src={collabImg}
              alt="تعلم تعاوني بين الطلاب"
              width={1600}
              height={1000}
              loading="lazy"
              className="w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
              style={{
                background: "linear-gradient(to bottom, transparent, #000000)",
              }}
            />
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 -bottom-1 h-40"
          style={{ background: "linear-gradient(to bottom, transparent, #000000)" }}
        />
      </section>

      {/* METHOD */}
      <section className="relative bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2
            ref={addReveal}
            className="reveal text-4xl font-extrabold leading-tight text-white sm:text-6xl"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#4b8bff,#045eff)",
              }}
            >
              {t("method.title")}
            </span>
          </h2>

          <p
            ref={addReveal}
            className="reveal mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            {t("method.body")}
          </p>
        </div>

        {/* STATS */}
        <StatsRow />
      </section>

      {/* ACCESS */}
      <section className="relative bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-6xl">
            {t("access.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {t("access.body")}
          </p>

          <div className="mt-12 flex items-center justify-center gap-6 sm:gap-10">
            <LogoBadge src="/favicon.ico" alt="Revisa" />
            <span className="text-3xl font-black text-white/40">×</span>
            <LogoBadge src={TELEGRAM_LOGO} alt="Telegram" tint="#229ED9" />
          </div>

          <p
            className="mt-8 text-xs font-bold uppercase tracking-[0.35em] text-[#4b8bff]"
            style={{ fontFamily: "var(--font-latin)" }}
          >
            {t("access.badge")}
          </p>
        </div>
      </section>

      {/* FAQ (white curved) */}
      <FaqSection />
    </main>
  );
}

function LogoBadge({ src, alt, tint }: { src: string; alt: string; tint?: string }) {
  return (
    <div
      className="grid h-24 w-24 place-items-center rounded-2xl glass brand-glow sm:h-28 sm:w-28"
      style={tint ? { boxShadow: `0 10px 40px -10px ${tint}80` } : undefined}
    >
      <img src={src} alt={alt} className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
    </div>
  );
}

/* -------- Animated stats -------- */

const STATS = [
  { key: "stats.students", value: 41374, subs: ["stats.students.sub"] },
  { key: "stats.quizzes", value: 8450, subs: ["stats.quizzes.sub"] },
  { key: "stats.defs", value: 1070, subs: ["stats.defs.sub"] },
  { key: "stats.points", value: 134691642, subs: ["stats.points.sub1", "stats.points.sub2"] },
  { key: "stats.hours", value: 306130, subs: ["stats.hours.sub1", "stats.hours.sub2"] },
];

function StatsRow() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStart(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mx-auto mt-16 grid max-w-6xl gap-5 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-5"
    >
      {STATS.map((s) => (
        <div
          key={s.key}
          className="glass rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:border-[#045eff]/50"
        >
          <div
            className="bg-clip-text text-3xl font-black text-transparent sm:text-4xl"
            style={{
              backgroundImage: "linear-gradient(135deg,#4b8bff,#045eff)",
              fontFamily: "var(--font-latin)",
            }}
          >
            <Counter target={s.value} run={start} locale={lang} />
          </div>
          <div className="mt-3 text-sm font-bold text-white">{t(s.key)}</div>
          <div className="mt-1 space-y-0.5">
            {s.subs.map((k) => (
              <div key={k} className="text-[11px] text-white/50">
                {t(k)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Counter({
  target,
  run,
  locale,
}: {
  target: number;
  run: boolean;
  locale: string;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const duration = 1800;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return <span>{n.toLocaleString(locale === "ar" ? "ar-EG" : locale)}</span>;
}

/* -------- FAQ + social -------- */

function FaqSection() {
  const { t } = useI18n();
  const items = [
    { q: "faq.q1", a: "faq.a1" },
    { q: "faq.q2", a: "faq.a2" },
    { q: "faq.q3", a: "faq.a3" },
    { q: "faq.q4", a: "faq.a4" },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-black pt-8">
      <div
        className="relative bg-white pt-20 pb-24 sm:pt-28 sm:pb-32"
        style={{ borderBottomLeftRadius: "48px", borderBottomRightRadius: "48px" }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-extrabold text-[#0a0f22] sm:text-5xl">
            {t("faq.title")}
          </h2>

          <div className="mt-10 space-y-3 text-right">
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={it.q}
                  className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                  >
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-full text-lg font-black transition ${
                        isOpen
                          ? "brand-gradient text-white"
                          : "bg-[#f1f4fb] text-[#045eff]"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                    <span className="flex-1 text-lg font-bold text-[#0a0f22]">
                      {t(it.q)}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-right text-sm leading-relaxed text-[#4a5170]">
                      {t(it.a)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Socials */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <SocialIcon href="https://tiktok.com" label="TikTok">
              <TikTokIcon />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" label="Instagram">
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon href="https://youtube.com" label="YouTube">
              <YouTubeIcon />
            </SocialIcon>
            <SocialIcon href="https://telegram.org" label="Telegram">
              <TelegramIcon />
            </SocialIcon>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-[#0a0f22] transition hover:-translate-y-0.5 hover:border-[#045eff]/40 hover:text-[#045eff]"
    >
      {children}
    </a>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.6 6.3a5.6 5.6 0 0 1-3.4-1.2A5.6 5.6 0 0 1 14.4 2h-3v13.4a2.7 2.7 0 1 1-2-2.6V9.7a5.9 5.9 0 1 0 5 5.8V9.8a8.6 8.6 0 0 0 5.2 1.7V8.4a5.6 5.6 0 0 1 0-2.1z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8zM9.8 15.4V8.6l6 3.4-6 3.4z" />
    </svg>
  );
}
function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.9 4.3 2.6 11.8c-1.3.5-1.3 1.3-.2 1.6l4.9 1.5 1.9 5.7c.2.6.4.9.9.9.4 0 .6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.6z" />
    </svg>
  );
}
