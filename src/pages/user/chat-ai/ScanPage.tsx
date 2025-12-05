// src/app/user/scan/page.tsx

"use client";

import React, { useState } from "react";
import { Header } from "./components/Header";
import { ChatContainer } from "./components/chat/ChatContainer";
import { ChatInput } from "./components/chat/ChatInput";
import type { ChatMessageProps } from "@/types/chat-ai"; // Import interface

// --- DUMMY DATA UNTUK DEMONSTRASI UI ---
const DUMMY_MESSAGES_INITIAL: ChatMessageProps[] = [
    {
        id: 1,
        type: "user",
        text: "Saya punya masalah dengan charger laptop. Lampu indikatornya mati total. Ini fotonya.",
    },
    {
        id: 2,
        type: "ai",
        text: "Analisis: Berdasarkan foto dan deskripsi, kemungkinan besar terjadi kegagalan pada kapasitor primer atau fuse putus. Perbaikan ini memerlukan keahlian solder dan alat ukur. Prioritaskan keselamatan!",
        steps: [
            {
                label: "Identifikasi Risiko Utama",
                detail: "Jangan pernah membuka charger jika masih terhubung ke listrik. Kapasitor internal masih dapat menyimpan muatan berbahaya. Selalu buang muatan kapasitor primer terlebih dahulu.",
                tag: "RISK!",
            },
            {
                label: "Alat yang Dibutuhkan",
                detail: "Solder station, Multimeter, Solder Wick, dan obeng set T8.",
                tag: "TOOLS",
            },
            {
                label: "Langkah Pembongkaran",
                detail: "Buka casing charger dengan hati-hati menggunakan alat pemisah plastik. Jangan merusak papan sirkuit di dalamnya.",
                tag: "STEPS",
            },
            {
                label: "Komponen Pengganti",
                detail: "Siapkan fuse 5A/250V dan kapasitor 400V/68uF low ESR.",
                tag: "PARTS",
            },
        ],
    },
];
// --- AKHIR DUMMY DATA ---

export default function ScanPage() {
    // Chat & Input States
    const [messages, setMessages] = useState<ChatMessageProps[]>(DUMMY_MESSAGES_INITIAL);
    const [input, setInput] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    
    // UI/Flow States
    const [isAILoading, setIsAILoading] = useState(false);
    const [diagnosisStage, setDiagnosisStage] = useState(1); // 1 = Diagnosis Selesai
    const [ecoCoinReward, setEcoCoinReward] = useState<number | null>(500);
    const [isClaimed, setIsClaimed] = useState(false);

    // DUMMY LOGIC
    const handleSend = () => {
        if (!input.trim() && files.length === 0) return;

        // 1. Simulasikan pengiriman pesan pengguna
        const userMessage: ChatMessageProps = {
            id: Date.now(),
            type: "user",
            text: input, // Di sini nanti akan ada foto Base64
        };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setFiles([]);

        // 2. Reset status klaim dan naikkan ID
        setDiagnosisStage(0); 
        setIsClaimed(false);
        
        // 3. Simulasikan Loading
        setIsAILoading(true);
        
        // 4. Setelah 3 detik, simulasikan respons (Anda akan ganti ini dengan API Call)
        setTimeout(() => {
            setIsAILoading(false);
            // Simulasikan AI mengirim respons baru
            const aiMessage: ChatMessageProps = {
                id: Date.now() + 1,
                type: "ai",
                text: "Analisis baru selesai. Fokus pada masalah overheating.",
                steps: [{
                    label: "Bersihkan Kipas",
                    detail: "Debu menghambat aliran udara. Gunakan udara bertekanan.",
                    tag: "STEPS"
                }],
            };
            setMessages(prev => [...prev, aiMessage]);
            setDiagnosisStage(1); // Kembali ke tahap konfirmasi
        }, 3000); 
    };

    const handleClaimCoins = () => {
        alert(`Sukses! ${ecoCoinReward} Eco Coins ditambahkan ke saldo Anda.`);
        setIsClaimed(true);
    };


    return (
        <div className="flex h-screen p-3 pt-20 dark:bg-black bg-neutral-100">
            <div className="flex-1 flex flex-col h-full rounded-xl overflow-hidden bg-neutral-950/20 backdrop-blur-md border border-neutral-700/50">
                <Header />
                <ChatContainer 
                    messages={messages} 
                    isAILoading={isAILoading} 
                    diagnosisStage={diagnosisStage}
                    ecoCoinReward={ecoCoinReward}
                    isClaimed={isClaimed}
                    onClaim={handleClaimCoins}
                />
                <ChatInput
                    input={input}
                    files={files}
                    setFiles={setFiles}
                    setInput={setInput}
                    handleSend={handleSend}
                    loading={isAILoading}
                />
            </div>
        </div>
    );
}