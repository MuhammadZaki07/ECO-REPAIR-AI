import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/UserService";
import { useDebounce } from "@/hooks/useDebounce";
import type { UserData } from "@/types/auth";

export const useUsers = (pageSize = 6) => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const setSort = (field: string, order: "asc" | "desc") => {
    setSortBy(field);
    setSortOrder(order);
  };

  const usersQuery = useQuery<{ data: UserData[]; total: number }, Error>({
    queryKey: ["users", page, debouncedSearch, sortBy, sortOrder],
    queryFn: () =>
      UserService.getUsers({
        page,
        pageSize,
        search: debouncedSearch,
        sortBy,
        sortOrder,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const blockUser = useMutation({
    mutationFn: (userId: string) => UserService.blockUser(userId),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const unblockUser = useMutation({
    mutationFn: (userId: string) => UserService.unblockUser(userId),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const deleteUser = useMutation({
    mutationFn: (userId: string) => UserService.deleteUser(userId),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  return {
    users: usersQuery.data?.data ?? [],
    total: usersQuery.data?.total ?? 0,

    page,
    setPage,

    searchTerm,
    setSearchTerm,
    setSort,

    loading: usersQuery.isLoading,
    error: usersQuery.error ?? null,
    refetch: usersQuery.refetch,

    blockUser: blockUser.mutateAsync,
    blockLoading: blockUser.isLoading,

    unblockUser: unblockUser.mutateAsync,
    unblockLoading: unblockUser.isLoading,

    deleteUser: deleteUser.mutateAsync,
    deleteLoading: deleteUser.isLoading,
  };
};
