import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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

const BRAND_GRADIENT = "linear-gradient(135deg,#4b8bff 0%,#045eff 60%,#a9c7ff 100%)";

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
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: BRAND_GRADIENT }}
            >
              Revisa
            </span>{" "}
            Smartly,
            <br className="hidden sm:block" />{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: BRAND_GRADIENT }}
            >
              Succeed
            </span>{" "}
            Confidently.
          </h1>

          {/* MISSION */}
          <div className="mt-20">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
              {t("mission.title")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {t("mission.body")}
            </p>
          </div>
        </div>
      </section>

      {/* ILLUSTRATION with softer fade */}
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
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(8,14,76,0.85))",
              }}
            />
          </div>
        </div>
      </section>

      {/* METHOD + STATS wrapped in themed background */}
      <section
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{ background: "#080E4C" }}
      >
        {/* Impurity blobs top */}
        <div
          className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl opacity-70"
          style={{ background: "radial-gradient(circle, #0f5588 0%, transparent 70%)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(circle, #0f5588 0%, transparent 70%)" }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2
            ref={addReveal}
            className="reveal text-4xl font-extrabold leading-tight text-white sm:text-6xl"
          >
            {t("method.title")}
          </h2>

          <p
            ref={addReveal}
            className="reveal mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl"
          >
            {t("method.body")}
          </p>
        </div>

        {/* STATS */}
        <StatsRow />
      </section>

      {/* ACCESS */}
      <section
        className="relative py-24 sm:py-32"
        style={{ background: "#080E4C" }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-6xl">
            {t("access.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {t("access.body")}
          </p>

          <div className="mt-12 flex items-center justify-center gap-6 sm:gap-10">
            <LogoBadge>
              <img src="/favicon.ico" alt="Revisa" className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
            </LogoBadge>
            <span className="text-3xl font-black text-white/40">×</span>
            <LogoBadge tint="#229ED9">
              <TelegramMark />
            </LogoBadge>
          </div>

          <p
            className="mt-8 text-xs font-bold uppercase tracking-[0.35em] text-[#4b8bff]"
            style={{ fontFamily: "var(--font-latin)" }}
          >
            {t("access.badge")}
          </p>
        </div>
      </section>

      {/* FAQ (white curved TOP) */}
      <FaqSection />
    </main>
  );
}

function LogoBadge({ children, tint }: { children: React.ReactNode; tint?: string }) {
  return (
    <div
      className="grid h-24 w-24 place-items-center rounded-2xl glass brand-glow sm:h-28 sm:w-28"
      style={tint ? { boxShadow: `0 10px 40px -10px ${tint}80` } : undefined}
    >
      {children}
    </div>
  );
}

function TelegramMark() {
  return (
    <svg
      viewBox="0 0 240 240"
      className="h-14 w-14 sm:h-16 sm:w-16"
      aria-label="Telegram"
    >
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#37AEE2" />
          <stop offset="1" stopColor="#1E96C8" />
        </linearGradient>
      </defs>
      <circle cx="120" cy="120" r="120" fill="url(#tg)" />
      <path
        fill="#FFFFFF"
        d="M53 116.5c34-14.8 56.7-24.6 68-29.4 32.4-13.6 39.1-16 43.5-16 1 0 3.1.2 4.5 1.3 1.2.9 1.5 2.1 1.7 3 .1.8.3 2.7.1 4.2-1.9 20-10.2 68.5-14.4 90.9-1.8 9.5-5.3 12.7-8.6 13-7.3.7-12.8-4.8-19.9-9.4-11-7.3-17.3-11.8-28-19-12.4-8.2-4.4-12.7 2.7-20 1.9-1.9 34-31.1 34.6-33.7.1-.3.2-1.5-.6-2.2-.7-.7-1.8-.4-2.6-.2-1.1.2-18.7 11.9-52.9 34.9-5 3.4-9.5 5.1-13.6 5-4.5-.1-13.1-2.5-19.5-4.6-7.9-2.6-14.1-3.9-13.6-8.3.3-2.3 3.4-4.6 9.6-7.1z"
      />
    </svg>
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
  const { t } = useI18n();
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
      className="relative mx-auto mt-20 grid max-w-6xl gap-8 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-5"
    >
      {STATS.map((s, i) => (
        <div
          key={s.key}
          className={`text-center reveal ${start ? "in" : ""}`}
          style={{ transitionDelay: `${i * 140}ms` }}
        >
          <div
            className="text-4xl font-black text-white sm:text-5xl lg:text-[3.25rem] tracking-tight"
            style={{ fontFamily: "var(--font-latin)" }}
          >
            <Counter target={s.value} run={start} delay={i * 140} />
          </div>
          <div className="mt-4 text-sm font-bold text-white/90">{t(s.key)}</div>
          <div className="mt-1 space-y-0.5">
            {s.subs.map((k) => (
              <div key={k} className="text-[11px] text-white/55">
                {t(k)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Counter({ target, run, delay = 0 }: { target: number; run: boolean; delay?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const duration = 2200;
    let raf = 0;
    let t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [run, target, delay]);
  return <span>{n.toLocaleString("en-US")}</span>;
}

function Counter({ target, run }: { target: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const duration = 3200;
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
  return <span>{n.toLocaleString("en-US")}</span>;
}

/* -------- FAQ + social -------- */

function FaqSection() {
  const { t, dir } = useI18n();
  const items = [
    { q: "faq.q1", a: "faq.a1" },
    { q: "faq.q2", a: "faq.a2" },
    { q: "faq.q3", a: "faq.a3" },
    { q: "faq.q4", a: "faq.a4" },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative" style={{ background: "#080E4C" }}>
      <div
        className="relative bg-white pt-24 pb-20 sm:pt-32 sm:pb-24"
        style={{ borderTopLeftRadius: "48px", borderTopRightRadius: "48px" }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <span
            className="inline-block rounded-full bg-[#045eff]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-[#045eff]"
            style={{ fontFamily: "var(--font-latin)" }}
          >
            FAQ
          </span>
          <h2 className="mt-5 text-4xl font-extrabold text-[#0a0f22] sm:text-5xl">
            {t("faq.title")}
          </h2>

          <div className="mt-12 space-y-4" dir={dir}>
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={it.q}
                  className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-[#045eff]/30 bg-white shadow-[0_10px_40px_-12px_rgba(4,94,255,0.35)]"
                      : "border-black/8 bg-white/70 hover:border-[#045eff]/20 hover:bg-white"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 px-6 py-5"
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-base font-black transition ${
                        isOpen
                          ? "brand-gradient text-white shadow-md"
                          : "bg-[#f1f4fb] text-[#045eff] group-hover:bg-[#e6ecfb]"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                    <span className="flex-1 text-center text-lg font-bold text-[#0a0f22]">
                      {t(it.q)}
                    </span>
                    <span className="h-9 w-9 shrink-0" aria-hidden />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-center text-[15px] leading-relaxed text-[#4a5170]">
                        {t(it.a)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Socials */}
          <div className="mt-14 flex items-center justify-center gap-4">
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

          <p className="mt-8 text-xs font-medium text-[#4a5170]/70">
            {t("footer.rights")}
          </p>
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
