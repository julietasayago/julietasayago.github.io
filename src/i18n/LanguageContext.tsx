import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { translations, type Lang, type TranslationDict } from './translations';

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: TranslationDict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'portfolio-lang';

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'es';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'en' || stored === 'es' ? stored : 'es';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getInitialLang);

  const toggleLang = () => {
    // Sections are pinned/scroll-scrubbed on desktop, and their scrub
    // timelines get torn down and rebuilt for the new text as soon as `lang`
    // changes. Doing that mid-section (translated copy is a different length,
    // GSAP's per-element transforms briefly resolve against the old layout)
    // can leave text visibly overlapping for a moment — jumping to the top
    // first means the rebuild always happens on the simple, unpinned state.
    window.scrollTo(0, 0);
    setLang((prev) => {
      const next = prev === 'es' ? 'en' : 'es';
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, toggleLang, t: translations[lang] }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
