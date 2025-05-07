import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import shiftUrls from "@/utils/url/adminPanel/shiftUrl";

const useDeleteShift = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteShiftMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(shiftUrls.deleteShift(id), {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.shift.delete })
    },
    onError: () => {
      showToast("خطایی در حذف شیفت رخ داد.", "error");
    },
  });

  return {
    deleteShiftMutation,
  };
};

export default useDeleteShift;
