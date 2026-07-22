import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Play, ArrowLeft } from "lucide-react";
import collabImg from "@/assets/collab-illustration.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
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
    <main dir="rtl" className="relative overflow-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
            <div className="text-right">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4b8bff] animate-pulse" />
                منصة تعلم اللغات التفاعلية
              </div>
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
                تحدث بطلاقة،{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg,#4b8bff 0%,#045eff 60%,#a9c7ff 100%)",
                  }}
                >
                  اتصل عالمياً
                </span>
              </h1>
              <p
                className="mt-4 text-lg font-medium text-white/60 sm:text-xl"
                style={{ fontFamily: "var(--font-latin)" }}
              >
                Speak Fluently, Connect Globally
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                منصة تفاعلية متقدمة تجمع بين الذكاء الاصطناعي وأساليب التعلم الحديثة
                لمساعدتك على إتقان اللغات بطلاقة. تدرّب مع محادثات حية، ومحتوى مخصص،
                ومجتمع عالمي من المتعلمين الشغوفين.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button className="group inline-flex items-center gap-2 rounded-full brand-gradient brand-glow px-7 py-3.5 text-sm font-bold text-white transition hover:brightness-110">
                  استكشف
                  <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                </button>
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 hover:text-white transition">
                  <span
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5"
                  >
                    <Play className="h-3.5 w-3.5 fill-white text-white" />
                  </span>
                  شاهد الفيديو <span className="opacity-60">&lt;</span>
                </button>
              </div>
            </div>

            {/* Video card */}
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl glass brand-glow">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(4,94,255,0.35), transparent 70%)",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <span
                      className="absolute inset-0 -m-3 rounded-full brand-gradient opacity-40 blur-xl animate-pulse"
                      aria-hidden
                    />
                    <button
                      aria-label="play"
                      className="relative grid h-20 w-20 place-items-center rounded-full brand-gradient brand-glow sm:h-24 sm:w-24"
                    >
                      <Play className="h-8 w-8 translate-x-0.5 fill-white text-white sm:h-10 sm:w-10" />
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 backdrop-blur">
                  <span
                    className="grid h-6 w-6 place-items-center rounded-md brand-gradient text-xs font-black text-white"
                    style={{ fontFamily: "var(--font-latin)" }}
                  >
                    v
                  </span>
                  <span
                    className="text-xs font-bold text-white"
                    style={{ fontFamily: "var(--font-latin)" }}
                  >
                    visa · demo
                  </span>
                </div>
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>
              </div>
              <div
                className="absolute -inset-6 -z-10 rounded-[2rem] opacity-60 blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(4,94,255,0.5), transparent 70%)",
                }}
              />
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

      {/* SCROLL REVEAL TEXT */}
      <section className="relative bg-black py-28 sm:py-40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-right">
          <p
            ref={addReveal}
            className="reveal text-sm font-bold uppercase tracking-[0.25em] text-[#4b8bff]"
            style={{ fontFamily: "var(--font-latin)" }}
          >
            Methodology
          </p>
          <h2
            ref={addReveal}
            className="reveal mt-4 text-4xl font-extrabold leading-tight text-white sm:text-6xl"
          >
            تعلم اللغات{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg,#4b8bff,#045eff)",
              }}
            >
              بشكل مختلف
            </span>
          </h2>

          <p
            ref={addReveal}
            className="reveal mt-8 text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            نعيد تعريف رحلة تعلم اللغة عبر منهجية تفاعلية تركز على المحادثة الحية
            والغمر الثقافي. لا حفظ ممل، ولا دروس نمطية — فقط تجارب حقيقية تجعلك
            تتحدث بثقة منذ اليوم الأول.
          </p>

          <p
            ref={addReveal}
            className="reveal mt-6 text-lg leading-relaxed text-white/60"
          >
            بمساعدة الذكاء الاصطناعي، نبني لك مساراً شخصياً يتكيف مع مستواك،
            وأهدافك، ووقتك. كل جلسة تقربك خطوة نحو الطلاقة، وكل محادثة تفتح لك
            نافذة على ثقافة جديدة.
          </p>

          <div
            ref={addReveal}
            className="reveal mt-14 grid gap-6 sm:grid-cols-3"
          >
            {[
              {
                k: "01",
                t: "محادثة حية",
                d: "تدرّب مع متحدثين أصليين وذكاء اصطناعي متطور.",
              },
              {
                k: "02",
                t: "مسار ذكي",
                d: "منهج يتكيف مع أسلوبك وسرعتك في التعلم.",
              },
              {
                k: "03",
                t: "مجتمع عالمي",
                d: "تواصل مع متعلمين من أكثر من 120 دولة.",
              },
            ].map((c) => (
              <div
                key={c.k}
                className="glass rounded-2xl p-6 text-right transition hover:-translate-y-1 hover:border-[#045eff]/50"
              >
                <div
                  className="text-xs font-black tracking-widest text-[#4b8bff]"
                  style={{ fontFamily: "var(--font-latin)" }}
                >
                  {c.k}
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">{c.t}</h3>
                <p className="mt-2 text-sm text-white/60">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
