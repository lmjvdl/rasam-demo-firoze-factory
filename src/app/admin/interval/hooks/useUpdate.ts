import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import intervalUrls from "@/utils/url/adminPanel/intervalUrl";
import { useToast } from "@/hooks/ui/useToast";

export type IntervalUpdateSchema = {
  id: number;
  name: string;
  duration: string;
  is_shift: boolean;
};

const useUpdateInterval = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateIntervalMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: IntervalUpdateSchema) => {
      return fetchWithErrorWithAlarm(intervalUrls.editInterval(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.interval.update });
    },
    onError: () => {
      showToast("❌ خطایی در به‌روزرسانی زیربازه رخ داد.", "error");
    },
  });

  return {
    updateIntervalMutation,
  };
};

export default useUpdateInterval;
