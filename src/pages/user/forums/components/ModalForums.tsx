import { useState, useEffect } from "react";
import type { SerializedEditorState } from "lexical";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/liquid-glass-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Editor } from "@/components/blocks/editor-00/editor";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useCategories } from "@/hooks/useCategories";
import { ForumService } from "@/services/forumService";
import { AuthService } from "@/services/AuthService";
import {
  askQuestionSchema,
  editForumSchema,
} from "@/schemas/ask-question.schema";
import { validateField } from "@/helpers/handleFieldValidation";
import type { ModalForumsProps } from "@/types/forum";
import { parseLexicalEditorState } from "@/helpers/parseLexicalEditorState";
import { useAuthContext } from "@/hooks/context/AuthContext";

const initialEditorState = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export default function ModalForums({
  isOpen,
  setIsOpen,
  forumId,
  initialTitle = "",
  initialDescription = initialEditorState,
  initialCategoryId = null,
  onSuccess,
}: ModalForumsProps) {
  const isEditMode = Boolean(forumId);
  const {
    categories,
    loading: catLoading,
    error: catError,
    refetch: refetchCategories,
  } = useCategories();
  const { toast } = useToast();

  const [title, setTitle] = useState(initialTitle);
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialDescription);
  const [selectedCategory, setSelectedCategory] = useState<
    number | string | null
  >(initialCategoryId);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    category?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const { user, userData } = useAuthContext();
  useEffect(() => {
    setTitle(initialTitle);
    setEditorState(
      parseLexicalEditorState(initialDescription, initialEditorState)
    );
    setSelectedCategory(initialCategoryId);
    setErrors({});
  }, [initialTitle, initialDescription, initialCategoryId]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    const fieldErrors = validateField({
      title: value,
      description: editorState,
      category_id: selectedCategory ?? undefined,
    });
    setErrors((prev) => ({
      ...prev,
      title: fieldErrors.title ?? undefined,
    }));
  };

  const handleEditorChange = (value: SerializedEditorState) => {
    setEditorState(value);
    const fieldErrors = validateField({
      title,
      description: value,
      category_id: selectedCategory ?? undefined,
    });
    setErrors((prev) => ({
      ...prev,
      description: fieldErrors.description ?? undefined,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(Number(value));
    const fieldErrors = validateField({
      title,
      description: editorState,
      category_id: Number(value),
    });
    setErrors((prev) => ({
      ...prev,
      category: fieldErrors.category ?? undefined,
    }));
  };

  const handleSubmit = async () => {
    const schema = isEditMode ? editForumSchema : askQuestionSchema;
    const parseResult = schema.safeParse({
      title,
      description: editorState,
      category_id: selectedCategory ?? undefined,
    });

    if (isEditMode && !selectedCategory) {
      toast({
        title: "Kategori kosong",
        description: "Kategori tidak boleh kosong saat edit",
        variant: "destructive",
      });
      return;
    }

    if (!parseResult.success) {
      const fieldErrors: typeof errors = {};
      parseResult.error?.issues?.forEach((err) => {
        const field = err.path?.[0];
        if (field === "category_id") fieldErrors.category = err.message;
        else if (field) fieldErrors[field as keyof typeof errors] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      if (!userData) {
        toast({
          title: "Belum login",
          description: "Silakan login dulu",
          variant: "destructive",
        });
        return;
      }

      if (isEditMode && forumId) {
        await ForumService.updateForum(
          forumId,
          title.trim(),
          selectedCategory,
          editorState
        );
        toast({ title: "Forum berhasil diupdate" });
      } else {
        await ForumService.createForum(
          userData.id,
          title.trim(),
          selectedCategory,
          editorState
        );
        toast({
          title: "Pertanyaan terkirim",
          description: "Berhasil diposting",
        });
      }

      setTitle("");
      setEditorState(initialEditorState);
      setSelectedCategory(null);
      setErrors({});
      setIsOpen(false);
      onSuccess?.();
    } catch (err: any) {
      toast({
        title: "Gagal menyimpan",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px] lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Forum" : "Tanya Komunitas"}
          </DialogTitle>
          {!isEditMode && (
            <DialogDescription>
              Jelaskan masalah perangkatmu. Para ahli dan user lain akan
              membantu.
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Masalah</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Misal: Baterai HP cepat habis"
              className={cn(
                errors.title && "border-red-500 focus-visible:ring-red-500"
              )}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="category">Kategori</Label>
            <Select
              value={selectedCategory?.toString() ?? ""}
              onValueChange={handleCategoryChange}
              disabled={catLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    catLoading ? "Memuat kategori..." : "Pilih kategori"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
            )}
            {catError && (
              <p className="text-sm text-red-500">
                Gagal memuat kategori.{" "}
                <button onClick={refetchCategories} className="underline">
                  Coba Lagi
                </button>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi Lengkap</Label>
            <div
              className={cn(
                "rounded-md",
                errors.description && "ring-1 ring-red-500"
              )}
            >
              <Editor
                editorSerializedState={editorState}
                onSerializedChange={handleEditorChange}
              />
            </div>
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading
              ? isEditMode
                ? "Menyimpan..."
                : "Mengirim..."
              : isEditMode
              ? "Simpan Perubahan"
              : "Kirim Pertanyaan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
