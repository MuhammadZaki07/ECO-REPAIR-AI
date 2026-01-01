import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/Card";
import { Controller, useForm } from "react-hook-form";
import type { MerchandiseInput } from "@/schemas/MerchandiseSchema";
import { useEffect, useState } from "react";
import type { MerchandiseModalProps } from "@/types/merchandise";
import { cn } from "@/lib/utils";

export default function MerchandiseModal({
  isOpen,
  setIsOpen,
  initialData,
  onSubmit,
}: MerchandiseModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<MerchandiseInput>({
    defaultValues: initialData ?? {
      title: "",
      description: "",
      cost_eco_coin: 0,
      stock: 0,
      is_active: true,
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState(
    initialData?.image_url ?? null
  );
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          title: "",
          description: "",
          cost_eco_coin: 0,
          stock: 0,
          is_active: true,
        });
      }
      setSelectedFile(null);
      setExistingImage(initialData?.image_url ?? null);
      setRemoveImage(false);
    }
  }, [initialData, isOpen, reset]);

  const handleFormSubmit = async (data: MerchandiseInput) => {
    await onSubmit(data, removeImage, selectedFile ?? undefined);
    reset();
    setSelectedFile(null);
    setRemoveImage(false);
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          reset();
          setSelectedFile(null);
        }
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Merchandise" : "Add Merchandise"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter merchandise title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter merchandise description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label htmlFor="cost_eco_coin">Cost</Label>
              <Input
                type="number"
                id="cost_eco_coin"
                placeholder="0"
                step={1}
                {...register("cost_eco_coin", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Cannot be negative" },
                  validate: (v) =>
                    Number.isInteger(v) || "Only whole numbers allowed",
                  onChange: (e) => {
                    let val = Number(e.target.value.replace(/^0+(?=\d)/, ""));
                    val = Math.max(0, Math.floor(val));
                    e.target.value = val.toString();
                  },
                })}
              />
              {errors.cost_eco_coin && (
                <p className="text-red-500 text-sm">
                  {errors.cost_eco_coin.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="stock">Stock</Label>
              <Input
                type="number"
                id="stock"
                placeholder="0"
                step={1}
                {...register("stock", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Cannot be negative" },
                  validate: (v) =>
                    Number.isInteger(v) || "Only whole numbers allowed",
                  onChange: (e) => {
                    let val = Number(e.target.value.replace(/^0+(?=\d)/, ""));
                    val = Math.max(0, Math.floor(val));
                    e.target.value = val.toString();
                  },
                })}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm">{errors.stock.message}</p>
              )}
            </div>
          </div>

        <div className="space-y-1">
  <Label>Image</Label>

  <Input
    id="image_input"
    type="file"
    accept="image/png, image/jpeg, image/jpg"
    placeholder="Choose an image"
    className={cn(
      "rounded-md border w-full",
      selectedFile || (existingImage && !removeImage) ? "hidden" : "block",
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
    <p className="text-red-500 text-sm">{errors.image_file.message}</p>
  )}

  {existingImage && !selectedFile && (
    <Card className="mt-2 p-5 flex flex-col gap-2 text-sm relative">
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

      <img
        src={existingImage}
        alt="Merch Image"
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
            <h1 className="font-semibold text-sm">{selectedFile.name}</h1>
            <div className="flex gap-2 items-center">
              <Badge variant={"outline"}>
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </Badge>
              <h3>{selectedFile.type}</h3>
            </div>
          </div>
        </div>
        <Badge>
          Modified: {new Date(selectedFile.lastModified).toLocaleDateString("en-GB")}
        </Badge>
      </div>
    </Card>
  )}
</div>


          <Controller
            control={control}
            name="is_active"
            defaultValue={initialData?.is_active ?? true}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="is_active"
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true)
                  }
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            )}
          />

          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
