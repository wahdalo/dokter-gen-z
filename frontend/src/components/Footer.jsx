import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="kontak" className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <img src="/logo.webp" alt="Dokter Z" className="w-10 h-10 object-contain" />
                            <span className="text-xl font-bold text-white">Dokter Z</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-6 text-slate-400">
                            Teman curhat AI yang siap dengerin keluh kesahmu 24/7.
                            Jaga kesehatan mental itu penting, dan kamu gak sendirian.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Menu</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="#" className="hover:text-primary-400 transition-colors">
                                    Beranda
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="hover:text-primary-400 transition-colors">
                                    Topik Curhat
                                </a>
                            </li>
                            <li>
                                <a href="#info-kesehatan" className="hover:text-primary-400 transition-colors">
                                    Tips Waras
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="hover:text-primary-400 transition-colors">
                                    Kenalan Dulu
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Topik Populer</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Stress Akademik</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Burnout Kerja</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Relationship Drama</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Insecurity</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Susah Tidur</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Kontak Darurat</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <Phone size={18} className="text-primary-500 mt-0.5" />
                                <div>
                                    <div className="text-white font-medium">Hotline Bunuh Diri</div>
                                    <div className="text-slate-400">119 / 500-454</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={18} className="text-primary-500 mt-0.5" />
                                <div>
                                    <div className="text-white font-medium">Email Kami</div>
                                    <a href="mailto:curhat@dokterz.ahdx.dev" className="hover:text-primary-400 transition-colors">
                                        curhat@dokterz.ahdx.dev
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary-500 mt-0.5" />
                                <div>
                                    <div className="text-white font-medium">Basecamp</div>
                                    <span className="text-slate-400">Jakarta Selatan, Indonesia</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <div>
                        &copy; {new Date().getFullYear()} Dokter Z. All rights reserved.
                    </div>
                    <div className="flex items-center gap-1">
                        Dibuat dengan <Heart size={14} className="text-red-500 fill-red-500" /> untuk Gen-Z Indonesia
                    </div>
                </div>
            </div>
        </footer>
    );
}
