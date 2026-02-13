import { Award, GraduationCap, HeartHandshake } from 'lucide-react';

export default function About() {
    return (
        <section id="about" className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Image / Visual */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl p-8 lg:p-12">
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center text-4xl">
                                        🧠
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800">Dokter Z</h3>
                                        <p className="text-primary-600 text-sm font-medium">Sahabat Mental Health Kamu</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Award size={16} className="text-primary-500 flex-shrink-0" />
                                        <span>AI Canggih Berbasis Empati</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <GraduationCap size={16} className="text-primary-500 flex-shrink-0" />
                                        <span>Dilatih dengan Psikologi Modern</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <HeartHandshake size={16} className="text-primary-500 flex-shrink-0" />
                                        <span>100% Non-Judgmental</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative floating elements */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-200/40 rounded-full blur-xl" />
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-200/40 rounded-full blur-xl" />
                    </div>

                    {/* Right: Text content */}
                    <div>
                        <span className="text-primary-600 font-semibold text-sm tracking-wider uppercase">Siapa Dokter Z?</span>
                        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
                            Bukan Dokter Biasa, <br />Ini Teman Cerita.
                        </h2>
                        <p className="mt-6 text-slate-500 leading-relaxed">
                            Kami paham banget kalau ngomongin kesehatan mental itu kadang masih dianggap tabu atau 'lebay'.
                            Makanya Dokter Z hadir.
                        </p>
                        <p className="mt-4 text-slate-500 leading-relaxed">
                            Kami menggabungkan kecerdasan buatan dengan pendekatan psikologi yang hangat dan manusiawi.
                            Tujuannya satu: mastiin kamu punya tempat aman buat cerita kapanpun kamu butuh, tanpa takut dihakimi,
                            tanpa ribet, dan gratis.
                        </p>

                        {/* Feature highlights */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            {[
                                { num: '24 Jam', label: 'Standby Terus' },
                                { num: 'Privasi', label: 'Dijamin Aman' },
                                { num: 'Gratis', label: 'Selamanya' },
                                { num: 'Gen-Z', label: 'Friendly Mode' },
                            ].map((item) => (
                                <div key={item.label} className="bg-slate-50 rounded-xl p-4 text-center">
                                    <div className="text-xl font-bold text-primary-700">{item.num}</div>
                                    <div className="text-xs text-slate-500 mt-1">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
