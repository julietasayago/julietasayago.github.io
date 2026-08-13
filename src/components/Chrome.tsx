import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';

const SECTION_IDS = ['hero', 'intro', 'about', 'experience', 'education', 'stack', 'cta'] as const;

function Chrome() {
  const { t, lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div id="progress" />
      <div id="cursor-dot" />

      <div id="hud">
        <span className="hud-dot" />
      </div>

      <div className="hud-pct-wrap">
        <span id="hud-pct">00</span> / 100
      </div>

      <nav className="dot-nav" aria-label="Section navigation">
        {SECTION_IDS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={`dot-nav-item${id === 'hero' ? ' is-active' : ''}`}
            data-section={id}
          >
            <span className="dot-nav-label">{t.nav.sectionLabels[id]}</span>
            <span className="dot-nav-dot" />
          </a>
        ))}
      </nav>

      <a href="#hero" id="back-to-top" aria-label="Back to top">
        ↑
      </a>

      <div className="nav-controls">
        <button type="button" className="nav-toggle" onClick={toggleLang} aria-label="Toggle language">
          {lang === 'es' ? 'ES' : 'EN'}
        </button>
        <button
          type="button"
          className="nav-toggle"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
        >
          {theme === 'dark' ? '☾' : '☀'}
        </button>
        <a href="#cta" className="nav-contact">
          {t.nav.contact}
        </a>
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      <nav
        className={`mobile-menu${menuOpen ? ' is-open' : ''}`}
        aria-label="Section navigation"
        aria-hidden={!menuOpen}
      >
        {SECTION_IDS.map((id) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
            {id === 'cta' ? t.nav.contact : t.nav.sectionLabels[id]}
          </a>
        ))}
      </nav>
    </>
  );
}

export default Chrome;
