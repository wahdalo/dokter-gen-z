const faqs = [
  {
    question: 'Apakah Dokter Z gratis?',
    answer:
      'Ya, Dokter Z gratis dan bisa digunakan kapan saja untuk ruang cerita suportif.',
  },
  {
    question: 'Apakah percakapan di Dokter Z anonim?',
    answer:
      'Dokter Z dirancang sebagai ruang cerita minim identitas pribadi. Tetap hindari membagikan data sensitif saat bercerita.',
  },
  {
    question: 'Apakah Dokter Z menggantikan psikolog atau psikiater?',
    answer:
      'Tidak. Dokter Z adalah teman curhat AI, bukan pengganti psikolog, psikiater, diagnosis medis, terapi profesional, atau layanan darurat.',
  },
  {
    question: 'Topik apa saja yang bisa dibicarakan di Dokter Z?',
    answer:
      'Kamu bisa ngobrol soal burnout, stres, overthinking, anxiety, loneliness, hubungan, self-care, journaling, dan topik kesehatan mental ringan lainnya.',
  },
  {
    question: 'Apa yang harus dilakukan jika sedang dalam kondisi darurat?',
    answer:
      'Jika kamu merasa dalam bahaya, ingin melukai diri, atau mengalami kondisi krisis, segera hubungi orang terpercaya, tenaga profesional, atau layanan darurat terdekat seperti 119.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-wider uppercase">
            FAQ Dokter Z
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white tracking-tight">
            Hal yang Sering Ditanyain
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
            Biar kamu makin paham soal cara kerja, batasan, dan posisi Dokter Z sebagai teman cerita AI.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item) => (
            <article
              key={item.question}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-6 reveal"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.question}</h3>
              <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">{item.answer}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm leading-relaxed text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
          Dokter Z adalah teman curhat AI dan bukan pengganti psikolog, psikiater, dokter, diagnosis, terapi profesional, atau layanan darurat. Jika kamu merasa dalam bahaya atau ingin melukai diri, segera hubungi orang terpercaya, tenaga profesional, atau layanan darurat setempat.
        </div>
      </div>
    </section>
  );
}
