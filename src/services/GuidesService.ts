import { ENV } from "@/env";
import { deleteFile, uploadFile } from "@/lib/storage.helper";
import { supabase } from "@/lib/supabase/client";
import type { Guide, GuidePayload } from "@/types/Guide";

export class GuidesService {
  static async getGuides({
    page = 1,
    pageSize = 6,
    search = "",
  }: {
    page?: number;
    pageSize?: number;
    search?: string;
  }) {
    let query = supabase
      .from("guides")
      .select(
        `
        *,
      categories (
        id,
        name
      )
    `
      )
      .range((page - 1) * pageSize, page * pageSize - 1)
      .order("created_at", { ascending: false });

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error, count } = await query;
    if (error) throw error;

    return {
      data: data ?? [],
      total: count ?? 0,
    };
  }

  static async getGuideById(id: string | number) {
    const { data, error } = await supabase
      .from("guides")
      .select(
        `
        *,
      categories (
        id,
        name
      )
    `
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error("getGuideById error:", error);
      throw error;
    }

    return data;
  }

  static async createGuide(payload: GuidePayload) {
    let image_url: string | null = null;

    try {
      if (payload.image_file) {
        image_url = await uploadFile({
          bucket: ENV.BUCKET_GUIDES,
          folder: ENV.FOLDER_GUIDES,
          file: payload.image_file,
        });
      }

      const { data, error } = await supabase
        .from("guides")
        .insert({
          title: payload.title,
          content: payload.content,
          category_id: payload.category_id,
          image_url,
        })
        .select()
        .single();

      if (error) throw error;

      return data as Guide;
    } catch (err) {
      if (image_url) {
        await deleteFile({
          bucket: ENV.BUCKET_GUIDES,
          publicUrl: image_url,
        });
      }
      throw err;
    }
  }

  static async updateGuide(
    id: string,
    payload: Partial<GuidePayload>,
    oldImageUrl?: string | null
  ) {
    let image_url = oldImageUrl ?? null;

    if (payload.remove_image && oldImageUrl) {
      await deleteFile({
        bucket: ENV.BUCKET_GUIDES,
        publicUrl: oldImageUrl,
      });

      image_url = null;
    }

    if (payload.image_file) {
      if (oldImageUrl) {
        await deleteFile({
          bucket: ENV.BUCKET_GUIDES,
          publicUrl: oldImageUrl,
        });
      }

      image_url = await uploadFile({
        bucket: ENV.BUCKET_GUIDES,
        folder: ENV.FOLDER_GUIDES,
        file: payload.image_file,
      });
    }

    const updateData: Record<string, any> = {
      updated_at: new Date().toISOString(),
      image_url,
    };

    if (payload.title !== undefined) updateData.title = payload.title;
    if (payload.content !== undefined) updateData.content = payload.content;
    if (payload.category_id !== undefined)
      updateData.category_id = payload.category_id;

    const { data, error } = await supabase
      .from("guides")
      .update(updateData)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) throw error;

    return data as Guide;
  }

  static async deleteGuide(id: string, imageUrl?: string | null) {
    await deleteFile({
      bucket: ENV.BUCKET_GUIDES,
      publicUrl: imageUrl,
    });

    const { error } = await supabase.from("guides").delete().eq("id", id);
    if (error) throw error;
  }
}
