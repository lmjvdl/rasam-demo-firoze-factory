import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import alarmUrls from "@/utils/url/adminPanel/alarm/alarmUrl";
import { extractId } from "@/utils/formatters/extractId";

export type AlarmUpdateSchema = {
  function: { id: number; name: string };
  device: { id: number; name: string };
  type: { id: number; name: string };
  description: string;
  id: number;
  name: string;
}


const useUpdateAlarm = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateAlarmMutation = useMutation<unknown, Error, AlarmUpdateSchema>({
    mutationFn: async ({ id, function: func, device, type, ...updatedData }) => {
      return fetchWithErrorWithAlarm(alarmUrls.editAlarm(id), {
        method: "PUT",
        body: JSON.stringify({
          ...updatedData,
          function: extractId(func),
          device: extractId(device),
          type: extractId(type),
        }),
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
