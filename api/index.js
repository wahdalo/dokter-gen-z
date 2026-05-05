import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

const app = express();
const upload = multer();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

let openaiCompatibleClient;

function getOpenAiClient() {
  if (!openaiCompatibleClient) {
    const apiKey = process.env.OPENAI_COMPATIBLE_API_KEY;
    if (!apiKey) {
      return null;
    }
    openaiCompatibleClient = new OpenAI({
      apiKey,
      baseURL: process.env.OPENAI_COMPATIBLE_BASE_URL,
    });
  }
  return openaiCompatibleClient;
}

const GEMINI_MODEL = process.env.AI_MODEL;
const OPENAI_COMPATIBLE_MODEL = process.env.OPENAI_COMPATIBLE_MODEL;

app.use(cors());
app.use(express.json());

const router = express.Router();

router.get("/", (req, res) => res.send("Gemini Flash API is running"));

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
        - Contoh penolakan: "Hehe, aku Dokter Z, spesialisnya di urusan hati dan pikiran nih, bukan coding \u{1F604}. Tapi kalau kamu lagi stress gara-gara kerjaan atau tugas, yuk cerita! Aku siap dengerin."

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
            -   Gunakan emoji secukupnya untuk ekspresi (\u{1F60A}, \u{1F97A}, \u{1F4AA}).

        Konteks Tambahan: Kamu adalah bagian dari layanan Dokter Z (platform kesehatan mental digital).
    `;

function mapConversationToGeminiContents(conversation) {
  return conversation.map((msg) => ({
    role: msg.role === "bot" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));
}

function mapConversationToOpenAiMessages(conversation) {
  return [
    { role: "system", content: systemInstruction },
    ...conversation.map((msg) => ({
      role: msg.role === "bot" ? "assistant" : "user",
      content: msg.content,
    })),
  ];
}

async function generateWithGemini(conversation) {
  const contents = mapConversationToGeminiContents(conversation);

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents,
    config: {
      temperature: 0.7,
      systemInstruction,
    },
  });

  return response.text;
}

async function generateWithOpenAiCompatible(conversation) {
  const openaiCompatible = getOpenAiClient();
  if (!openaiCompatible || !OPENAI_COMPATIBLE_MODEL) {
    throw new Error("OpenAI-compatible provider is not configured");
  }

  const messages = mapConversationToOpenAiMessages(conversation);

  const response = await openaiCompatible.chat.completions.create({
    model: OPENAI_COMPATIBLE_MODEL,
    messages,
    temperature: 0.7,
  });

  return response.choices?.[0]?.message?.content ?? "";
}

async function generateWithFallback(conversation) {
  try {
    return await generateWithGemini(conversation);
  } catch (geminiError) {
    console.error("Gemini provider error, falling back to OpenAI-compatible:", geminiError);

    try {
      return await generateWithOpenAiCompatible(conversation);
    } catch (fallbackError) {
      console.error("OpenAI-compatible fallback also failed:", fallbackError);
      throw new Error("All AI providers failed");
    }
  }
}

router.post("/chat", async (req, res) => {
  const { conversation } = req.body;

  try {
    if (!Array.isArray(conversation)) {
      return res
        .status(400)
        .json({ message: "Conversation history must be an array" });
    }

    const result = await generateWithFallback(conversation);

    res.status(200).json({ result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

app.use("/api", router);

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;
  app.listen(PORT, () =>
    console.log(`Server ready on http://localhost:${PORT}`),
  );
}

export default app;
