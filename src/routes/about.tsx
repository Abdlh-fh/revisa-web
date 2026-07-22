import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "./features";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن المنصة — visa" },
      { name: "description", content: "تعرّف على منصة visa ورؤيتها." },
      { property: "og:title", content: "عن المنصة — visa" },
      { property: "og:description", content: "تعرّف على منصة visa ورؤيتها." },
    ],
  }),
  component: () => <Placeholder title="عن المنصة" subtitle="About Us" />,
});
