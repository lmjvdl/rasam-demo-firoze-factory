import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import alarmUrls from "@/utils/url/adminPanel/alarmUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

const useDeleteAlarm = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteAlarmMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(alarmUrls.deleteAlarm(id), {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: allQueryKeys.adminPanel.alarm.delete,
      });
    },
    onError: () => {
      showToast("خطایی در حذف آلارم رخ داد.", "error");
    },
  });

  return {
    deleteAlarmMutation,
  };
};

export default useDeleteAlarm;
