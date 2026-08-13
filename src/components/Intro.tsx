import { useLanguage } from '../i18n/LanguageContext';

function Intro() {
  const { t } = useLanguage();

  return (
    <section id="intro">
      <div id="intro-stage">
        <h2 id="intro-head">{t.intro.head}</h2>

        <div id="intro-triad">
          <span className="triad-item">{t.intro.triad[0]}</span>
          <span className="triad-item triad-plus">+</span>
          <span className="triad-item">{t.intro.triad[1]}</span>
          <span className="triad-item triad-plus">+</span>
          <span className="triad-item">{t.intro.triad[2]}</span>
        </div>

        <p id="intro-body">{t.intro.body}</p>
      </div>
    </section>
  );
}

export default Intro;
