import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type {
  DonationCampaignForm,
  DonationModalProps,
} from "@/types/donations";

export default function DonationCampaignModal({
  isOpen,
  setIsOpen,
  initialData,
  onSubmit,
  schema,
  onSuccess,
}: DonationModalProps) {
  const { toast } = useToast();
  const [viewMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<DonationCampaignForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      goal_eco_coin: 0,
      is_active: true,
      image_file: undefined,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset({
        title: "",
        description: "",
        goal_eco_coin: 0,
        is_active: true,
        image_file: undefined,
      });

      setSelectedFile(null);
      setExistingImage(null);
      setRemoveImage(false);

      const input = document.getElementById("image_input") as HTMLInputElement;
      if (input) input.value = "";

      return;
    }

    // SAAT MODAL DIBUKA
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description ?? "",
        goal_eco_coin: initialData.goal_eco_coin,
        is_active: initialData.is_active ?? true,
        image_file: undefined,
      });

      setExistingImage(initialData.image_url ?? null);
      setSelectedFile(null);
      setRemoveImage(false);
    } else {
      reset({
        title: "",
        description: "",
        goal_eco_coin: 0,
        is_active: true,
        image_file: undefined,
      });

      setExistingImage(null);
      setSelectedFile(null);
      setRemoveImage(false);
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit: SubmitHandler<DonationCampaignForm> = async (
    data
  ) => {
    try {
      setIsSubmitting(true);

      await onSubmit({
        ...data,
        image: selectedFile,
        remove_image: removeImage,
      });

      reset();
      setSelectedFile(null);
      setExistingImage(null);
      setRemoveImage(false);

      onSuccess?.();
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
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
      <DialogContent className="sm:max-w-[525px] lg:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData
              ? "Edit Donation Campaign"
              : "Create Donation Campaign"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              {...register("title")}
              placeholder="Enter donation campaign title"
              disabled={viewMode}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Brief explanation about this donation campaign"
              disabled={viewMode}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-3">
              <Label>Goal Eco Coin</Label>
              <Input
                type="number"
                placeholder="Target eco coin (ex: 1000)"
                disabled={viewMode}
                {...register("goal_eco_coin", {
                  setValueAs: (v) => {
                    if (v === "" || v == null) return 0;
                    const n = Number(v);
                    return Number.isNaN(n) ? 0 : n;
                  },
                })}
              />
              {errors.goal_eco_coin && (
                <p className="text-sm text-red-500">
                  {errors.goal_eco_coin.message}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <Label>Image</Label>

              <Input
                id="image_input"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                disabled={viewMode}
                className={cn(
                  "rounded-md border w-full",
                  existingImage && !removeImage ? "hidden" : "block",
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
                    return;
                  }

                  setSelectedFile(file);
                  setExistingImage(null);
                  setRemoveImage(false);
                  setValue("image_file", file, { shouldValidate: true });
                }}
              />

              {errors.image_file && (
                <p className="text-sm text-red-500">
                  {errors.image_file.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={viewMode}
                  />
                  <Label className="cursor-pointer">Active Campaign</Label>
                </>
              )}
            />
          </div>

          {existingImage && !selectedFile && (
            <Card className="mt-2 p-5 flex flex-col gap-2 text-sm relative">
              {!viewMode && (
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-500 text-lg text-white cursor-pointer hover:bg-red-600 rounded-full w-5 h-6 flex items-center justify-center"
                  onClick={() => {
                    setExistingImage(null);
                    setRemoveImage(true);
                    setValue("image_file", undefined);
                  }}
                >
                  ×
                </button>
              )}

              <img
                src={existingImage}
                alt="Campaign image"
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
                  setValue("image_file", undefined);

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
                      <Badge variant="outline">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {selectedFile.type}
                      </span>
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

          {/* FOOTER */}
          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Save..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
