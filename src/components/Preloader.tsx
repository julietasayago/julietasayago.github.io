import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

function Preloader({ onDone }: { onDone: () => void }) {
  const [hidden, setHidden] = useState(false);
  const curtainRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    // No scroll lock here on purpose: it used to set overflow:hidden on
    // <html> for the curtain's duration, cleared once the lift tween
    // completed. Real mobile browsers decide whether a touch gesture is
    // "a scroll" at touchstart and don't reconsider mid-gesture — a swipe
    // that started even a few ms before that clear landed on a locked
    // document and stayed a no-op for its whole duration even though the
    // lock lifted partway through it, needing a second, fresh swipe to
    // actually move. Confirmed with Playwright: a touch spanning the
    // unlock moment never scrolls; a first, isolated swipe after it works
    // immediately. The lock's only purpose was to stop the hero's old
    // load-in reveal from racing a scroll mid-animation — that reveal was
    // removed entirely (see Hero/useScrollAnimations), so nothing is
    // protected by keeping it, and it's cheaper to just not have a race to
    // lose.
    let cancelled = false;

    const minDelay = new Promise((resolve) => setTimeout(resolve, 500));
    Promise.all([document.fonts.ready, minDelay]).then(() => {
      if (cancelled) return;
      const curtain = curtainRef.current;
      if (!curtain) {
        setHidden(true);
        doneRef.current();
        return;
      }
      gsap.to(curtain, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        onComplete: () => {
          setHidden(true);
          doneRef.current();
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (hidden) return null;
  return <div id="preloader-curtain" ref={curtainRef} />;
}

export default Preloader;
