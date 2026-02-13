import { Smartphone, Coffee, Moon, Smile, BookOpen, Dumbbell, Brain, Users } from 'lucide-react';

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
    {
        icon: BookOpen,
        title: 'Journaling',
        description: 'Coba tulis perasaan kamu di jurnal tiap hari. Nggak perlu panjang, 5 menit aja udah cukup buat ngeluarin uneg-uneg.',
    },
    {
        icon: Dumbbell,
        title: 'Olahraga Ringan',
        description: 'Jalan kaki 15 menit atau stretching ringan bisa bantu ngeluarin endorfin. Mood langsung naik tanpa perlu nge-gym berat.',
    },
    {
        icon: Brain,
        title: 'Batasi Multitasking',
        description: 'Fokus satu hal dulu, baru lanjut ke yang lain. Multitasking justru bikin otak capek dan produktivitas turun.',
    },
    {
        icon: Users,
        title: 'Quality Time',
        description: 'Luangkan waktu buat ngobrol sama teman atau keluarga. Koneksi sosial itu penting banget buat kesehatan mental.',
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
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

            </div>
        </section>
    );
}
