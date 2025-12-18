import NotFoundSVG from "@/assets/svg/404.svg";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <img
          src={NotFoundSVG}
          alt="404"
          className="w-full max-w-xs mx-auto mb-6"
        />

        <h1 className="text-4xl md:text-6xl font-bold mb-3">404</h1>
        <p className="text-lg md:text-xl mb-6">
          Halaman yang kamu cari tidak ditemukan.
        </p>

        <Button
          onClick={() => (window.location.href = "/")}
          className="cursor-pointer"
          variant={"outline"}
        >
          Kembali
        </Button>
      </div>
    </div>
  );
}
