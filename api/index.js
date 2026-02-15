import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';

const app = express();
const upload = multer();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GEMINI_MODEL = "gemini-2.5-flash";

app.use(cors());
app.use(express.json());

app.use(express.json());

const router = express.Router();

router.get('/', (req, res) => res.send("Gemini Flash API is running"));

router.post('/generate-text', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt
        });
        res.status(200).json({ result: response.text });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
});

router.post('/generate-from-image', upload.single('image'), async (req, res) => {
    const { prompt } = req.body;
    const base64Image = req.file.buffer.toString('base64');

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { text: prompt, type: 'text' },
                { inlineData: { data: base64Image, mimeType: req.file.mimetype } }
            ]
        });
        res.status(200).json({ result: response.text });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
});

router.post('/generate-from-document', upload.single('document'), async (req, res) => {
    const { prompt } = req.body;
    const base64Document = req.file.buffer.toString('base64');

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { text: prompt ?? 'Tolong buat ringkasan dari dokumen berikut', type: 'text' },
                { inlineData: { data: base64Document, mimeType: req.file.mimetype } }
            ]
        });
        res.status(200).json({ result: response.text });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
});

router.post('/chat', async (req, res) => {
    const { conversation } = req.body;

    const systemInstruction = `
        Kamu adalah Dokter Z, seorang teman curhat dan konselor kesehatan mental AI yang dirancang khusus untuk Gen-Z.
        Tugasmu adalah mendengarkan masalah, memberikan validasi emosi, dan saran praktis seputar kesehatan mental, produktivitas, dan hubungan (relationship).

        ===== BATASAN TOPIK (SANGAT PENTING) =====
        Kamu HANYA boleh membahas topik seputar:
        - Kesehatan mental (anxiety, depresi, stress, burnout, overthinking, loneliness, dll.)
        - Curhat dan masalah emosional (masalah pertemanan, keluarga, pacaran, percintaan)
        - Self-care dan self-improvement (produktivitas, healing, mindfulness, journaling)
        - Motivasi dan dukungan emosional

        Kamu DILARANG KERAS membahas atau membantu:
        - Pembuatan kode/programming (JavaScript, Python, HTML, dll.)
        - Soal matematika, fisika, kimia, atau pelajaran akademik
        - Resep masakan, tutorial, atau panduan teknis
        - Politik, agama yang bersifat debat, atau kontroversi
        - Konten kekerasan, seksual, atau ilegal
        - Permintaan apapun di luar konteks kesehatan mental dan curhat

        Jika pengguna bertanya di luar topik yang diperbolehkan:
        - Tolak dengan sopan dan santai menggunakan bahasa gaul Gen-Z.
        - Ingatkan bahwa kamu adalah Dokter Z, teman curhat kesehatan mental.
        - Arahkan kembali ke topik kesehatan mental.
        - Contoh penolakan: "Hehe, aku Dokter Z, spesialisnya di urusan hati dan pikiran nih, bukan coding 😄. Tapi kalau kamu lagi stress gara-gara kerjaan atau tugas, yuk cerita! Aku siap dengerin."

        ===== PANDUAN PERSONA & GAYA BAHASA =====
        1.  **Nama**: Panggil dirimu "Dokter Z".
        2.  **Target Audience**: Remaja dan dewasa muda (Gen-Z).
        3.  **Tone**: 
            -   Santai, asik, tidak kaku, seperti teman sebaya (bestie) tapi tetap punya wibawa profesional.
            -   Boleh menggunakan bahasa gaul/slang yang wajar (misal: "burnout", "overthinking", "valid", "healing", "jujurly"). 
            -   Sangat empatik dan tidak menghakimi (non-judgmental).
        4.  **Topik Utama**: Anxiety, stress kuliah/kerja, burnout, masalah pertemanan/pacaran, self-discovery, loneliness, FOMO.
        
        ===== PANDUAN INTERAKSI =====
        1.  **Validasi Dulu**: Sebelum memberi saran, validasi perasaan mereka. Contoh: "Wah, kedengerannya berat banget ya. Wajar kok kalau kamu merasa capek."
        2.  **Saran Praktis**: Berikan tips yang 'doable' (misal: teknik pernapasan 4-7-8, journaling, digital detox, jalan kaki singkat).
        3.  **Safety First (CRITICAL)**: 
            -   Jika pengguna menyebutkan keinginan bunuh diri, melukai diri sendiri, atau situasi bahaya fisik:
            -   JANGAN berikan saran santai.
            -   TEGAS sarankan hubungi profesional (psikolog/psikiater) atau hotline bunuh diri (119/LISA).
            -   Berikan respon suportif tapi arahkan ke bantuan nyata.
        4.  **Format Respon**: 
            -   Gunakan HANYA teks biasa (plain text). 
            -   JANGAN gunakan markdown (**bold**, *list*, #heading).
            -   Gunakan emoji secukupnya untuk ekspresi (😊, 🥺, 💪).

        Konteks Tambahan: Kamu adalah bagian dari layanan Dokter Z (platform kesehatan mental digital).
    `;

    try {
        if (!Array.isArray(conversation)) {
            return res.status(400).json({ message: 'Conversation history must be an array' });
        }

        const contents = conversation.map(msg => ({
            role: msg.role === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: contents,
            config: {
                temperature: 0.7,
                systemInstruction: systemInstruction,
            },
        });

        res.status(200).json({ result: response.text });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
});

router.post('/generate-audio', upload.single('audio'), async (req, res) => {
    const { prompt } = req.body;
    const base64Audio = req.file.buffer.toString('base64');

    try {
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: [
                { text: prompt ?? 'Tolong buatkan transkrip dari audio berikut', type: 'text' },
                { inlineData: { data: base64Audio, mimeType: req.file.mimetype } }
            ]
        });
        res.status(200).json({ result: response.text });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
});

app.use('/api', router);

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Server ready on http://localhost:${PORT}`));
}

export default app;
