import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Curhat", href: "#services" },
  { label: "Tips", href: "#info-kesehatan" },
  { label: "Profil", href: "#about" },
];

export default function Header({ theme, onToggleTheme, onOpenChat }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-slate-950/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#beranda" className="flex items-center gap-2">
            <img
              src="/logo.webp"
              alt="Logo Dokter Z"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-xl font-bold text-primary-600">Dokter Z</h1>
          </a>

          <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi utama">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  scrolled
                    ? "text-slate-600 dark:text-slate-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-slate-800"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onToggleTheme}
              className={`ml-1 p-2.5 rounded-lg transition-colors ${
                scrolled
                  ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={onOpenChat}
              className="ml-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200 shadow-sm"
            >
              Curhat Sekarang
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setOpen(!open)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label={open ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-[28rem] border-t border-slate-100 dark:border-slate-800" : "max-h-0"
        } bg-white dark:bg-slate-950`}
      >
        <nav id="mobile-navigation" className="px-4 py-3 space-y-1" aria-label="Navigasi mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-slate-600 dark:text-slate-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              onOpenChat();
              setOpen(false);
            }}
            className="block w-full text-center mt-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Curhat Sekarang
          </button>
        </nav>
      </div>
    </header>
  );
}
