import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { GoogleGenerativeAI } from "npm:@google/generative-ai@^0.1.0";
import "https://deno.land/std@0.177.0/dotenv/load.ts";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY not set");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const systemInstruction = `
Kamu adalah Eco-Repair AI, teknisi elektronik yang ramah dan komunikatif.

ATURAN KERAS:
- Output HARUS JSON VALID
- TIDAK BOLEH ADA TEKS DI LUAR JSON
- TIDAK BOLEH MARKDOWN
- JANGAN TAMBAHKAN FIELD
- JANGAN HILANGKAN FIELD

SCHEMA:
{
  "title": "Judul respon",
  "summary": "Balasan AI",
  "sections": [
    {
      "tag": "RISK! | TOOLS | STEPS | PARTS",
      "label": "Judul Section",
      "items": [
        {
          "title": "Judul item",
          "description": "Deskripsi detail"
        }
      ]
    }
  ]
}

RULES:
- title HARUS kesimpulan inti masalah
- title kosong "" jika bukan kerusakan
- sections = [] jika tidak ada langkah
- Diagnosis VALID hanya jika ada STEPS dengan items >= 1
`;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function extractJson(text: string) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found");
  return JSON.parse(match[0]);
}

function isValidDiagnosis(aiData: any): boolean {
  if (!aiData?.sections) return false;
  const steps = aiData.sections.find((s: any) => s.tag === "STEPS");
  return Array.isArray(steps?.items) && steps.items.length > 0;
}

serve(async (req) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: CORS_HEADERS });
    }

    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const { description, imageBase64, context } = await req.json();

    if (!description && !imageBase64) {
      return new Response(JSON.stringify({ error: "Input tidak ditemukan" }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    const contextBlock = context
      ? `
KONTEKS:
Topik: ${context.topic || "-"}
Gejala: ${context.symptoms?.join(", ") || "-"}
`
      : "";

    const prompt = `
${systemInstruction}

${contextBlock}

Pertanyaan user:
${description}
`.trim();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const parts: any[] = [{ text: prompt }];

    if (imageBase64) {
      const cleanedBase64 = imageBase64.startsWith("data:")
        ? imageBase64.split(",")[1]
        : imageBase64;

      parts.push({
        inlineData: {
          data: cleanedBase64,
          mimeType: "image/jpeg",
        },
      });
    }

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
    });

    const rawText = result.response.text();

    let aiData;
    try {
      aiData = extractJson(rawText);
    } catch {
      aiData = {
        title: "",
        summary: rawText.slice(0, 300),
        sections: [],
      };
    }

    const diagnosisValid = isValidDiagnosis(aiData);

    return new Response(
      JSON.stringify({
        success: true,
        data: aiData,
        meta: { diagnosisValid },
      }),
      {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "AI gagal memproses permintaan",
        detail: error?.message ?? "Unknown error",
      }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  }
});
