import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import alarmDetailUrls from "@/utils/url/adminPanel/alarmDetail/alarmDetailUrl";

export type AlarmDetailUpdateSchema = {
  id: number;
  parameter: { id: number; name: string };
  value: number;
  alarm: { id: number; name: string };
};

const useUpdateAlarmDetail = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateAlarmDetailMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: AlarmDetailUpdateSchema) => {
      return fetchWithErrorWithAlarm(alarmDetailUrls.editAlarmDetail(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.alarmDetail.update });
    },
    onError: () => {
      showToast("❌ خطایی در به‌روزرسانی جزئیات آلارم رخ داد.", "error");
    },
  });

  return {
    updateAlarmDetailMutation,
  };
};

export default useUpdateAlarmDetail;
