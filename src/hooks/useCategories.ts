import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryService } from "@/services/CategoryService";
import { useDebounce } from "@/hooks/useDebounce";
import type { Category } from "@/types/category";

export const useCategories = (pageSize = 6) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const categoriesQuery = useQuery<{ data: Category[]; total: number }, Error>({
    queryKey: ["categories", page, debouncedSearch],
    queryFn: () => CategoryService.getCategories({ page, pageSize, search: debouncedSearch }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const createCategory = useMutation({
    mutationFn: (name: string) => CategoryService.createCategory(name),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) => CategoryService.updateCategory(id, name),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });

  const deleteCategory = useMutation({
    mutationFn: (id: number) => CategoryService.deleteCategory(id),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });

  return {
    categories: categoriesQuery.data?.data ?? [],
    total: categoriesQuery.data?.total ?? 0,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    loading: categoriesQuery.isLoading,
    error: categoriesQuery.error ?? null,
    refetch: categoriesQuery.refetch,

    createCategory: createCategory.mutateAsync,
    createLoading: createCategory.isLoading,

    updateCategory: updateCategory.mutateAsync,
    updateLoading: updateCategory.isLoading,

    deleteCategory: deleteCategory.mutateAsync,
    deleteLoading: deleteCategory.isLoading,
  };
};
