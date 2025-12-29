import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/UserService";
import { useDebounce } from "@/hooks/useDebounce";
import type { UserData } from "@/types/auth";
import { useAuthContext } from "@/hooks/context/AuthContext";

type UseUsersOptions = {
  role?: "admin" | "user";
};

export const useUsers = (pageSize = 6, options?: UseUsersOptions) => {
  const queryClient = useQueryClient();
  const { userData, user } = useAuthContext();
  const actorId = userData?.id ?? user?.id;

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const role = options?.role;

  const setSort = (field: string, order: "asc" | "desc") => {
    setSortBy(field);
    setSortOrder(order);
  };

  const usersQuery = useQuery<{ data: UserData[]; total: number }, Error>({
    queryKey: [
      "users",
      page,
      debouncedSearch,
      sortBy,
      sortOrder,
      includeDeleted,
      role
    ],
    queryFn: () =>
      UserService.getUsers({
        page,
        pageSize,
        search: debouncedSearch,
        sortBy,
        sortOrder,
        includeDeleted,
        role
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const blockUser = useMutation({
    mutationFn: (userId: string) => UserService.blockUser(userId, actorId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const unblockUser = useMutation({
    mutationFn: (userId: string) => UserService.unblockUser(userId, actorId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const deleteUser = useMutation({
    mutationFn: (userId: string) => UserService.deleteUser(userId, actorId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const restoreUser = useMutation({
    mutationFn: (targetUserId: string) => {
      if (!actorId) throw new Error("Actor not found");
      return UserService.restoreUser(targetUserId, actorId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["activity-logs"]);
    },
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

    restoreUser: restoreUser.mutateAsync,
    restoreLoading: restoreUser.isLoading,

    includeDeleted,
    setIncludeDeleted,
  };
};
