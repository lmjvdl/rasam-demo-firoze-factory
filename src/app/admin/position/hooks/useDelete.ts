import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import positionUrls from "@/utils/url/adminPanel/positionUrl";

const useDeletePosition = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deletePositionMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(positionUrls.deletePosition(id), {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.position.delete })
    },
    onError: () => {
      showToast("خطایی در حذف سمت رخ داد.", "error");
    },
  });

  return {
    deletePositionMutation,
  };
};

export default useDeletePosition;
