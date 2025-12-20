import { supabase } from "@/lib/supabase/client";

export interface Category {
  id: number;
  name: string;
}

export class CategoryService {
  static async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("[CategoryService.getCategories]", error);
      throw error;
    }

    return data ?? [];
  }

  static async getCategoryById(id: number): Promise<Category> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("[CategoryService.getCategoryById]", error);
      throw error;
    }

    return data as Category;
  }

  static async createCategory(name: string): Promise<Category> {
    const { data, error } = await supabase
      .from("categories")
      .insert({ name: name.trim() })
      .select()
      .single();

    if (error) {
      console.error("[CategoryService.createCategory]", error);
      throw error;
    }

    return data as Category;
  }

  static async updateCategory(id: number, name: string): Promise<Category> {
    const { data, error } = await supabase
      .from("categories")
      .update({ name: name.trim() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[CategoryService.updateCategory]", error);
      throw error;
    }

    return data as Category;
  }

  static async deleteCategory(id: number): Promise<void> {
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
      console.error("[CategoryService.deleteCategory]", error);
      throw error;
    }
  }
}
