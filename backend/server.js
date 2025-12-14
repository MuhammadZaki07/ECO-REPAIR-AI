import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "20mb" }));

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY tidak ditemukan. Tambahkan di file .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/api/models", async (_req, res) => {
  try {
    const modelsList = await genAI.models.list({ pageSize: 50 });
    const available = modelsList.filter((m) =>
      m.supportedGenerationMethods.includes("generateContent")
    );
    res.json(available);
  } catch (err) {
    res.status(500).json({ error: "ListModels gagal", detail: err });
  }
});

app.post("/api/diagnose", async (req, res) => {
  try {
    const { description, imageBase64 } = req.body;
    if (!description && !imageBase64) {
      return res.status(400).json({ error: "Input tidak ditemukan" });
    }

    const systemInstruction = `
      Kamu adalah Environmental Science AI Assistant.

      ATURAN KERAS:
      - Output WAJIB JSON VALID
      - TIDAK BOLEH ADA TEKS DI LUAR JSON
      - Jika ragu, isi string kosong atau array kosong

      SCHEMA WAJIB:
      {
        "title": "string",
        "summary": "string",
        "sections": [
          {
            "type": "analysis | impact | application | risk | next",
            "label": "string",
            "items": [
              {
                "title": "string",
                "description": "string"
              }
            ]
          }
        ]
      }
      `;

    const prompt = `
    ${systemInstruction}

    Pertanyaan user:
    ${description || "-"}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const parts = [{ text: prompt }];
    if (imageBase64) {
      parts.push({
        inlineData: {
          data: imageBase64.replace(/^data:image\/\w+;base64,/, ""),
          mimeType: "image/jpeg",
        },
      });
    }

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
    });

    let aiData;
    try {
      aiData = JSON.parse(result.response.text());
    } catch {
      aiData = {
        title: "Response tidak valid",
        summary: "AI gagal menghasilkan format data yang benar.",
        sections: [],
      };
    }

    aiData.title ??= "";
    aiData.summary ??= "";
    aiData.sections = Array.isArray(aiData.sections) ? aiData.sections : [];

    res.json({
      success: true,
      data: aiData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "AI gagal memproses permintaan",
      detail: err?.message || err,
    });
  }
});

app.listen(3001, () => console.log("Server berjalan di port 3001"));
