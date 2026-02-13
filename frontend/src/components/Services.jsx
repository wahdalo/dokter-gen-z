import { Brain, Heart, Moon, Smile, Zap, Shield } from 'lucide-react';

export default function Services() {
    return (
        <section id="services" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-50/50 via-transparent to-transparent opacity-70"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3 block">Topik Curhat</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                        Apa yang Bisa Kita Obrolin?
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Gak ada topik yang tabu. Dari masalah kuliah, kerjaan, sampai percintaan, Dokter Z siap dengerin.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Service 1 */}
                    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                            <Brain className="text-blue-600 group-hover:text-white transition-colors" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Stress & Burnout</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Lelah mental gara-gara tugas numpuk atau kerjaan toxic? Yuk urai benang kusut di kepalamu.
                        </p>
                    </div>

                    {/* Service 2 */}
                    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-600 transition-colors">
                            <Heart className="text-pink-600 group-hover:text-white transition-colors" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Love & Relationships</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Galau putus cinta, terjebak friendzone, atau toxic relationship? Validasi perasaanmu di sini.
                        </p>
                    </div>

                    {/* Service 3 */}
                    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                            <Moon className="text-purple-600 group-hover:text-white transition-colors" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Susah Tidur (Insomnia)</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Overthinking tiap malam? Dokter Z punya tips relaksasi biar bisa tidur nyenyak.
                        </p>
                    </div>

                    {/* Service 4 */}
                    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                            <Smile className="text-green-600 group-hover:text-white transition-colors" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Self-Discovery</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Bingung sama tujuan hidup atau merasa 'lost'? Mari kita cari tahu potensimu bareng-bareng.
                        </p>
                    </div>

                    {/* Service 5 */}
                    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                            <Zap className="text-orange-600 group-hover:text-white transition-colors" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Anxiety & Panic</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Sering cemas berlebihan atau deg-degan tanpa sebab? Pelajari teknik grounding yang ampuh.
                        </p>
                    </div>

                    {/* Service 6 */}
                    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                            <Shield className="text-indigo-600 group-hover:text-white transition-colors" size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Ruang Aman</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Cerita apa aja tanpa takut dihakimi. Privasi kamu adalah prioritas nomor satu Dokter Z.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
