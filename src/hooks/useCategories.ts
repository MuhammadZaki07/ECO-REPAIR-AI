import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryService, type Category } from "@/services/CategoryService";

export const useCategories = () => {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: CategoryService.getCategories,
    staleTime: 1000 * 60 * 5,
  });

  const createCategory = useMutation({
    mutationFn: (name: string) => CategoryService.createCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      CategoryService.updateCategory(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id: number) => CategoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    categories: categoriesQuery.data ?? [],
    loading: categoriesQuery.isLoading,
    error: categoriesQuery.error as Error | null,
    refetch: categoriesQuery.refetch,

    createCategory: createCategory.mutateAsync,
    updateCategory: updateCategory.mutateAsync,
    deleteCategory: deleteCategory.mutateAsync,
  };
};
