import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import alarmUrls from "@/utils/url/adminPanel/alarm/alarmUrl";
import { extractId } from "@/utils/formatters/extractId";

export type AlarmUpdateSchema = {
  function_info: { id: number; name: string };
  device_info: { id: number; name: string };
  type_info: { id: number; name: string };
  description: string;
  id: number;
  name: string;
  message_type: string;
  message: string;
  receiver_info: { id: number; name: string };
}


const useUpdateAlarm = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateAlarmMutation = useMutation<unknown, Error, AlarmUpdateSchema>({
    mutationFn: async ({ id, function_info, device_info, type_info, receiver_info, ...updatedData }) => {
      return fetchWithErrorWithAlarm(alarmUrls.editAlarm(id), {
        method: "PUT",
        body: JSON.stringify({
          ...updatedData,
          function: extractId(function_info),
          device: extractId(device_info),
          type: extractId(type_info),
          receiver_info: receiver_info ? extractId(receiver_info) : null,
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
