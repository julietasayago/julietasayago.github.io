import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useLanguage } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

type Motion = 'subtle' | 'balanced' | 'expressive';

interface ScrollAnimationsOptions {
  motion?: Motion;
  showCursor?: boolean;
  ready?: boolean;
}

const AMP: Record<Motion, number> = {
  subtle: 0.55,
  balanced: 1,
  expressive: 1.5,
};

export function useScrollAnimations({
  motion = 'balanced',
  showCursor = true,
  ready = true,
}: ScrollAnimationsOptions = {}) {
  const { lang, t } = useLanguage();

  useEffect(() => {
    if (!ready) return;
    const k = AMP[motion];
    const labels = t.nav.sectionLabels;
    const sectionLabels: Array<[string, string]> = [
      ['#hero', labels.hero],
      ['#intro', labels.intro],
      ['#about', labels.about],
      ['#experience', labels.experience],
      ['#education', labels.education],
      ['#stack', labels.stack],
      ['#cta', labels.cta],
    ];

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.95 });
    lenis.on('scroll', () => ScrollTrigger.update());
    const lenisRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisRaf);
    gsap.ticker.lagSmoothing(0);

    const onNativeScroll = () => ScrollTrigger.update();
    window.addEventListener('scroll', onNativeScroll, { passive: true });

    const onAnchor = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement | null;
      const a = targetEl?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const dest = document.querySelector(id);
      if (!dest) return;
      e.preventDefault();
      // Jumping straight to a pinned section's exact top lands on its
      // pre-reveal frame (nothing has animated in yet) — nudge a little
      // further in, proportional to that section's own scroll length, so
      // you land on something already appearing instead of a blank beat.
      const destHeight = dest.getBoundingClientRect().height;
      const offset = id === '#hero' ? 0 : destHeight * 0.2;
      lenis.scrollTo(dest as HTMLElement, { duration: 1.2, offset });
    };
    document.addEventListener('click', onAnchor);

    let onMove: ((e: MouseEvent) => void) | undefined;

    // gsap.context() tracks every tween/timeline/ScrollTrigger created inside it
    // (including ones created later via ctx.add) so ctx.revert() can undo all of
    // it on cleanup. Plain gsap.to/from/timeline calls aren't tied to a
    // ScrollTrigger and would otherwise survive an unmount (e.g. React 18
    // StrictMode's dev-only double-invoke of effects), leaving two copies
    // fighting over the same DOM properties.
    const ctx = gsap.context(() => {
      const q = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
      const qa = <T extends Element = HTMLElement>(s: string) =>
        Array.from(document.querySelectorAll<T>(s));

      if (showCursor && window.matchMedia('(pointer:fine)').matches) {
        const dot = q('#cursor-dot');
        if (dot) {
          const xTo = gsap.quickTo(dot, 'x', { duration: 0.5, ease: 'power3' });
          const yTo = gsap.quickTo(dot, 'y', { duration: 0.5, ease: 'power3' });
          onMove = (e) => {
            gsap.to(dot, { opacity: 0.9, duration: 0.3 });
            xTo(e.clientX - 4);
            yTo(e.clientY - 4);
          };
          window.addEventListener('mousemove', onMove);
          qa('a:not(.dot-nav-item):not(#back-to-top)').forEach((link) => {
            link.addEventListener('mouseenter', () =>
              gsap.to(dot, { scale: 3.4, opacity: 0.35, duration: 0.35 }),
            );
            link.addEventListener('mouseleave', () =>
              gsap.to(dot, { scale: 1, opacity: 0.9, duration: 0.35 }),
            );
          });
        }
      }

      // progress + hud
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          gsap.set('#progress', { scaleX: self.progress });
          const el = q('#hud-pct');
          if (el) el.textContent = String(Math.round(self.progress * 100)).padStart(2, '0');
        },
      });
      sectionLabels.forEach(([sel]) => {
        const id = sel.replace('#', '');
        ScrollTrigger.create({
          trigger: sel,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) {
              qa('.dot-nav-item').forEach((d) => d.classList.remove('is-active'));
              q(`.dot-nav-item[data-section="${id}"]`)?.classList.add('is-active');
            }
          },
        });
      });

      // back-to-top button: only once you've scrolled past the hero
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'bottom top',
        onEnter: () => q('#back-to-top')?.classList.add('is-visible'),
        onLeaveBack: () => q('#back-to-top')?.classList.remove('is-visible'),
      });

      // ---------- HERO ----------
      const letters = qa('#hero-name span');
      gsap.from(letters, {
        yPercent: 115,
        opacity: 0,
        duration: 1.15,
        ease: 'expo.out',
        stagger: 0.035,
        delay: 0.15,
      });
      gsap.to('#hero-rule', { scaleX: 1, duration: 1.4, ease: 'expo.out', delay: 0.5 });
      gsap.from('#hero-role', { opacity: 0, y: -10, duration: 1, ease: 'power3.out', delay: 0.4 });
      gsap.from('#hero-sub', { opacity: 0, y: 14, duration: 1, ease: 'power3.out', delay: 0.75 });

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: '#hero-stage',
          pinSpacing: false,
        },
      });
      heroTl
        .to('#hero-scroll', { opacity: 0, duration: 0.1 }, 0)
        .fromTo(
          letters,
          { yPercent: 0, opacity: 1 },
          {
            yPercent: -130 * k,
            opacity: 0,
            ease: 'power2.in',
            stagger: { each: 0.012, from: 'center' },
            duration: 0.45,
          },
          0,
        )
        .fromTo(
          '#hero-rule',
          { scaleX: 1 },
          { scaleX: 0, duration: 0.35, ease: 'power2.in' },
          0.05,
        )
        .fromTo('#hero-sub', { opacity: 1, y: 0 }, { opacity: 0, y: -30 * k, duration: 0.3 }, 0)
        .fromTo(
          '#hero-role',
          { opacity: 1, y: 0 },
          { opacity: 0, y: -20 * k, duration: 0.3 },
          0,
        );

      // ---------- INTRO ----------
      gsap.set('.triad-item', { y: 24 });
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#intro',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: '#intro-stage',
          pinSpacing: false,
        },
      });
      introTl
        .fromTo(
          '#intro-head',
          { opacity: 0, y: 60 * k },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' },
          0,
        )
        .to(
          '.triad-item',
          { opacity: 1, y: 0, duration: 0.12, stagger: 0.09, ease: 'power2.out' },
          0.28,
        )
        .fromTo(
          '#intro-body',
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 0.2, ease: 'power3.out' },
          0.5,
        )
        // hold — give the body copy a real reading pause before the section fades
        .to('#intro-stage', { opacity: 0, duration: 0.16 }, 1);

      // ---------- EXPERIENCE (ghost-number flourish; title reads first, clean) ----------
      const experienceTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#experience',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          pin: '#experience-stage',
          pinSpacing: false,
        },
      });
      experienceTl.fromTo(
        '#experience .role-eyebrow',
        { opacity: 0, y: -14, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.06, ease: 'power2.out' },
        0,
      );
      // Generous fixed slot per card with a real hold before it exits — same
      // fix applied to Education, so nobody gets swept away mid-read.
      let expCursor = 0.05;
      const expSlot = 0.65;
      qa('#experience .role').forEach((card) => {
        const t = expCursor;
        expCursor += expSlot;
        const exitStart = t + expSlot - 0.14;

        const bgNum = card.querySelector('.role-bg-num');
        const content = card.querySelector('.role-content');
        const words = card.querySelectorAll('.role-title-word');
        const meta = card.querySelector('.role-meta');
        const num = card.querySelector('.role-num');
        const desc = card.querySelector('.role-desc');
        experienceTl
          .fromTo(card, { opacity: 0 }, { opacity: 1, duration: 0.05 }, t)
          .fromTo(
            content,
            { rotateX: -34, transformOrigin: '50% 100%', y: 46 * k, opacity: 0 },
            { rotateX: 0, y: 0, opacity: 1, duration: 0.14, ease: 'power3.out' },
            t,
          )
          .fromTo(
            words,
            { yPercent: 120, opacity: 0, filter: 'blur(6px)' },
            {
              yPercent: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.1,
              stagger: 0.03,
              ease: 'power3.out',
            },
            t + 0.02,
          )
          .fromTo(num, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.08 }, t + 0.02)
          .fromTo(
            bgNum,
            { opacity: 0, scale: 1.22, xPercent: 6 * k },
            { opacity: 0.5, scale: 1, xPercent: 0, duration: 0.2, ease: 'power2.out' },
            t + 0.09,
          )
          .fromTo(meta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.08 }, t + 0.11)
          .fromTo(
            desc,
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.09, ease: 'power2.out' },
            t + 0.17,
          )
          .to(bgNum, { opacity: 0, xPercent: -4 * k, duration: 0.1, ease: 'power2.in' }, exitStart)
          .to(
            content,
            { rotateX: 22, y: -50 * k, opacity: 0, duration: 0.08, ease: 'power2.in' },
            exitStart,
          )
          .to(card, { opacity: 0, duration: 0.04 }, exitStart + 0.1);
      });

      // ---------- EDUCATION (cinematic: establishing rail-draw intro, then a
      // traveling "stepper" timeline where each dot lights up and stays lit) ----------
      const educationTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#education',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          pin: '#education-stage',
          pinSpacing: false,
        },
      });

      // Establishing shot: the eyebrow and the full rail draw in before any
      // card content appears, so the section announces itself first.
      const railLine = q('.edu-rail-line');
      const railDots = qa('.edu-rail-dot');
      educationTl
        .fromTo(
          '#education .role-eyebrow',
          { opacity: 0, y: -14, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.1, ease: 'power2.out' },
          0,
        )
        .fromTo(railLine, { scaleY: 0 }, { scaleY: 1, duration: 0.14, ease: 'power2.out' }, 0.02);

      // Every card gets a generous slot with a real hold/reading pause before
      // it exits; the certifications card (long list) gets even more.
      const educationCards = qa('#education .role');
      const educationSlots = educationCards.map((card) =>
        card.querySelector('.role-list') ? 1 : 0.6,
      );
      let cursor = 0.18;
      educationCards.forEach((card, i) => {
        const t = cursor;
        const slot = educationSlots[i];
        cursor += slot;

        const dot = railDots[i];
        const content = card.querySelector('.role-content');
        const meta = card.querySelector('.role-meta');
        const num = card.querySelector('.role-num');
        const body = card.querySelector('.role-desc') ?? card.querySelector('.role-list');
        const listItems = card.querySelectorAll('.role-list li');

        const exitStart = t + slot - 0.14;
        const readStart = t + 0.2;
        const readEnd = exitStart - 0.02;
        const spread = Math.max(0.02, readEnd - readStart);
        const listStagger = listItems.length > 1 ? spread / (listItems.length - 1) : 0;

        educationTl
          .fromTo(card, { opacity: 0 }, { opacity: 1, duration: 0.05 }, t)
          .fromTo(
            dot,
            { opacity: 0.4, scale: 0.6 },
            { opacity: 1, scale: 1, duration: 0.08, ease: 'back.out(2.5)' },
            t,
          )
          .call(() => dot?.classList.add('is-active'), undefined, t)
          .fromTo(
            content,
            {
              xPercent: 14 * k,
              opacity: 0,
              scale: 1.1,
              filter: 'blur(18px)',
            },
            {
              xPercent: 0,
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.2,
              ease: 'power2.out',
            },
            t,
          )
          .fromTo(num, { opacity: 0 }, { opacity: 1, duration: 0.05 }, t + 0.09)
          .fromTo(meta, { opacity: 0 }, { opacity: 1, duration: 0.06 }, t + 0.14);
        if (body) {
          educationTl.fromTo(body, { opacity: 0 }, { opacity: 1, duration: 0.07 }, t + 0.18);
        }
        if (listItems.length) {
          educationTl.fromTo(
            listItems,
            { opacity: 0, x: 16 },
            { opacity: 1, x: 0, duration: 0.06, stagger: listStagger, ease: 'power2.out' },
            readStart,
          );
        }
        educationTl.to(
          content,
          {
            xPercent: -14 * k,
            opacity: 0,
            scale: 0.92,
            filter: 'blur(18px)',
            duration: 0.14,
            ease: 'power2.in',
          },
          exitStart,
        );
        // the dot stays lit (className "is-active" is never removed) so the
        // rail reads as completed progress, not a flicker.
        educationTl.to(card, { opacity: 0, duration: 0.04 }, exitStart + 0.1);
      });

      // ---------- STACK ----------
      const track = q('#stack-track');
      const dist = () => (track ? Math.max(0, track.scrollWidth - window.innerWidth + 96) : 0);
      const stackTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#stack',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: '#stack-stage',
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
      });
      stackTl
        .fromTo(
          '.stack-item',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.12, stagger: 0.03, ease: 'power3.out' },
          0,
        )
        .to(track, { x: () => -dist(), ease: 'none', duration: 0.62 }, 0.2)
        .fromTo('#stack-note', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0.55);

      // ---------- ABOUT (pinned "writing" effect: words light up in sequence as you scroll) ----------
      const aboutWords = qa('.about-word');
      gsap.set(aboutWords, { opacity: 0.25 });
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#about',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          pin: '#about-stage',
          pinSpacing: false,
        },
      });
      aboutTl
        .fromTo(
          '.about-eyebrow',
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.06, ease: 'power3.out' },
          0,
        )
        .to(
          aboutWords,
          {
            opacity: 1,
            duration: 0.02,
            stagger: 0.02,
            ease: 'none',
          },
          0.06,
        )
        // hold — let the fully-lit paragraph sit for a proper read before it dims
        .to({}, {}, '+=0.3')
        .to(aboutWords, { opacity: 0.25, duration: 0.1, ease: 'power2.in' });

      // ---------- CTA ----------
      gsap
        .timeline({
          scrollTrigger: { trigger: '#cta', start: 'top 78%', end: 'bottom bottom', scrub: 0.5 },
        })
        .fromTo(
          '#cta-a',
          { opacity: 0, y: 90 * k },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
          0,
        )
        .fromTo(
          '#cta-b',
          { opacity: 0, y: 90 * k },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
          0.12,
        )
        .fromTo(
          '#cta-link',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.6)' },
          0.3,
        );

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', onResize);
      document.fonts.ready.then(() => ScrollTrigger.refresh());

      return () => {
        window.removeEventListener('resize', onResize);
      };
    });

    return () => {
      if (onMove) window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onNativeScroll);
      document.removeEventListener('click', onAnchor);
      gsap.ticker.remove(lenisRaf);
      ctx.revert();
      lenis.destroy();
    };
  }, [motion, showCursor, ready, lang, t]);
}

export default useScrollAnimations;
