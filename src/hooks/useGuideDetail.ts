import { useMutation, useQuery } from "@tanstack/react-query";
import { GuidesService } from "@/services/GuidesService";
import { queryClient } from "@/lib/queryClient";
import type { GuidePayload } from "@/types/Guide";

export const useGuideDetail = (id?: string | number) => {
  const guideQuery = useQuery({
    queryKey: ["guide", id],
    queryFn: () => GuidesService.getGuideById(id as string),
    enabled: !!id,
    refetchOnMount: "always",
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

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["guides"] });
      queryClient.invalidateQueries({
        queryKey: ["guide", variables.id],
      });
    },
  });

  return {
    ...guideQuery,
    updateGuide: updateGuideMutation.mutateAsync,
    isUpdating: updateGuideMutation.isPending,
  };
};
