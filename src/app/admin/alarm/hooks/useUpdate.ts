import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import alarmUrls from "@/utils/url/adminPanel/alarm/alarmUrl";


export type AlarmUpdateSchema = {
  id: number;
  name: string;
  function: number;
  description?: string;
  device: number;
  type: number;
};

const useUpdateAlarm = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateAlarmMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: AlarmUpdateSchema) => {
      return fetchWithErrorWithAlarm(alarmUrls.editAlarm(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.alarm.update });
    },
    onError: () => {
      showToast("❌ خطایی در به‌روزرسانی آلارم رخ داد.", "error");
    },
  });

  return {
    updateAlarmMutation,
  };
};

export default useUpdateAlarm;
