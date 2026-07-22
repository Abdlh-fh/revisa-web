import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "ميزات — visa" },
      { name: "description", content: "استكشف ميزات منصة visa لتعلم اللغات." },
      { property: "og:title", content: "ميزات — visa" },
      {
        property: "og:description",
        content: "استكشف ميزات منصة visa لتعلم اللغات.",
      },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return <Placeholder title="ميزات" subtitle="Features" />;
}

export function Placeholder({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <main
      dir="rtl"
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <div className="glass rounded-3xl p-10 sm:p-14 max-w-lg brand-glow">
        <p
          className="text-xs font-bold uppercase tracking-[0.3em] text-[#4b8bff]"
          style={{ fontFamily: "var(--font-latin)" }}
        >
          {subtitle}
        </p>
        <h1 className="mt-4 text-5xl font-extrabold text-white">{title}</h1>
        <p className="mt-4 text-white/60">
          هذه الصفحة قيد التطوير — سنعرض هنا قريباً محتوى مميزاً.
        </p>
      </div>
    </main>
  );
}
