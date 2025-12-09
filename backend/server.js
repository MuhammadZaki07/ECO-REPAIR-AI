import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" })); // penting untuk image base64

const PORT = process.env.PORT || 3001;

app.post("/api/diagnose", async (req, res) => {
  try {
    const { description, imageBase64 } = req.body;

    if (!description && !imageBase64) {
      return res
        .status(400)
        .json({ error: "Deskripsi atau gambar harus ada." });
    }

    // Simulasi respons AI
    res.json({
      analysisSummary: "Ini hasil analisis AI.",
      steps: [{ label: "Langkah 1", detail: "Detail 1", tag: "STEPS" }],
    });
  } catch (error) {
    console.error("Error di /api/diagnose:", error);
    res.status(500).json({ error: "AI gagal memproses permintaan." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
