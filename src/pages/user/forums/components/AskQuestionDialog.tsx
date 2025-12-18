import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/liquid-glass-button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

type AskQuestionDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

function AskQuestionDialog({ isOpen, setIsOpen }: AskQuestionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full shadow-lg px-6">
          <Plus className="w-4 h-4 mr-2" />
          Tanya Masalah
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Tanya Komunitas</DialogTitle>
          <DialogDescription>
            Jelaskan masalah perangkatmu. Para ahli dan sesama user akan
            membantumu mencari solusi.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Masalah</Label>
            <Input id="title" placeholder="Misal: Baterai HP cepat habis" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Lengkap</Label>
            <Textarea
              id="description"
              placeholder="Ceritakan detail kerusakannya..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Kirim Pertanyaan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AskQuestionDialog;
