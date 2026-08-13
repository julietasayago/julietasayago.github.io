import { useLanguage } from '../i18n/LanguageContext';

function About() {
  const { t } = useLanguage();

  return (
    <section id="about">
      <div id="about-stage">
        <div className="about-row">
          <span className="eyebrow about-eyebrow">{t.about.eyebrow}</span>
          <p id="about-copy">
            {t.about.copy.flatMap((word, i, arr) => {
              const span = (
                <span
                  className={`about-word${word.accent ? ' about-keyword' : ''}`}
                  key={i}
                >
                  {word.text}
                </span>
              );
              return i < arr.length - 1 ? [span, ' '] : [span];
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
