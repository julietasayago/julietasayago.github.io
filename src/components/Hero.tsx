import { useLanguage } from '../i18n/LanguageContext';

const NAME_LETTERS = ['J', 'U', 'L', 'I', 'E', 'T', 'A', ' ', 'S', 'A', 'Y', 'A', 'G', 'O'];

function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero">
      <div id="hero-stage">
        <h1 id="hero-name">
          {NAME_LETTERS.map((letter, i) =>
            letter === ' ' ? (
              <span key={i} className="hero-space" />
            ) : (
              <span key={i}>{letter}</span>
            ),
          )}
        </h1>

        <p id="hero-role">{t.hero.metaRole}</p>

        <div id="hero-rule" />

        <p id="hero-sub">{t.hero.subtitle}</p>

        <div id="hero-scroll">
          <span>{t.hero.scrollHint}</span>
          <span className="scroll-hint-line" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
