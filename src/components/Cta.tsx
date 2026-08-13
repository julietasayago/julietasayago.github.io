import { useLanguage } from '../i18n/LanguageContext';

const EMAIL = 'julysayago12@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/julietadelfinasayago';

function Cta() {
  const { t } = useLanguage();

  return (
    <section id="cta">
      <h2 id="cta-a">{t.cta.lineA}</h2>
      <h2 id="cta-b" className="accent-em">
        {t.cta.lineB}
      </h2>
      <a id="cta-link" className="btn-outline" href={`mailto:${EMAIL}`}>
        {t.cta.button} <span style={{ fontSize: 15 }}>→</span>
      </a>
      <div className="social-row">
        <a className="social-link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
          {t.cta.linkedin}
        </a>
        <a className="social-link" href={`mailto:${EMAIL}`}>
          {t.cta.email}
        </a>
      </div>
    </section>
  );
}

export default Cta;
