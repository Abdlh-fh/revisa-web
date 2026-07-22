import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ar" | "en" | "fr";

type Dict = Record<string, string>;

const DICTS: Record<Lang, Dict> = {
  ar: {
    "nav.home": "الرئيسية",
    "nav.features": "ميزات",
    "nav.about": "عن المنصة",
    "hero.tagline": "Revisa Smartly, Succeed Confidently.",
    "hero.cta": "استكشف",
    "hero.watch": "شاهد الفيديو",
    "mission.title": "مهمتنا",
    "mission.body":
      "مهمة منصة ريفيزا هي توفير كل ما يحتاجه تلميذ البكالوريا من محتوى تعليمي متكامل، تجارب إبداعية، وتطبيقات عملية. نبني بيئة تعليمية شاملة تجمع بين الجودة والتنوع لمساعدة كل تلميذ على النجاح في البكالوريا بثقة وتميّز.",
    "method.title": "الدراسة بشكل مختلف",
    "method.body":
      "منصة ريفيزا لا تُدرّسك بشكل مباشر، بل توفّر لك البيئة والموارد المثالية لتتعلم بطريقتك. من تحدّيات، امتحانات، ألعاب تعليمية، كويزات وأدوات تفاعلية — كل ما يجعل تجربتك مختلفة تماماً عن المنصات التقليدية التي تعتمد على الدورات المملة.",
    "stats.students": "إجمالي التلاميذ",
    "stats.students.sub": "(بكالوريا 2026)",
    "stats.quizzes": "عدد الكويزات",
    "stats.quizzes.sub": "(كل المواد)",
    "stats.defs": "عدد التعريفات",
    "stats.defs.sub": "(مواد الحفظ)",
    "stats.points": "النقاط",
    "stats.points.sub1": "(نشاط التلاميذ)",
    "stats.points.sub2": "(بكالوريا 2026)",
    "stats.hours": "ساعات الدراسة",
    "stats.hours.sub1": "(نشاط التلاميذ)",
    "stats.hours.sub2": "(بكالوريا 2026)",
    "access.title": "الوصول للمنصة",
    "access.body":
      "منصة ريفيزا متوفرة حصرياً وفقط عبر تلغرام لسهولة تسجيل الدخول وتجربة أكثر احترافية وسلاسة.",
    "access.badge": "شراكة رسمية",
    "faq.title": "الأسئلة الشائعة",
    "faq.q1": "ما هذا؟",
    "faq.a1":
      "ريفيزا هي منصة تعليمية جزائرية مخصصة لتلاميذ البكالوريا، متوفرة عبر تلغرام لتقديم تجربة سلسة ومباشرة.",
    "faq.q2": "لماذا نختاره؟",
    "faq.a2":
      "لأنها تجمع بين المحتوى التعليمي، الكويزات، التحديات، والتعريفات في مكان واحد، بعيداً عن الدروس النمطية.",
    "faq.q3": "لمن تم تصميمه؟",
    "faq.a3":
      "لكل تلميذ يستعد للبكالوريا ويسعى لتحقيق نتائج متميّزة بأسلوب تعلّم عصري وممتع.",
    "faq.q4": "كيف تتبعه؟",
    "faq.a4":
      "يكفي فتح تلغرام والانضمام إلى قناتنا الرسمية للوصول الفوري إلى كل الموارد والتحديات والامتحانات.",
  },
  en: {
    "nav.home": "الرئيسية",
    "nav.features": "ميزات",
    "nav.about": "عن المنصة",
    "hero.tagline": "Revisa Smartly, Succeed Confidently.",
    "hero.cta": "Explore",
    "hero.watch": "Watch video",
    "mission.title": "Our Mission",
    "mission.body":
      "Revisa's mission is to provide every Baccalaureate student with all the educational, creative, and practical content they need. We build a complete learning environment that combines quality and variety to help each student succeed with confidence.",
    "method.title": "Study Differently",
    "method.body":
      "Revisa doesn't teach you directly — instead, we provide the ideal environment and resources: challenges, exams, learning games, quizzes, and interactive tools. Everything that makes your experience completely different from traditional course-based platforms.",
    "stats.students": "Total Students",
    "stats.students.sub": "(Baccalaureate 2026)",
    "stats.quizzes": "Quizzes",
    "stats.quizzes.sub": "(All subjects)",
    "stats.defs": "Definitions",
    "stats.defs.sub": "(Memorization subjects)",
    "stats.points": "Points",
    "stats.points.sub1": "(Student activity)",
    "stats.points.sub2": "(Baccalaureate 2026)",
    "stats.hours": "Study Hours",
    "stats.hours.sub1": "(Student activity)",
    "stats.hours.sub2": "(Baccalaureate 2026)",
    "access.title": "Access the Platform",
    "access.body":
      "Revisa is available exclusively and only on Telegram for effortless sign-in and a smoother, more professional experience.",
    "access.badge": "Official partnership",
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "What is this?",
    "faq.a1":
      "Revisa is an Algerian educational platform designed for Baccalaureate students, delivered through Telegram for a seamless, direct experience.",
    "faq.q2": "Why choose it?",
    "faq.a2":
      "Because it combines lessons, quizzes, challenges, and definitions in one place — far from generic course platforms.",
    "faq.q3": "Who is it for?",
    "faq.a3":
      "For every Baccalaureate student aiming for outstanding results with a modern, engaging learning style.",
    "faq.q4": "How to follow it?",
    "faq.a4":
      "Just open Telegram and join our official channel to instantly access all resources, challenges, and exams.",
  },
  fr: {
    "nav.home": "الرئيسية",
    "nav.features": "ميزات",
    "nav.about": "عن المنصة",
    "hero.tagline": "Revisa Smartly, Succeed Confidently.",
    "hero.cta": "Explorer",
    "hero.watch": "Voir la vidéo",
    "mission.title": "Notre mission",
    "mission.body":
      "La mission de Revisa est de fournir à chaque bachelier tout le contenu éducatif, créatif et pratique dont il a besoin. Nous construisons un environnement d'apprentissage complet qui allie qualité et diversité pour aider chaque élève à réussir son baccalauréat en toute confiance.",
    "method.title": "Étudier autrement",
    "method.body":
      "Revisa ne vous enseigne pas directement : nous vous offrons l'environnement et les ressources idéales — défis, examens, jeux éducatifs, quiz et outils interactifs. Tout ce qui rend votre expérience totalement différente des plateformes traditionnelles basées sur des cours.",
    "stats.students": "Total des élèves",
    "stats.students.sub": "(Baccalauréat 2026)",
    "stats.quizzes": "Quiz",
    "stats.quizzes.sub": "(Toutes matières)",
    "stats.defs": "Définitions",
    "stats.defs.sub": "(Matières à mémoriser)",
    "stats.points": "Points",
    "stats.points.sub1": "(Activité des élèves)",
    "stats.points.sub2": "(Baccalauréat 2026)",
    "stats.hours": "Heures d'étude",
    "stats.hours.sub1": "(Activité des élèves)",
    "stats.hours.sub2": "(Baccalauréat 2026)",
    "access.title": "Accès à la plateforme",
    "access.body":
      "Revisa est disponible exclusivement et uniquement sur Telegram pour une connexion simple et une expérience plus fluide et professionnelle.",
    "access.badge": "Partenariat officiel",
    "faq.title": "Questions fréquentes",
    "faq.q1": "Qu'est-ce que c'est ?",
    "faq.a1":
      "Revisa est une plateforme éducative algérienne dédiée aux bacheliers, accessible via Telegram pour une expérience directe et fluide.",
    "faq.q2": "Pourquoi le choisir ?",
    "faq.a2":
      "Parce qu'elle réunit cours, quiz, défis et définitions au même endroit — loin des plateformes de cours classiques.",
    "faq.q3": "Pour qui est-ce conçu ?",
    "faq.a3":
      "Pour tout bachelier visant d'excellents résultats avec un apprentissage moderne et motivant.",
    "faq.q4": "Comment le suivre ?",
    "faq.a4":
      "Il suffit d'ouvrir Telegram et de rejoindre notre chaîne officielle pour accéder instantanément à toutes les ressources, défis et examens.",
  },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("revisa_lang") as Lang | null;
      if (saved && DICTS[saved]) setLangState(saved);
    } catch {}
  }, []);

  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang, dir]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("revisa_lang", l);
    } catch {}
  }, []);

  const t = useCallback((key: string) => DICTS[lang][key] ?? DICTS.ar[key] ?? key, [lang]);

  const value = useMemo(() => ({ lang, setLang, t, dir }), [lang, setLang, t, dir]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
