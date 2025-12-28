import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { CategorySchema } from "@/schemas/CategorySchema";

interface CategoryModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialData: { id: number; name: string } | null;
  onSuccess: () => void;
  onSubmit: (name: string) => Promise<void>;
}

export default function CategoryModal({
  isOpen,
  setIsOpen,
  initialData,
  onSuccess,
  onSubmit,
}: CategoryModalProps) {
  const [name, setName] = React.useState(initialData?.name ?? "");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setName(initialData?.name ?? "");
    setError(null);
  }, [initialData, isOpen]);

  const handleSubmit = async () => {
    const result = CategorySchema.safeParse({ name });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);
      await onSubmit(name);
      setIsOpen(false);
      setName("");
      setError(null);
      onSuccess();
    } catch (err: any) {
      setError(err.message ?? "There is an error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {initialData ? "Edit Category" : "Add Category"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Masukkan nama kategori.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-2">
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) {
                const valid = CategorySchema.safeParse({
                  name: e.target.value,
                });
                if (valid.success) setError(null);
              }
            }}
            className={error ? "border-destructive" : ""}
            placeholder="Category name"
          />
          {error && <p className="text-destructive text-sm mt-1">{error}</p>}
        </div>

        <AlertDialogFooter className="flex justify-end space-x-2 mt-4">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>

          <Button
            onClick={handleSubmit}
            className="disabled:cursor-progress"
            disabled={loading}
            variant="default"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
