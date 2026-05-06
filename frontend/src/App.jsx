import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import HealthInfo from './components/HealthInfo';
import About from './components/About';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import { useScrollReveal } from './hooks/useScrollReveal';

const THEME_KEY = 'dokterz-theme';

function getInitialTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function AppSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="skeleton skeleton-circle"></div>
            <div className="skeleton skeleton-md !w-28"></div>
          </div>
          <div className="hidden md:flex items-center gap-3 w-[420px]">
            <div className="skeleton skeleton-sm !w-16"></div>
            <div className="skeleton skeleton-sm !w-16"></div>
            <div className="skeleton skeleton-sm !w-16"></div>
            <div className="skeleton skeleton-sm !w-16"></div>
            <div className="skeleton skeleton-md !w-28"></div>
          </div>
        </div>
      </div>

      <main className="pt-28 lg:pt-36">
        <section className="bg-slate-900 px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div className="skeleton skeleton-sm !w-44"></div>
              <div className="skeleton skeleton-lg !h-12 !w-full"></div>
              <div className="skeleton skeleton-lg !h-12 !w-4/5"></div>
              <div className="skeleton skeleton-md !w-full"></div>
              <div className="skeleton skeleton-md !w-3/4"></div>
              <div className="flex gap-4 pt-2">
                <div className="skeleton !h-12 !w-40"></div>
                <div className="skeleton !h-12 !w-32"></div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="skeleton !h-[420px] !w-full"></div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
              <div className="skeleton skeleton-sm !w-32 mx-auto"></div>
              <div className="skeleton skeleton-lg !w-2/3 mx-auto"></div>
              <div className="skeleton skeleton-md !w-3/4 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-3xl border border-slate-100 dark:border-slate-800 p-8 bg-slate-50 dark:bg-slate-800/80 space-y-4">
                  <div className="skeleton !w-14 !h-14"></div>
                  <div className="skeleton skeleton-md !w-2/3"></div>
                  <div className="skeleton skeleton-sm !w-full"></div>
                  <div className="skeleton skeleton-sm !w-5/6"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsBooting(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  useScrollReveal(!isBooting);

  const toggleTheme = () => {
    setTheme(current => current === 'dark' ? 'light' : 'dark');
  };

  if (isBooting) {
    return <AppSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <a href="#main-content" className="skip-link">
        Lewati ke konten utama
      </a>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenChat={() => setIsChatOpen(true)}
      />
      <main id="main-content">
        <Hero onOpenChat={() => setIsChatOpen(true)} />
        <Services />
        <HealthInfo />
        <About />
        <FAQ />
      </main>
      <Footer />
      <ChatBot isOpenExternally={isChatOpen} onToggleExternally={setIsChatOpen} />
    </div>
  );
}

export default App;
