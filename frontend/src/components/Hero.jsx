import { Heart, ArrowRight } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

export default function Hero() {
    return (
        <section id="beranda" className="relative bg-slate-900 pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden items-center -mb-1">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-slate-900">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/40 via-slate-900 to-slate-900"></div>
                {/* Logo Watermark */}
                <div className="absolute inset-0 bg-[url('/logo.webp')] bg-no-repeat bg-center bg-[length:600px] lg:bg-[length:800px] opacity-10 pointer-events-none blur-3xl lg:blur-none mix-blend-overlay lg:translate-x-[-70px]"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Text Content */}
                    <div className="text-center lg:text-left z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/10 border border-primary-200/20 text-primary-100 mb-6 backdrop-blur-sm mx-auto lg:mx-0">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium">Teman Curhat Gen-Z #1</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                            Jaga Waras di <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
                                Era Gila
                            </span>
                        </h1>

                        <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Lagi burnout, overthinking, atau butuh temen curhat yang gak nge-judge?
                            Dokter Z siap dengerin keluh kesahmu 24/7.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                onClick={() => document.getElementById('chatbot-toggle')?.click()}
                                className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-semibold transition-all shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2 group"
                            >
                                Curhat Sekarang
                                <MessageCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <a href="#services" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-semibold transition-all backdrop-blur-sm flex items-center justify-center gap-2">
                                Cek Fitur
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>

                        <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 max-w-md mx-auto lg:mx-0">
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                                <div className="text-xs text-slate-400">Selalu Ada</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">Privasi</div>
                                <div className="text-xs text-slate-400">Dijamin Aman</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white mb-1">Gratis</div>
                                <div className="text-xs text-slate-400">Selamanya</div>
                            </div>
                        </div>
                    </div>

                    {/* Visual / Illustration */}
                    <div className="hidden lg:flex justify-end">
                        <div className="relative w-full max-w-sm lg:max-w-md scale-110 origin-right">
                            {/* Main card */}
                            <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                                        <Heart size={28} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">Dokter Z</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            <p className="text-slate-400 text-xs">Online • Siap dengerin</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-white/5 rounded-2xl p-4 rounded-tr-none border border-white/5 ml-auto max-w-[90%]">
                                        <p className="text-slate-200 text-sm">"Dok, aku lagi capek banget sama tugas kuliah... rasanya pengen nyerah 😭"</p>
                                    </div>
                                    <div className="bg-primary-600/20 rounded-2xl p-4 rounded-tl-none border border-primary-500/20 max-w-[90%]">
                                        <p className="text-primary-100 text-sm font-medium">
                                            "It's okay to be tired, bestie. Istirahat dulu yuk? Tarik napas panjang... kamu udah berjuang hebat lho hari ini! 💪"
                                        </p>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute -right-6 top-1/2 p-3 bg-slate-800 rounded-2xl border border-white/10 shadow-xl animate-bounce duration-[3000ms]">
                                    <span className="text-2xl">🔋</span>
                                </div>
                                <div className="absolute -left-6 bottom-10 p-3 bg-slate-800 rounded-2xl border border-white/10 shadow-xl animate-bounce duration-[4000ms]">
                                    <span className="text-2xl">✨</span>
                                </div>
                            </div>

                            {/* Abstract blobs */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl -z-10"></div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[40px] md:h-[60px]">
                    <path d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 33.3C672 36.7 768 43.3 864 45C960 46.7 1056 43.3 1152 40C1248 36.7 1344 33.3 1392 31.7L1440 30V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0Z" fill="white" />
                </svg>
            </div>
        </section>
    );
}
