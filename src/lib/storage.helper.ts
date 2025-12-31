import { supabase } from "@/lib/supabase/client";

export function getPathFromPublicUrl(url: string, bucket: string) {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;

  return url.substring(index + marker.length);
}

export async function uploadFile({
  bucket,
  folder,
  file,
}: {
  bucket: string;
  folder: string;
  file: File;
}) {
  const path = `${folder}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage.from(bucket).upload(path, file);

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
}

export async function deleteFile({
  bucket,
  publicUrl,
}: {
  bucket: string;
  publicUrl?: string | null;
}) {
  if (!publicUrl) return;

  const path = getPathFromPublicUrl(publicUrl, bucket);
  if (!path) return;

  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    console.error("❌ gagal hapus file:", error);
  }
}
