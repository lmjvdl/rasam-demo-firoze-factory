import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import shiftUrls from "@/utils/url/adminPanel/shiftUrl";
import { useToast } from "@/hooks/ui/useToast";

export type ShiftUpdateSchema = {
  id: number;
  name: string;
};

const useUpdateShift = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateShiftMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: ShiftUpdateSchema) => {
      return fetchWithErrorWithAlarm(shiftUrls.editShift(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.shift.update });
    },
    onError: () => {
      showToast("❌ خطایی در به‌روزرسانی شیفت رخ داد.", "error");
    },
  });

  return {
    updateShiftMutation,
  };
};

export default useUpdateShift;
