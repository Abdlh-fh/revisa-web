import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";

const LANGS: { code: Lang; name: string; flag: string }[] = [
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

const NAV_LINKS = [
  { to: "/features", key: "nav.features" },
  { to: "/usage", key: "nav.usage" },
  { to: "/about", key: "nav.about" },
] as const;

export function Nav() {
  const { lang, setLang, t } = useI18n();
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const active = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setLangOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div
      ref={rootRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          className="flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6 border border-white/10"
          dir="ltr"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,22,70,0.92) 0%, rgba(8,14,76,0.88) 100%)",
            backdropFilter: "blur(18px)",
            boxShadow: scrolled
              ? "0 10px 40px -10px rgba(4,94,255,0.45)"
              : "0 6px 24px -12px rgba(4,94,255,0.35)",
          }}
        >
          {/* Left: Logo */}
          <Link to="/" className="flex items-center group leading-none">
            <img
              src="/favicon.ico"
              alt="Revisa"
              className="h-9 w-9 object-contain"
            />
            <span
              className="font-extrabold tracking-tight leading-none"
              style={{
                color: "#045eff",
                fontFamily: "var(--font-latin)",
                fontSize: "2.25rem",
                marginInlineStart: "-2px",
              }}
            >
              visa
            </span>
          </Link>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop inline links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-full px-3.5 py-2 text-sm font-semibold text-white/85 hover:text-white hover:bg-white/10 transition"
                  activeProps={{ className: "bg-white/10 text-[#8ab3ff]" }}
                >
                  {t(l.key)}
                </Link>
              ))}
            </div>

            {/* Language */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangOpen((v) => !v);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white/90 hover:bg-white/10 transition"
              >
                <Globe className="h-4 w-4 opacity-70" />
                <span className="hidden sm:inline">{active.flag}</span>
                <span>{active.name}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </button>
              {langOpen && (
                <div className="absolute end-0 mt-2 w-44 rounded-xl border border-white/15 bg-[#0a1246]/95 backdrop-blur-xl p-1 shadow-2xl animate-in fade-in slide-in-from-top-2">
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/10 transition ${
                        l.code === active.code ? "text-[#4b8bff]" : "text-white/85"
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger (mobile only) */}
            <div className="relative md:hidden">
              <button
                onClick={() => {
                  setMenuOpen((v) => !v);
                  setLangOpen(false);
                }}
                aria-label="menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                {menuOpen ? (
                  <X className="h-5 w-5 text-white" />
                ) : (
                  <Menu className="h-5 w-5 text-white" />
                )}
              </button>
              {menuOpen && (
                <div className="absolute end-0 mt-2 w-52 rounded-xl border border-white/15 bg-[#0a1246]/95 backdrop-blur-xl p-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
                  <MenuLink to="/" label={t("nav.home")} onClick={() => setMenuOpen(false)} />
                  {NAV_LINKS.map((l) => (
                    <MenuLink
                      key={l.to}
                      to={l.to}
                      label={t(l.key)}
                      onClick={() => setMenuOpen(false)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

function MenuLink({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white transition"
      activeProps={{ className: "bg-white/10 text-[#4b8bff]" }}
      activeOptions={{ exact: true }}
    >
      {label}
    </Link>
  );
}
