import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GuidesService } from "@/services/GuidesService";
import type { GuidePayload } from "@/types/Guide";
import { ENV } from "@/env";

export const useGuides = (
  keyword: string = "",
  page: number = 1,
  pageSize: number = ENV.PAGE_SIZE,
) => {
  const queryClient = useQueryClient();

  const queryKey = ["guides", keyword, page, pageSize];

  const guidesQuery = useQuery({
    queryKey,
    queryFn: () =>
      GuidesService.getGuides({
        page,
        pageSize,
        search: keyword,
      }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  const createGuideMutation = useMutation({
    mutationFn: (payload: GuidePayload) => GuidesService.createGuide(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
    },
  });

  const updateGuideMutation = useMutation({
    mutationFn: ({
      id,
      payload,
      oldImageUrl,
    }: {
      id: string;
      payload: Partial<GuidePayload>;
      oldImageUrl?: string | null;
    }) => GuidesService.updateGuide(id, payload, oldImageUrl),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guides"],
      });
    },
  });

  const deleteGuideMutation = useMutation({
    mutationFn: ({ id, imageUrl }: { id: string; imageUrl?: string | null }) =>
      GuidesService.deleteGuide(id, imageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
    },
  });

  return {
    ...guidesQuery,
    guides: guidesQuery.data?.data ?? [],
    total: guidesQuery.data?.total ?? 0,

    createGuide: createGuideMutation.mutateAsync,
    updateGuide: updateGuideMutation.mutateAsync,
    deleteGuide: deleteGuideMutation.mutateAsync,

    isCreating: createGuideMutation.isPending,
    isUpdating: updateGuideMutation.isPending,
    isDeleting: deleteGuideMutation.isPending,
  };
};
