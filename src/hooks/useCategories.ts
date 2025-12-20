import { CategoryService, type Category } from "@/services/CategoryService";
import { useState, useEffect, useCallback } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await CategoryService.getCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (name: string) => {
    const newCategory = await CategoryService.createCategory(name);
    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  }, []);

  const updateCategory = useCallback(async (id: number, name: string) => {
    const updated = await CategoryService.updateCategory(id, name);
    setCategories((prev) => prev.map((cat) => (cat.id === id ? updated : cat)));
    return updated;
  }, []);

  const deleteCategory = useCallback(async (id: number) => {
    await CategoryService.deleteCategory(id);
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
