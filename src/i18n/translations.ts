export type Lang = 'es' | 'en';

interface RoleEntry {
  num: string;
  company: string;
  role: string;
  period: string;
  desc: string;
  list?: string[];
}

export interface TranslationDict {
  nav: {
    contact: string;
    sectionLabels: {
      hero: string;
      intro: string;
      about: string;
      experience: string;
      education: string;
      stack: string;
      cta: string;
    };
  };
  hero: {
    metaRole: string;
    subtitle: string;
    scrollHint: string;
  };
  intro: { head: string; triad: string[]; body: string };
  about: { eyebrow: string; copy: Array<{ text: string; accent?: boolean }> };
  experience: { eyebrow: string; roles: RoleEntry[] };
  education: { eyebrow: string; roles: RoleEntry[] };
  stack: { eyebrow: string; note: string };
  cta: { lineA: string; lineB: string; button: string; linkedin: string; email: string };
}

export const translations: Record<Lang, TranslationDict> = {
  es: {
    nav: {
      contact: 'Contacto',
      sectionLabels: {
        hero: 'Inicio',
        intro: 'Intro',
        about: 'Sobre mí',
        experience: 'Experiencia',
        education: 'Educación',
        stack: 'Stack',
        cta: 'Contacto',
      },
    },
    hero: {
      metaRole: 'Frontend Developer',
      subtitle: 'React · TypeScript · Motion',
      scrollHint: 'Scroll',
    },
    intro: {
      head: 'Construyo experiencias digitales.',
      triad: ['Diseño', 'Código', 'Motion'],
      body: 'Soy Julieta — desarrolladora frontend especializada en React y TypeScript. Diseño y construyo sitios y aplicaciones web donde interfaz, movimiento y performance son una sola decisión.',
    },
    about: {
      eyebrow: 'Sobre mí',
      copy: [
        { text: 'Técnica' },
        { text: 'en' },
        { text: 'Programación' },
        { text: 'de' },
        { text: 'la' },
        { text: 'Universidad', accent: true },
        { text: 'Nacional', accent: true },
        { text: 'Guillermo', accent: true },
        { text: 'Brown.', accent: true },
        { text: 'Hoy' },
        { text: 'trabajo' },
        { text: 'como' },
        { text: 'frontend' },
        { text: 'developer' },
        { text: 'en' },
        { text: 'Gauchino', accent: true },
        { text: 'Software,', accent: true },
        { text: 'construyendo' },
        { text: 'interfaces' },
        { text: 'con' },
        { text: 'React,', accent: true },
        { text: 'y' },
        { text: 'TypeScript.', accent: true },
        { text: 'Me' },
        { text: 'apasiona' },
        { text: 'explorar' },
        { text: 'tecnología' },
        { text: 'nueva' },
        { text: '—' },
        { text: 'hoy' },
        { text: 'mi' },
        { text: 'foco' },
        { text: 'son' },
        { text: 'los' },
        { text: 'sitios', accent: true },
        { text: 'con', accent: true },
        { text: 'animaciones', accent: true },
        { text: 'guiadas', accent: true },
        { text: 'por', accent: true },
        { text: 'scroll.', accent: true },
      ],
    },
    experience: {
      eyebrow: 'Experiencia',
      roles: [
        {
          num: '01',
          company: 'Gauchino Software',
          role: 'Frontend Developer',
          period: 'Dic 2025 — Presente',
          desc: 'Desarrollo de interfaces con React y TypeScript, integrando APIs REST y usando herramientas de IA para acelerar el desarrollo. Implementación de funcionalidades a partir de diseños UX/UI reales.',
        },
        {
          num: '02',
          company: 'MCR Contadores',
          role: 'Auxiliar Contable',
          period: 'Marzo 2022 — Presente',
          desc: 'Más de 4 años de gestión administrativa y atención directa a clientes, con foco en precisión, organización y resolución de problemas — la misma disciplina que hoy aplico al desarrollo.',
        },
      ],
    },
    education: {
      eyebrow: 'Educación',
      roles: [
        {
          num: '01',
          company: 'Universidad Nacional Guillermo Brown',
          role: 'Tecnicatura Universitaria en Programación',
          period: '2023 — 2025',
          desc: 'Formación universitaria enfocada en programación, con base en lógica, desarrollo web y buenas prácticas.',
        },
        {
          num: '02',
          company: 'Instituto Sara Chamberlain de Eccleston',
          role: 'Bachiller en Economía y Administración',
          period: '2017 — 2022',
          desc: 'Educación secundaria orientada a economía y administración.',
        },
        {
          num: '03',
          company: 'Certificaciones',
          role: 'Cursos y formaciones complementarias',
          period: '',
          desc: '',
          list: [
            'Oracle Cloud Infrastructure 2025 Certified Foundations Associate — Oracle',
            'Claude Code in Action — Anthropic',
            'Bootcamp Desarrollo de software con agentes (Kiro) — Código Facilito',
            'Certificación Avanzada en Full Stack Developer — ITBA',
            'Curso de Back-End / Java — Agencia de Habilidades para el Futuro',
            'Front-End JS — Talento Tech',
            'Desarrollo de Proyecto "Desarrollo FULL STACK" (Acelerador IT 2024) — Rol UX',
            'Codo a Codo 4.0 – Diseño UX-UI Avanzado',
            'Diseño UX-UI — Codo a Codo 4.0',
            'Pearson Edexcel Level I Certificate in ESOL International (CEF B2)',
          ],
        },
      ],
    },
    stack: {
      eyebrow: 'Stack',
      note: 'Además, herramientas de IA en el flujo de trabajo diario — para moverme más rápido, no para reemplazar el criterio.',
    },
    cta: {
      lineA: '¿Tenés una idea?',
      lineB: 'Construyámosla.',
      button: 'Contactame',
      linkedin: 'LinkedIn',
      email: 'Email',
    },
  },
  en: {
    nav: {
      contact: 'Contact',
      sectionLabels: {
        hero: 'Hero',
        intro: 'Intro',
        about: 'About',
        experience: 'Experience',
        education: 'Education',
        stack: 'Stack',
        cta: 'Contact',
      },
    },
    hero: {
      metaRole: 'Frontend Developer',
      subtitle: 'React · TypeScript · Motion',
      scrollHint: 'Scroll',
    },
    intro: {
      head: 'I build digital experiences.',
      triad: ['Design', 'Code', 'Motion'],
      body: "I'm Julieta — a frontend developer working with React and TypeScript. I design and build websites and web apps where interface, motion and performance are one single decision.",
    },
    about: {
      eyebrow: 'About',
      copy: [
        { text: 'University' },
        { text: 'Technician' },
        { text: 'in' },
        { text: 'Programming' },
        { text: 'from' },
        { text: 'Universidad', accent: true },
        { text: 'Nacional', accent: true },
        { text: 'Guillermo', accent: true },
        { text: 'Brown.', accent: true },
        { text: 'Today' },
        { text: 'I' },
        { text: 'work' },
        { text: 'as' },
        { text: 'a' },
        { text: 'frontend' },
        { text: 'developer' },
        { text: 'at' },
        { text: 'Gauchino', accent: true },
        { text: 'Software,', accent: true },
        { text: 'building' },
        { text: 'interfaces' },
        { text: 'with' },
        { text: 'React', accent: true },
        { text: 'and' },
        { text: 'TypeScript.', accent: true },
        { text: 'I' },
        { text: 'love' },
        { text: 'exploring' },
        { text: 'new' },
        { text: 'technology' },
        { text: '—' },
        { text: 'these' },
        { text: 'days' },
        { text: 'my' },
        { text: 'focus' },
        { text: 'is' },
        { text: 'scroll-driven', accent: true },
        { text: 'websites.', accent: true },
      ],
    },
    experience: {
      eyebrow: 'Experience',
      roles: [
        {
          num: '01',
          company: 'Gauchino Software',
          role: 'Frontend Developer',
          period: 'Dec 2025 — Present',
          desc: 'Building interfaces with React and TypeScript, integrating REST APIs and using AI tooling to speed up development. Implementing features from real UX/UI designs.',
        },
        {
          num: '02',
          company: 'MCR Contadores',
          role: 'Accounting Assistant',
          period: 'March 2022 — Present',
          desc: '4+ years of administrative management and direct client support, with a focus on precision, organization and problem-solving — the same discipline I bring to development today.',
        },
      ],
    },
    education: {
      eyebrow: 'Education',
      roles: [
        {
          num: '01',
          company: 'Universidad Nacional Guillermo Brown',
          role: 'University Degree in Programming',
          period: '2023 — 2025',
          desc: 'University-level program focused on programming, covering logic, web development and best practices.',
        },
        {
          num: '02',
          company: 'Instituto Sara Chamberlain de Eccleston',
          role: 'High School Diploma, Economics & Administration',
          period: '2017 — 2022',
          desc: 'Secondary education focused on economics and administration.',
        },
        {
          num: '03',
          company: 'Certifications',
          role: 'Additional courses and training',
          period: '',
          desc: '',
          list: [
            'Oracle Cloud Infrastructure 2025 Certified Foundations Associate — Oracle',
            'Claude Code in Action — Anthropic',
            'AI Agent-Based Software Development Bootcamp (Kiro) — Código Facilito',
            'Advanced Full Stack Developer Certification — ITBA',
            'Back-End / Java Course — Agencia de Habilidades para el Futuro',
            'Front-End JS — Talento Tech',
            '"Desarrollo FULL STACK" Project (IT Accelerator 2024) — UX Role',
            'Codo a Codo 4.0 – Advanced UX-UI Design',
            'UX-UI Design — Codo a Codo 4.0',
            'Pearson Edexcel Level I Certificate in ESOL International (CEF B2)',
          ],
        },
      ],
    },
    stack: {
      eyebrow: 'Stack',
      note: 'Plus AI tooling in the daily workflow — used to move faster, not to replace the thinking.',
    },
    cta: {
      lineA: 'Have an idea?',
      lineB: "Let's build it.",
      button: 'Contact me',
      linkedin: 'LinkedIn',
      email: 'Email',
    },
  },
};
