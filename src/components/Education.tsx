import { useLanguage } from '../i18n/LanguageContext';

function Education() {
  const { t } = useLanguage();
  const roles = t.education.roles;

  return (
    <section id="education">
      <div id="education-stage">
        <span className="eyebrow role-eyebrow">{t.education.eyebrow}</span>

        <div className="edu-rail-track">
          <span className="edu-rail-line" />
          {roles.map((role, i) => (
            <span
              className="edu-rail-dot"
              key={role.company}
              style={{ top: `${(i / (roles.length - 1)) * 100}%` }}
            />
          ))}
        </div>

        {roles.map((role, i) => {
          const hasList = 'list' in role && !!role.list;
          return (
            <div
              className={`role role-rail-layout${hasList ? ' role-cert' : ''}`}
              data-idx={i}
              key={role.company}
            >
              <div className="role-content">
                <span className="role-num">{role.num}</span>
                <h3 className="role-title">{role.company}</h3>
                <p className="role-meta">
                  {role.role}
                  {role.period ? ` · ${role.period}` : ''}
                </p>
                {role.desc && <p className="role-desc">{role.desc}</p>}
                {hasList && (
                  <ul className="role-list">
                    {role.list!.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Education;
