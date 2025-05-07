import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import positionUrls from "@/utils/url/adminPanel/positionUrl";
import { useToast } from "@/hooks/ui/useToast";

export type PositionUpdateSchema = {
  id: number;
  name: string;
};

const useUpdatePosition = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updatePositionMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: PositionUpdateSchema) => {
      return fetchWithErrorWithAlarm(positionUrls.editPosition(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.position.update });
    },
    onError: () => {
      showToast("❌ خطایی در به‌روزرسانی سمت رخ داد.", "error");
    },
  });

  return {
    updatePositionMutation,
  };
};

export default useUpdatePosition;
