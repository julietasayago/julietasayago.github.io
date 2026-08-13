import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

function Preloader({ onDone }: { onDone: () => void }) {
  const [hidden, setHidden] = useState(false);
  const curtainRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    let cancelled = false;

    const minDelay = new Promise((resolve) => setTimeout(resolve, 500));
    Promise.all([document.fonts.ready, minDelay]).then(() => {
      if (cancelled) return;
      const curtain = curtainRef.current;
      if (!curtain) {
        document.documentElement.style.overflow = '';
        setHidden(true);
        doneRef.current();
        return;
      }
      gsap.to(curtain, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        onComplete: () => {
          document.documentElement.style.overflow = '';
          setHidden(true);
          doneRef.current();
        },
      });
    });

    return () => {
      cancelled = true;
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (hidden) return null;
  return <div id="preloader-curtain" ref={curtainRef} />;
}

export default Preloader;
