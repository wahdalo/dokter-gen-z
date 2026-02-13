import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Curhat', href: '#services' },
    { label: 'Tips', href: '#info-kesehatan' },
    { label: 'Profil', href: '#about' },
    { label: 'Kontak', href: '#kontak' },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-sm'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <a href="#beranda" className="flex items-center gap-2">
                        <img src="/logo.webp" alt="Dokter Z" className="w-10 h-10 object-contain" />
                        <h1 className="text-xl font-bold text-primary-600">
                            Dokter Z
                        </h1>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${scrolled
                                    ? 'text-slate-600 hover:text-primary-700 hover:bg-primary-50'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#kontak"
                            className="ml-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200 shadow-sm"
                        >
                            Hubungi Kami
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        id="mobile-menu-toggle"
                        onClick={() => setOpen(!open)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                            }`}
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${open ? 'max-h-96 border-t border-slate-100' : 'max-h-0'
                    } bg-white`}
            >
                <nav className="px-4 py-3 space-y-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="block px-4 py-2.5 text-slate-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg text-sm font-medium transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#kontak"
                        onClick={() => setOpen(false)}
                        className="block text-center mt-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                        Hubungi Kami
                    </a>
                </nav>
            </div>
        </header>
    );
}
