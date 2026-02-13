import { TrendingUp, Smartphone, Coffee, Moon, Smile, CheckCircle2 } from 'lucide-react';

const tips = [
    {
        icon: Smartphone,
        title: 'Digital Detox',
        description: 'Coba matikan notifikasi HP 1 jam sebelum tidur. Scrolling medsos berlebihan bisa bikin anxiety makin parah, lho.',
    },
    {
        icon: Coffee,
        title: 'Batasi Kafein',
        description: 'Kopi emang enak, tapi kalau kebanyakan bisa bikin jantung deg-degan dan cemas. Ganti dengan teh herbal atau air putih.',
    },
    {
        icon: Moon,
        title: 'Tidur Berkualitas',
        description: 'Begadang bikin emosi jadi labil. Usahakan tidur 7-8 jam biar mood kamu stabil seharian.',
    },
    {
        icon: Smile,
        title: 'Latihan Bersyukur',
        description: 'Tulis 3 hal yang kamu syukuri hari ini. Simpel, tapi ampuh banget buat naikin mood positif.',
    },
];

const articles = [
    {
        category: 'Self-Care',
        title: 'Cara Mengatasi FOMO (Fear of Missing Out) di Medsos',
        excerpt: 'Merasa tertinggal lihat postingan teman? Yuk belajar cara bodo amat yang sehat.',
        readTime: '3 menit',
    },
    {
        category: 'Productivity',
        title: 'Teknik Pomodoro: Belajar Fokus Tanpa Burnout',
        excerpt: 'Metode belajar 25 menit fokus + 5 menit istirahat yang cocok banget buat sistem kebut semalam.',
        readTime: '4 menit',
    },
    {
        category: 'Mental Health',
        title: 'Mengenal Tanda-Tanda "High Functioning Anxiety"',
        excerpt: 'Kelihatan berprestasi tapi dalamnya rapuh? Bisa jadi kamu mengalaminya.',
        readTime: '5 menit',
    },
];

export default function HealthInfo() {
    return (
        <section id="info-kesehatan" className="py-20 lg:py-28 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-primary-600 font-semibold text-sm tracking-wider uppercase">Tips Mental Health</span>
                    <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
                        Bacaan Ringan Buat Jiwa
                    </h2>
                    <p className="mt-4 text-slate-500 text-lg leading-relaxed">
                        Tips simpel yang bisa langsung kamu praktekin buat jaga kewarasan.
                    </p>
                </div>

                {/* Health Tips */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {tips.map((tip) => {
                        const Icon = tip.icon;
                        return (
                            <div
                                key={tip.title}
                                className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                                    <Icon size={20} className="text-primary-600" />
                                </div>
                                <h3 className="font-bold text-slate-800 mb-2">{tip.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{tip.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Articles */}
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-primary-600" />
                        Artikel Trending Minggu Ini
                    </h3>
                    <div className="space-y-4">
                        {articles.map((article) => (
                            <div
                                key={article.title}
                                className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-primary-200 hover:shadow-md transition-all duration-300 cursor-pointer group"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">
                                                {article.category}
                                            </span>
                                            <span className="text-xs text-slate-400">{article.readTime} baca</span>
                                        </div>
                                        <h4 className="font-bold text-slate-800 group-hover:text-primary-700 transition-colors">
                                            {article.title}
                                        </h4>
                                        <p className="mt-1 text-sm text-slate-500">{article.excerpt}</p>
                                    </div>
                                    <CheckCircle2 size={20} className="text-primary-400 hidden sm:block flex-shrink-0" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
