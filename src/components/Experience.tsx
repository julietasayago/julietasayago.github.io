import { useLanguage } from '../i18n/LanguageContext';

function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience">
      <div id="experience-stage">
        <span className="eyebrow role-eyebrow">{t.experience.eyebrow}</span>

        {t.experience.roles.map((role, i) => (
          <div className="role" data-idx={i} key={role.company}>
            <span className="role-bg-num">{role.num}</span>
            <div className="role-content">
              <span className="role-num">{role.num}</span>
              <h3 className="role-title">
                {role.company.split(' ').flatMap((word, w, arr) => {
                  const span = (
                    <span className="role-title-word" key={w}>
                      {word}
                    </span>
                  );
                  return w < arr.length - 1 ? [span, ' '] : [span];
                })}
              </h3>
              <p className="role-meta">
                {role.role}
                {role.period ? ` · ${role.period}` : ''}
              </p>
              <p className="role-desc">{role.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
