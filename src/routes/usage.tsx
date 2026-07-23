import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "./features";

export const Route = createFileRoute("/usage")({
  head: () => ({
    meta: [
      { title: "الاستخدام — Revisa" },
      { name: "description", content: "طريقة استخدام منصة ريفيزا." },
      { property: "og:title", content: "الاستخدام — Revisa" },
      { property: "og:description", content: "طريقة استخدام منصة ريفيزا." },
    ],
  }),
  component: () => <Placeholder title="الاستخدام" subtitle="Usage" />,
});
