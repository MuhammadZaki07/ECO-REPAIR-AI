import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { VoucherSchema, type VoucherInput } from "@/schemas/VoucherSchema";
import { useToast } from "@/hooks/use-toast";
import type { VoucherModalProps } from "@/types/voucher";
import { Label } from "@/components/ui/label";

export default function VoucherModal({
  isOpen,
  setIsOpen,
  initialData,
  onSuccess,
  onSubmit,
}: VoucherModalProps) {
  const [form, setForm] = useState<VoucherInput>({
    title: "",
    eco_coin_cost: undefined,
    provider: undefined,
    active: true,
    start_date: "",
    end_date: "",
  });

  const [error, setError] = useState<
    Partial<Record<keyof VoucherInput, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setForm(
      initialData ?? {
        title: "",
        eco_coin_cost: undefined,
        provider: undefined,
        active: true,
        start_date: "",
        end_date: "",
      }
    );
    setError({});
  }, [initialData, isOpen]);

  const handleChange = (key: keyof VoucherInput, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    const result = VoucherSchema.safeParse({ ...form, [key]: value });
    if (result.success) setError({});
  };

  const handleSubmit = async () => {
    const result = VoucherSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof VoucherInput, string>> = {};
      result.error.issues.forEach((i) => {
        fieldErrors[i.path[0] as keyof VoucherInput] = i.message;
      });
      setError(fieldErrors);
      return;
    }

    try {
      setLoading(true);
      await onSubmit(form);
      toast({
        title: "Success",
        description: initialData
          ? "Voucher updated successfully"
          : "Voucher created successfully",
      });
      setIsOpen(false);
      setForm({
        title: "",
        eco_coin_cost: undefined,
        provider: undefined,
        active: true,
        start_date: "",
        end_date: "",
      });
      setError({});
      onSuccess();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message ?? "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {initialData ? "Edit Voucher" : "Add Voucher"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Enter voucher details.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-4 space-y-4">
          <div className="space-y-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter voucher title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={error.title ? "border-destructive" : ""}
            />
            {error.title && (
              <p className="text-destructive text-sm mt-1">{error.title}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-3">
              <Label htmlFor="eco_coin_cost">Cost</Label>
              <Input
                id="eco_coin_cost"
                type="number"
                placeholder="0"
                value={form.eco_coin_cost}
                min={0}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  handleChange("eco_coin_cost", val < 0 ? 0 : val);
                }}
                className={error.eco_coin_cost ? "border-destructive" : ""}
              />
              {error.eco_coin_cost && (
                <p className="text-destructive text-sm mt-1">
                  {error.eco_coin_cost}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="provider">Provider</Label>
              <Input
                id="provider"
                placeholder="ex: Tokopedia"
                value={form.provider ?? ""}
                onChange={(e) => handleChange("provider", e.target.value)}
                className={error.provider ? "border-destructive" : ""}
              />
              {error.provider && (
                <p className="text-destructive text-sm mt-1">
                  {error.provider}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-3">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={form.start_date?.slice(0, 10) || ""}
                min={new Date().toISOString().slice(0, 10)} // hari ini atau nanti
                onChange={(e) => {
                  const value = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    start_date: value,
                    // otomatis adjust end_date jika lebih kecil dari start_date
                    end_date:
                      prev.end_date && prev.end_date < value
                        ? value
                        : prev.end_date,
                  }));
                }}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={form.end_date?.slice(0, 10) || ""}
                min={
                  form.start_date?.slice(0, 10) ||
                  new Date().toISOString().slice(0, 10)
                }
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, end_date: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={form.active}
              onCheckedChange={(checked) => handleChange("active", checked)}
            />
            <Label htmlFor="active" className="mb-0">
              Active
            </Label>
          </div>
        </div>

        <AlertDialogFooter className="flex justify-end mt-4 space-x-2">
          <AlertDialogCancel asChild>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="disabled:cursor-progress"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
