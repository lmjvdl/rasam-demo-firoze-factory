import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import alarmDetailUrls from "@/utils/url/adminPanel/alarmDetail/alarmDetailUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

const useDeleteAlarmDetail = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteAlarmDetailMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(alarmDetailUrls.deleteAlarmDetail(id), {
        method: "DELETE",
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.alarmDetail.delete })
    },
    onError: () => {
      showToast("خطایی در حذف جزئیات آلارم رخ داد.", "error");
    },
  });

  return {
    deleteAlarmDetailMutation,
  };
};

export default useDeleteAlarmDetail;
