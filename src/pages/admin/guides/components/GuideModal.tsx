import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Editor } from "@/components/blocks/editor-00/editor";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import type { GuideForm, GuideModalProps } from "@/types/Guide";
import { initialEditorState } from "@/config/initialEditor";
import { useToast } from "@/hooks/use-toast";
import { parseLexicalEditorState } from "@/utils/parseLexicalEditorState";

export default function GuideModal({
  isOpen,
  setIsOpen,
  initialData,
  onSubmit,
  schema,
  onSuccess,
  categories = [],
}: GuideModalProps) {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState(false);
  const [editorState, setEditorState] = useState<any>(
    parseLexicalEditorState(initialData?.content, initialEditorState)
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<GuideForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      category_id: undefined,
      content: initialEditorState,
      image_file: null,
    },
  });

  const categoryValue = useWatch({
    control,
    name: "category_id",
  });

  useEffect(() => {
    if (initialData) {
      const safeContent = parseLexicalEditorState(
        initialData.content,
        initialEditorState
      );

      reset({
        title: initialData.title,
        category_id: initialData.category_id ?? undefined,
        content: safeContent,
        image_file: null,
      });

      setEditorState(safeContent);
      setExistingImage(initialData.image_url ?? null);
      setRemoveImage(false);
      setViewMode(initialData.editable === false);
    } else {
      reset();
      setEditorState(initialEditorState);
      setExistingImage(null);
      setRemoveImage(false);
      setViewMode(false);
    }

    setSelectedFile(null);
  }, [initialData, reset]);

  const handleFormSubmit: SubmitHandler<GuideForm> = (data) => {
    onSubmit({
      ...data,
      content: editorState,
      image_file: selectedFile,
      remove_image: removeImage,
    });

    setEditorState(initialEditorState);
    setSelectedFile(null);
    reset();
    onSuccess?.();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          reset();
          setEditorState(initialEditorState);
          setSelectedFile(null);
        }
      }}
    >
      <DialogContent className="sm:max-w-[525px] lg:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Guide" : "Create Guide"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input
                {...register("title")}
                disabled={viewMode}
                className={cn(
                  "rounded-md border w-full",
                  errors.title && "border-red-500"
                )}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-1 w-full">
              <Label>Category</Label>
              <Select
                disabled={viewMode}
                value={categoryValue?.toString() ?? ""}
                onValueChange={(val) =>
                  setValue("category_id", Number(val), {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger
                  className={cn(
                    "w-full rounded-md border",
                    errors.category_id && "border-red-500"
                  )}
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category_id && (
                <p className="text-red-500 text-sm">
                  {errors.category_id.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <Label>Image</Label>

            <Input
              id="image_input"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              disabled={viewMode}
              className={cn(
                "rounded-md border w-full",
                selectedFile || (existingImage && !removeImage)
                  ? "hidden"
                  : "block",
                errors.image_file && "border-red-500"
              )}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const validTypes = ["image/png", "image/jpeg", "image/jpg"];
                if (!validTypes.includes(file.type)) {
                  toast({
                    title: "Invalid file type",
                    description: "Only PNG, JPG, or JPEG images are allowed.",
                    variant: "destructive",
                  });

                  const input = document.getElementById(
                    "image_input"
                  ) as HTMLInputElement;
                  if (input) input.value = "";
                  return;
                }

                setSelectedFile(file);
                setExistingImage(null);
                setRemoveImage(false);
                setValue("image_file", file, { shouldValidate: true });
              }}
            />

            {errors.image_file && (
              <p className="text-red-500 text-sm">
                {errors.image_file.message}
              </p>
            )}

            {existingImage && !selectedFile && (
              <Card className="mt-2 p-5 flex flex-col gap-2 text-sm relative">
                {!viewMode && (
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-red-500 text-lg text-white cursor-pointer hover:bg-red-600 rounded-full w-5 h-6 flex items-center justify-center"
                    onClick={() => {
                      setExistingImage(null);
                      setRemoveImage(true);
                    }}
                  >
                    ×
                  </button>
                )}

                <img
                  src={existingImage}
                  alt="Guide image"
                  className="w-full h-40 object-cover rounded"
                />
              </Card>
            )}

            {selectedFile && (
              <Card className="mt-2 p-5 flex flex-col gap-1 text-sm relative">
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-500 text-lg text-white cursor-pointer hover:bg-red-600 rounded-full w-5 h-6 flex items-center justify-center"
                  onClick={() => {
                    setSelectedFile(null);
                    setRemoveImage(true);
                    setValue("image_file", null);

                    const input = document.getElementById(
                      "image_input"
                    ) as HTMLInputElement;
                    if (input) input.value = "";
                  }}
                >
                  ×
                </button>

                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div className="space-y-1.5">
                      <h1 className="font-semibold text-sm">
                        {selectedFile.name}
                      </h1>
                      <div className="flex gap-2 items-center">
                        <Badge variant={"outline"}>
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </Badge>
                        /<h3>{selectedFile.type}</h3>
                      </div>
                    </div>
                  </div>
                  <Badge>
                    Modified:{" "}
                    {new Date(selectedFile.lastModified).toLocaleDateString(
                      "en-GB"
                    )}
                  </Badge>
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-1">
            <Label>Content</Label>
            <div
              className={cn(
                "rounded-md border",
                errors.content && "border-red-500"
              )}
            >
              <Editor
                editorSerializedState={editorState}
                onSerializedChange={(state) => {
                  setEditorState(state);
                  setValue("content", state, { shouldValidate: true });
                }}
              />
            </div>
            {errors.content && (
              <p className="text-red-500 text-sm">{errors?.content?.message}</p>
            )}
          </div>

          <DialogFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              {viewMode ? "Close" : "Cancel"}
            </Button>
            {!viewMode && <Button type="submit">Save</Button>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
