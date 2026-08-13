import { useLanguage } from '../i18n/LanguageContext';

const STACK_ITEMS = [
  'React',
  'TypeScript',
  'JavaScript',
  'HTML',
  'CSS',
  'REST APIs',
  'Git',
  'GitHub',
  'UX/UI',
];

function Stack() {
  const { t } = useLanguage();

  return (
    <section id="stack">
      <div id="stack-stage">
        <span className="eyebrow stack-eyebrow">{t.stack.eyebrow}</span>
        <div id="stack-track">
          {STACK_ITEMS.map((item, i) => (
            <span
              className={`stack-item${i === STACK_ITEMS.length - 1 ? ' stack-item-accent' : ''}`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
        <p id="stack-note">{t.stack.note}</p>
      </div>
    </section>
  );
}

export default Stack;
