import { supabase } from "@/lib/supabase/client";
import type { Category } from "@/types/category";

export class CategoryService {
  static async getCategories({
    page = 1,
    pageSize = 6,
    search = "",
  }: { page?: number; pageSize?: number; search?: string } = {}): Promise<{
    data: Category[];
    total: number;
  }> {
    let query = supabase
      .from("categories")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (search) query = query.ilike("name", `%${search}%`);

    const { data, error, count } = await query;
    if (error) throw new Error(error.message);

    return { data: data ?? [], total: count ?? 0 };
  }

  static async createCategory(name: string): Promise<Category> {
    const trimmedName = name.trim();
    if (!trimmedName) throw new Error("Category name cannot be empty");

    const { data, error } = await supabase
      .from("categories")
      .insert({ name: trimmedName })
      .select()
      .single();

    if (error) {
      if (error.code === "23505")
        throw new Error("Category name already exists");
      throw new Error(error.message);
    }

    return data as Category;
  }

  static async updateCategory(id: number, name: string): Promise<Category> {
    const trimmedName = name.trim();
    if (!trimmedName) throw new Error("Category name cannot be empty");

    const { data, error } = await supabase
      .from("categories")
      .update({ name: trimmedName })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "23505")
        throw new Error("Category name already exists");
      throw new Error(error.message);
    }

    return data as Category;
  }

  static async deleteCategory(id: number): Promise<void> {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      if (error.code === "23503")
        throw new Error("Cannot delete category: it is used in forums");
      throw new Error(error.message);
    }
  }
}
