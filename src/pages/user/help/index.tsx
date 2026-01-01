import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

function HelpPage() {
  return (
    <div className="container w-full max-w-5xl mx-auto px-5 lg:py-32 py-16">
      <h1 className="scroll-m-20 mb-5 text-4xl font-extrabold tracking-tight text-balance flex items-center gap-3">
      <HelpCircle size={40}/>  Help Page
      </h1>

      <p>
        Halaman ini memberikan panduan lengkap untuk menggunakan fitur-fitur
        utama aplikasi. Pengguna dapat memahami fungsi setiap fitur, cara
        berinteraksi, dan memanfaatkan Eco Coin serta Forum untuk kegiatan
        sehari-hari. Fokus halaman ini adalah memandu pengguna agar dapat
        menggunakan semua fitur secara efektif dan efisien.
      </p>

      <div className="mt-10">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Fitur
        </h2>

        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-6">
          Eco Repair AI
        </h2>
        <p>
          Eco Repair AI adalah alat pintar yang dirancang untuk membantu
          pengguna memperbaiki peralatan elektronik dengan panduan yang jelas
          dan praktis. Pengguna dapat mengisi formulir masalah, lalu AI akan
          memberikan:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Langkah-langkah perbaikan yang terstruktur dan mudah diikuti</li>
          <li>Daftar tools yang dibutuhkan untuk setiap langkah</li>
          <li>Panduan tambahan dan video tutorial bila tersedia</li>
        </ul>

        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-6">
          Diagnosis History
        </h2>
        <p>
          Halaman Diagnosis History menyimpan semua diagnosa valid dari Eco
          Repair AI. Pengguna dapat meninjau:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Detail langkah perbaikan dari setiap diagnosa</li>
          <li>Tools yang digunakan di setiap langkah</li>
          <li>
            Video tutorial dan panduan tambahan untuk menyelesaikan masalah
            secara efektif
          </li>
        </ul>

        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-6">
          Forum
        </h2>
        <p>
          Forum adalah platform interaksi antar pengguna, tempat bertanya,
          berdiskusi, dan berbagi solusi. Fitur utama Forum meliputi:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Membuat topik baru untuk pertanyaan atau diskusi</li>
          <li>Membalas topik yang ada dan berinteraksi dengan pengguna lain</li>
          <li>
            Menandai jawaban sebagai solusi jika jawaban dianggap menyelesaikan
            masalah
          </li>
        </ul>

        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-6">
          Eco Coin
        </h2>
        <p>
          Eco Coin adalah saldo virtual yang dapat digunakan untuk meningkatkan
          pengalaman pengguna dalam aplikasi. Eco Coin memungkinkan:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Menukarkan merchandise atau voucher yang tersedia</li>
          <li>Melakukan donasi dalam aplikasi</li>
          <li>Mendapatkan reward melalui klaim harian</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="scroll-m-20 border-b mb-5 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Q&A
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="q1"
        >
          <AccordionItem value="q1" className="mb-2">
            <AccordionTrigger className="text-xl">
              Apa itu Eco Repair AI dan bagaimana cara menggunakannya?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="px-5 mt-3 text-lg">
                Eco Repair AI adalah alat cerdas untuk membantu memperbaiki
                peralatan elektronik. Pengguna cukup mengisi formulir masalah,
                lalu AI memberikan langkah-langkah perbaikan, tools yang
                dibutuhkan, dan panduan ringkas.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2" className="mb-2">
            <AccordionTrigger className="text-xl">
              Bagaimana meninjau diagnosa sebelumnya?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="px-5 mt-3 text-lg">
                Semua diagnosa valid tersimpan di Diagnosis History. Pengguna
                dapat meninjau detail perbaikan, tools yang digunakan, video
                tutorial, dan panduan tambahan.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q3" className="mb-2">
            <AccordionTrigger className="text-xl">
              Bagaimana cara membuat topik baru di Forum?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="px-5 mt-3 text-lg">
                Pengguna dapat membuat topik baru dengan menekan tombol "Buat
                Forum" dan mengisi judul serta isi topik. Topik ini akan muncul
                di tab forum sesuai kategorinya.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q4" className="mb-2">
            <AccordionTrigger className="text-xl">
              Bagaimana cara membalas forum atau menandai jawaban sebagai
              solusi?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="px-5 mt-3 text-lg">
                Pengguna dapat membalas topik forum dengan menekan tombol
                "Balas". Jawaban yang dianggap menyelesaikan masalah dapat
                ditandai sebagai solusi oleh pembuat topik atau sistem
                penilaian.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q5" className="mb-2">
            <AccordionTrigger className="text-xl">
              Apa itu Eco Coin dan bagaimana cara menggunakannya?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="px-5 mt-3 text-lg">
                Eco Coin adalah saldo virtual yang bisa ditukarkan untuk
                merchandise, voucher, atau donasi. Diperoleh melalui klaim
                harian dan dapat digunakan sesuai kebutuhan transaksi yang
                tersedia.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q6" className="mb-2">
            <AccordionTrigger className="text-xl">
              Bagaimana cara memperoleh Eco Coin setiap hari?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="px-5 mt-3 text-lg">
                Pengguna dapat memperoleh Eco Coin melalui fitur klaim harian di
                aplikasi. Setiap hari satu klaim akan menambah saldo Eco Coin
                secara otomatis.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q7" className="mb-2">
            <AccordionTrigger className="text-xl">
              Bagaimana cara menukarkan Eco Coin menjadi voucher atau
              merchandise?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="px-5 mt-3 text-lg">
                Masuk ke halaman Eco Coin, pilih voucher atau merchandise yang
                diinginkan, lalu konfirmasi penukaran. Saldo Eco Coin akan
                otomatis berkurang sesuai nilai item.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q8" className="mb-2">
            <AccordionTrigger className="text-xl">
              Apa yang harus dilakukan jika AI tidak memberikan solusi?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="px-5 mt-3 text-lg">
                Jika Eco Repair AI tidak memberikan solusi, pengguna dapat
                mencari jawaban di Forum dan berinteraksi dengan pengguna lain
                untuk solusi tambahan.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q9" className="mb-2">
            <AccordionTrigger className="text-xl">
              Bagaimana cara mencari topik atau jawaban tertentu di Forum?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="px-5 mt-3 text-lg">
                Gunakan fitur pencarian di halaman Forum untuk menemukan topik
                atau jawaban tertentu berdasarkan kata kunci, kategori, atau tab
                yang relevan.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q10" className="mb-2">
            <AccordionTrigger className="text-xl">
              Bagaimana meninjau panduan tools dan langkah perbaikan di
              Diagnosis History?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="px-5 mt-3 text-lg">
                Di halaman Diagnosis History, pilih diagnosa yang diinginkan
                untuk melihat detail langkah perbaikan, tools yang dibutuhkan,
                video tutorial, dan panduan tambahan.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default HelpPage;
