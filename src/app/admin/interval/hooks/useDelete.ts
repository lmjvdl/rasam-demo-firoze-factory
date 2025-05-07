import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import intervalUrls from "@/utils/url/adminPanel/intervalUrl";

const useDeleteInterval = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteIntervalMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(intervalUrls.deleteInterval(id), {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.interval.delete })
    },
    onError: () => {
      showToast("خطایی در حذف بازه زمانی رخ داد.", "error");
    },
  });

  return {
    deleteIntervalMutation,
  };
};

export default useDeleteInterval;
