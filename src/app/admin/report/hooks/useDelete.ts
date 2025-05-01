import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import reportUrls from "@/utils/url/adminPanel/report/reportUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

const useDeleteReport = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteReportMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(reportUrls.deleteReport(id), {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: allQueryKeys.adminPanel.report.delete,
      }); 
    },
    onError: () => {
      showToast("خطایی در حذف گزارش رخ داد.", "error");
    },
  });

  return {
    deleteReportMutation,
  };
};

export default useDeleteReport;
