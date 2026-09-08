import { useState } from 'react';
import Chrome from './components/Chrome';
import Hero from './components/Hero';
import Intro from './components/Intro';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Stack from './components/Stack';
import Cta from './components/Cta';
import Preloader from './components/Preloader';
import { LanguageProvider } from './i18n/LanguageContext';
import { ThemeProvider } from './theme/ThemeContext';
import { useScrollAnimations } from './hooks/useScrollAnimations';

function Page({ ready }: { ready: boolean }) {
  useScrollAnimations({ ready });

  return (
    <>
      <Chrome />
      <Hero />
      <Intro />
      <About />
      <Experience />
      <Education />
      <Stack />
      <Cta />
    </>
  );
}

function App() {
  const [ready, setReady] = useState(false);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Preloader onDone={() => setReady(true)} />
        <Page ready={ready} />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
