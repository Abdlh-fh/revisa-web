import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";

const LANGS: { code: Lang; name: string; flag: string }[] = [
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

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
          className={`glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6 ${
            scrolled ? "shadow-[0_10px_40px_-10px_rgba(4,94,255,0.35)]" : ""
          }`}
          dir="ltr"
        >
          {/* Left cluster: controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hamburger */}
            <div className="relative">
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
                <div className="absolute start-0 mt-2 w-52 rounded-xl border border-white/15 bg-[#0a0f22]/95 backdrop-blur-xl p-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
                  <MenuLink to="/" label={t("nav.home")} onClick={() => setMenuOpen(false)} />
                  <MenuLink to="/features" label={t("nav.features")} onClick={() => setMenuOpen(false)} />
                  <MenuLink to="/about" label={t("nav.about")} onClick={() => setMenuOpen(false)} />
                  <button className="sm:hidden mt-1 w-full rounded-lg brand-gradient px-3 py-2 text-sm font-semibold text-white">
                    تسجيل الدخول
                  </button>
                </div>
              )}
            </div>

            {/* Log in */}
            <button className="hidden sm:inline-flex rounded-full brand-gradient brand-glow px-5 py-2 text-sm font-semibold text-white hover:brightness-110 transition">
              تسجيل الدخول
            </button>

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
                <div className="absolute start-0 mt-2 w-44 rounded-xl border border-white/15 bg-[#0a0f22]/95 backdrop-blur-xl p-1 shadow-2xl animate-in fade-in slide-in-from-top-2">
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
          </div>

          {/* Right: Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span
              className="text-2xl font-extrabold tracking-tight"
              style={{ color: "#045eff", fontFamily: "var(--font-latin)" }}
            >
              revisa
            </span>
            <img
              src="/favicon.ico"
              alt="Revisa"
              className="h-9 w-9 rounded-lg object-contain"
            />
          </Link>
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
