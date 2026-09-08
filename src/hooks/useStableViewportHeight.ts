import { useEffect } from 'react';

// `100dvh` is *live*: on mobile it keeps recalculating as the browser's
// address bar collapses. Scroll-snap sections size themselves off it so the
// snap point doesn't leave a gap once the bar hides (see index.css) — but
// that collapse is triggered by the user's very first scroll gesture, so the
// mandatory snap target on mobile is a moving one for that first swipe,
// which reads as a cut/stutter. Freezing the measured height into a CSS var
// — updated only once things settle, never mid-gesture — keeps each section
// a stable size while scrolling and still ends up at the fully-collapsed
// height afterward, so later swipes size correctly against it too.
export function useStableViewportHeight() {
  useEffect(() => {
    const root = document.documentElement;
    const viewport = window.visualViewport;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const commit = () => {
      const height = viewport ? viewport.height : window.innerHeight;
      root.style.setProperty('--vh100', `${height}px`);
    };
    commit();

    const scheduleCommit = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(commit, 150);
    };

    const target: VisualViewport | Window = viewport ?? window;
    target.addEventListener('resize', scheduleCommit);

    return () => {
      if (timer) clearTimeout(timer);
      target.removeEventListener('resize', scheduleCommit);
    };
  }, []);
}

export default useStableViewportHeight;
